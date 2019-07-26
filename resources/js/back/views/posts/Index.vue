<template>
    <div>
        <section v-if="! posts.length" class="p-8">
            <o-notification class="bg-blue-300 rounded">
                You haven't added any news articles yet,

                <router-link
                    :to="{ name: 'posts.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <template v-else>
            <section class="p-8 flex justify-between border-b border-grey-400">
                <o-search
                    :value="filters.title"
                    @submit="value => filters.title = value"
                />

                <o-dropdown
                    v-model="filters.tag"
                    class="right"
                    :options="tags"
                    placeholder="All categories"
                />
            </section>

            <table class="table">
                <thead>
                    <tr>
                        <o-th-sort
                            v-model="filters.sort"
                            column="title"
                        >
                            Title
                        </o-th-sort>

                        <th>Categories</th>

                        <o-th-sort
                            v-model="filters.sort"
                            column="published_at"
                        >
                            Publish Date
                        </o-th-sort>

                        <th class="narrow">
                            Actions
                        </th>
                    </tr>
                </thead>

                <transition name="fade">
                    <tbody v-show="! $loader.isLoading('secondary.*')">
                        <tr v-for="post in posts" :key="post.id">
                            <td>{{ post.title }}</td>

                            <td>
                                <template v-for="(tag, index) in post.tags">
                                    <a :key="tag.id" @click="filterPosts('tag', tag.slug)">{{
                                        tag.name
                                    }}</a><template
                                        v-if="index != post.tags.length -1"
                                    >
                                        ,
                                    </template>
                                </template>
                            </td>

                            <td>{{ post.published_at | formatDate }}</td>

                            <td class="actions">
                                <router-link
                                    :to="{
                                        name: 'posts.edit',
                                        params: { id: post.id }
                                    }"
                                    class="icon medium"
                                >
                                    <icon icon="pencil-alt" />
                                </router-link>

                                <a class="icon medium" @click="openConfirmation(post)">
                                    <icon icon="trash-alt" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </transition>
            </table>
        </template>

        <transition name="fade">
            <section v-if="pagination" v-show="! $loader.isLoading('secondary.*')" class="p-8">
                <o-pagination
                    :options="pagination"
                    @change="value => filters.page = value"
                />
            </section>
        </transition>

        <o-confirmation
            button-class="red"
            button-text="Delete"
            @confirm="deletePost"
        >
            <template slot-scope="post">
                Are you sure you want to delete <strong>"{{ post.title }}"</strong>
            </template>
        </o-confirmation>
    </div>
</template>

<script>
import moment from 'moment';
import listingMixin from '../../mixins/listing';

export default {

    filters: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        }
    },
    mixins: [ listingMixin ],

    data() {
        return {
            posts: [],
            pagination: {},

            tags: [],

            filters: {
                title: '',
                tag: null,
                sort: null,
                page: null
            }
        };
    },

    created() {
        this.setTitle('Manage news');

        this.$loader.startLoading('primary.posts');

        this.fetchPosts(this.query).then(() => {
            this.$loader.stopLoading('primary.posts');
        });

        this.fetchTags();
    },

    methods: {
        fetchPosts(queryParams = {}) {
            return axios.get('/api/posts', {
                params: queryParams
            }).then(response => {
                this.posts = response.data.data;
                this.pagination = response.data.meta;
            });
        },

        fetchTags() {
            this.$loader.startLoading('primary.tags');

            axios.get('/api/post-tags').then(response => {
                this.tags = response.data.data.map(tag => {
                    return {
                        value: tag.id,
                        label: tag.name
                    };
                });

                this.$loader.stopLoading('primary.tags');
            });
        },

        deletePost(item) {
            axios.delete('/api/posts/' + item.id).then(() => {
                this.posts = this.posts.filter(({ id }) => id !== item.id);
            });
        },

        onFilter(queryParams) {
            this.$loader.startLoading('secondary.posts');

            this.fetchPosts(queryParams).then(() => {
                this.$loader.stopLoading('secondary.posts');
            });
        }
    }
};
</script>
