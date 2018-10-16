<template>
    <section>
        <table class="table is-hoverable is-fullwidth is-listing">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Uri</th>
                    <th>Sub pages</th>
                    <th class="is-narrow has-text-centered">Actions</th>
                </tr>
            </thead>

            <transition name="fade">
                <tbody v-show="! isLoading">
                    <tr :key="page.id" v-for="page in pages" :class="{ 'is-draft': ! page.is_published }">
                        <td>{{ page.title }}</td>
                        <td>/{{ page.uri }}</td>
                        <td>
                            <router-link :to="{ query: { parent: page.id } }">Sub pages ({{ page.children_count }})</router-link>
                        </td>
                        <td class="has-actions">
                            <router-link class="icon is-medium" :to="{ name: 'pages.edit', params: { id: page.id } }">
                                <icon icon="pencil-alt"></icon>
                            </router-link>

                            <a class="icon is-medium" @click="$refs.confirm.open(page)" v-if="page.is_deletable">
                                <icon icon="trash-alt"></icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </transition>
        </table>

        <o-confirm
            ref="confirm"
            type="danger"
            @confirm="deletePage">
            <template slot="confirmButtonText">Delete</template>

            <template slot-scope="page">
                Are you sure you want to delete page <strong>"{{ page.title }}"</strong>
            </template>
        </o-confirm>
    </section>
</template>

<script>
    import listingMixin from '../../mixins/listing';

    export default {
        mixins: [ listingMixin ],

        data() {
            return {
                pages: [],
                allowedQueryParams: ['parent']
            }
        },

        watch: {
            currentRoute() {
                this.isLoading = true;

                this.fetchPages(this.queryParams).then(() => {
                    this.isLoading = false;
                });
            }
        },

        created() {
            this.$loader.startLoading('pages');

            this.fetchPages(this.queryParams).then(() => {
                this.$loader.stopLoading('pages');
            });
        },

        methods: {
            fetchPages(queryParams = {}) {
                if (! queryParams.hasOwnProperty('parent')) {
                    queryParams['parent'] = 'root';
                }

                return axios.get('/api/pages', {
                    params: queryParams
                }).then(response => {
                    this.pages = response.data.data;
                });
            },

            deletePage(item) {
                axios.delete('/api/pages/' + item.id).then(() => {
                    this.pages = this.pages.filter(({ id }) => id !== item.id);
                });
            }
        }
    }
</script>
