<template>
    <o-loader :loading="isLoading('primary.*')">
        <section class="p-8 flex justify-between border-b border-grey-400">
            <o-search
                :value="filters.title"
                @submit="value => applyFilter('title', value)"
            />

            <o-dropdown
                :value="filters.tag"
                class="right"
                :options="tags"
                placeholder="All categories"
                @input="value => applyFilter('tag', value)"
            />
        </section>

        <section v-if="! posts.length" class="p-8">
            <o-notification class="rounded">
                No news articles found,

                <router-link
                    :to="{ name: 'posts.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <o-loader :loading="isLoading('secondary.*')">
            <table v-if="posts.length" class="table">
                <thead>
                    <tr>
                        <o-th-sort
                            :value="filters.sort"
                            column="title"
                            @input="value => applyFilter('sort', value)"
                        >
                            Title
                        </o-th-sort>

                        <th>Categories</th>

                        <o-th-sort
                            :value="filters.sort"
                            column="published_at"
                            @input="value => applyFilter('sort', value)"
                        >
                            Publish Date
                        </o-th-sort>

                        <th class="narrow">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
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
            </table>

            <section v-if="pagination" class="p-8">
                <o-pagination
                    :options="pagination"
                    @change="value => filters.page = value"
                />
            </section>
        </o-loader>

        <o-confirmation
            v-slot="{ item: post }"
            button-class="red"
            button-text="Delete"
            @confirm="deletePost"
        >
            Are you sure you want to delete post<br>
            <strong>{{ post.title }}</strong>
        </o-confirmation>
    </o-loader>
</template>

<script>
import moment from 'moment';
import { listingMixin } from '@optimuscms/theme';
import { getPosts, deletePost, getPostTags } from '../routes/api';

export default {
    filters: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
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
                page: null,
            },
        };
    },

    created() {
        this.setTitle('Manage news');

        this.startLoading('primary.posts');

        this.fetchPosts(this.query).then(() => {
            this.stopLoading('primary.posts');
        });

        this.fetchTags();
    },

    methods: {
        fetchPosts(queryParams = {}) {
            return getPosts(queryParams).then(response => {
                this.posts = response.data.data;
                this.pagination = response.data.meta;
            });
        },

        fetchTags() {
            this.startLoading('primary.tags');

            getPostTags().then(response => {
                this.tags = response.data.data.map(tag => {
                    return {
                        value: tag.id,
                        label: tag.name,
                    };
                });

                this.stopLoading('primary.tags');
            });
        },

        onFilter(queryParams) {
            this.startLoading('secondary.posts');

            this.fetchPosts(queryParams).then(() => {
                this.stopLoading('secondary.posts');
            });
        },

        deletePost(post) {
            deletePost(post.id);
            this.posts = this.posts.filter(({ id }) => id !== post.id);
        },
    },
};
</script>
