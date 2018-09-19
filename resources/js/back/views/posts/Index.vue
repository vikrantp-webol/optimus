<template>
    <div>
        <section class="background is-grey-lighter has-border-bottom p-4">
            <div class="level">
                <div class="level-left">
                    <o-search-form
                        v-model="titleQuery"
                        @submit="setQueryParam('title', titleQuery)"
                    ></o-search-form>
                </div>

                <div class="level-right" v-if="tags.length">
                    <div class="level-item">
                        <o-dropdown class="is-right">
                            <a slot="button" class="button is-secondary">
                                <span>{{ tagDropdownLabel }}</span>

                                <span class="icon is-small">
                                    <icon icon="angle-down"></icon>
                                </span>
                            </a>

                            <a class="dropdown-item"
                                @click="setQueryParam('tag', null)"
                                :class="{ 'is-active': ! hasQueryParam('tag') }"
                            >All categories</a>

                            <a class="dropdown-item"
                                :key="tag.id"
                                v-for="tag in tags"
                                @click="setQueryParam('tag', tag.slug)"
                                :class="{ 'is-active': getQueryParam('tag') === tag.slug }"
                            >{{ tag.name }}</a>
                        </o-dropdown>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <table class="table is-hoverable is-fullwidth is-listing">
                <thead>
                    <tr>
                        <th>
                            <o-sort
                                @order="(value) => setQueryParam('sort', value)"
                                column="title"
                                :current="sort"
                            >Title</o-sort>
                        </th>
                        <th>Categories</th>
                        <th>
                            <o-sort
                                @order="(value) => setQueryParam('sort', value)"
                                column="published_at"
                                :current="sort"
                            >Publish Date</o-sort>
                        </th>
                        <th class="is-narrow has-text-centered">Actions</th>
                    </tr>
                </thead>

                <transition name="fade">
                    <tbody v-show="! isLoading">
                        <tr :key="post.id" v-for="post in posts">
                            <td>{{ post.title }}</td>
                            <td>
                                <template v-for="(tag, index) in post.tags">
                                    <a :key="tag.id" @click="filterPosts('tag', tag.slug)">
                                        {{ tag.name }}
                                    </a><template v-if="index != post.tags.length -1"
                                    >,</template>
                                </template>
                            </td>
                            <td>{{ post.published_at | formatDate }}</td>
                            <td class="has-actions">
                                <router-link
                                    class="icon is-medium"
                                    :to="{ name: 'posts.edit', params: { id: post.id } }"
                                >
                                    <icon icon="pencil-alt"></icon>
                                </router-link>

                                <a class="icon is-medium" @click="$refs.confirm.open(post)">
                                    <icon icon="trash-alt"></icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </transition>
            </table>
        </section>

        <transition name="fade">
            <section class="p-4" v-if="pagination" v-show="! isLoading">
                <o-pagination
                    :options="pagination"
                    @change-page="(page) => filterPosts('page', page)"
                ></o-pagination>
            </section>
        </transition>
        
        <o-confirm ref="confirm"
            type="danger"
            @confirm="deletePost">
                <template slot="confirmButtonText">Delete</template>
                
                <template slot-scope="post">
                    Are you sure you want to delete <strong>"{{ post.title }}"</strong>
                </template> 
        </o-confirm>
    </div>
</template>

<script>
    import listing from '../../mixins/listing';

    export default {
        mixins: [ listing ],

        data() {
            return {
                posts: [],
                tags: [],

                sort: null,
                titleQuery: null,
                pagination: null,

                allowedQueryParams: ['tag', 'page', 'title', 'sort']
            }
        },

        computed: {
            tagDropdownLabel() {
                let tag = this.tags.find(({ slug }) => slug === this.getQueryParam('tag'));

                return tag ? tag.name : 'Category';
            }
        },

        watch: {
            currentRoute() {
                this.isLoading = true;

                this.fetchPosts(this.queryParams).then(() => {
                    this.isLoading = false;
                });
            }
        },

        created() {
            this.$loader.startLoading('posts');

            this.fetchPosts().then(() => {
                this.$loader.stopLoading('posts');
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
                this.$loader.startLoading('tags');

                axios.get('/api/post-tags').then(response => {
                    this.tags = response.data.data;

                    this.$loader.stopLoading('tags');
                });
            },

            deletePost(item) {
                axios.delete('/api/posts/' + item.id).then(() => {
                    this.posts = this.posts.filter(({ id }) => id !== item.id);
                });
            }
        }
    }
</script>
