<template>
    <div>
        <section class="p-8" v-if="! posts.length">
            <o-notification class="bg-blue-lightest rounded">
                You haven't added any news articles yet,

                <router-link
                    :to="{ name: 'posts.create' }"
                    class="underline"
                >click here to add one</router-link>.
            </o-notification>
        </section>

        <template v-else>
            <section class="p-8 flex justify-between border-b border-grey-light">
                <o-search
                    :value="filters.title"
                    @submit="value => filters.title = value"
                ></o-search>

                <o-dropdown
                    class="right"
                    v-model="filters.tag"
                    :options="tags"
                    placeholder="All categories"
                ></o-dropdown>
            </section>
            
            <table class="table">
                <thead>
                    <tr>
                        <o-th-sort
                            column="title"
                            v-model="filters.sort"
                        >Title</o-th-sort>

                        <th>Categories</th>

                        <o-th-sort
                            column="published_at"
                            v-model="filters.sort"
                        >Publish Date</o-th-sort>

                        <th class="narrow">Actions</th>
                    </tr>
                </thead>

                <transition name="fade">
                    <tbody v-show="! $loader.isLoading('secondary.*')">
                        <tr :key="post.id" v-for="post in posts">
                            <td>{{ post.title }}</td>
                            
                            <td>
                                <template v-for="(tag, index) in post.tags">
                                    <a :key="tag.id" @click="filterPosts('tag', tag.slug)">{{
                                        tag.name
                                    }}</a><template
                                        v-if="index != post.tags.length -1"
                                    >,</template>
                                </template>
                            </td>

                            <td>{{ post.published_at | formatDate }}</td>

                            <td class="actions">
                                <router-link
                                    class="icon medium"
                                    :to="{ name: 'posts.edit', params: { id: post.id } }"
                                >
                                    <icon icon="pencil-alt"></icon>
                                </router-link>

                                <a class="icon medium" @click="$refs.confirm.open(post)">
                                    <icon icon="trash-alt"></icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </transition>
            </table>
        </template>

        <transition name="fade">
            <section class="p-8" v-if="pagination" v-show="! $loader.isLoading('secondary.*')">
                <o-pagination
                    :options="pagination"
                    @change="value => filters.page = value"
                ></o-pagination>
            </section>
        </transition>

        <o-confirmation
            ref="confirm"
            @confirm="deletePost"
            button-text="Delete"
            button-class="button-red"
        >
            <template slot-scope="post">
                Are you sure you want to delete <strong>"{{ post.title }}"</strong>
            </template>
        </o-confirmation>
    </div>
</template>

<script>
    import moment from 'moment';
    import listingMixin from '@optimuscms/core/src/mixins/listing';

    export default {
        mixins: [ listingMixin ],

        filters: {
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            }
        },

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
            }
        },

        created() {
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
                        }
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
    }
</script>
