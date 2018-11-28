<template>
    <div>
        <section class="p-8" v-if="! pages.length">
            <o-notification class="bg-blue-lightest rounded">
                You haven't added any pages yet,

                <router-link
                    :to="{ name: 'pages.create' }"
                    class="underline"
                >click here to add one</router-link>.
            </o-notification>
        </section>

        <table class="table" v-else>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Uri</th>
                    <th>Sub pages</th>
                    <th class="narrow">Actions</th>
                </tr>
            </thead>

            <transition name="fade">
                <tbody v-show="! $loader.isLoading('secondary.*')">
                    <tr
                        :key="page.id"
                        v-for="page in pages"
                        :class="{ 'draft': ! page.is_published }"
                    >
                        <td>{{ page.title }}</td>

                        <td>/{{ page.uri }}</td>

                        <td>
                            <a @click="filters.parent = page.id">
                                Sub pages ({{ page.children_count }})
                            </a>
                        </td>
                        
                        <td class="actions">
                            <router-link class="icon medium" :to="{ name: 'pages.edit', params: { id: page.id } }">
                                <icon icon="pencil-alt"></icon>
                            </router-link>

                            <a class="icon medium" @click="$refs.confirm.open(page)" v-if="page.is_deletable">
                                <icon icon="trash-alt"></icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </transition>
        </table>

        <o-confirmation
            ref="confirm"
            @confirm="deletePage"
            button-class="button-red"
            button-text="Delete"
        >
            <template slot-scope="page">
                Are you sure you want to delete <strong>"{{ page.title }}"</strong>
            </template>
        </o-confirmation>
    </div>
</template>

<script>
    import listingMixin from '@back/mixins/listing';

    export default {
        mixins: [ listingMixin ],

        data() {
            return {
                pages: [],

                filters: {
                    parent: null
                }
            }
        },


        created() {
            this.$loader.startLoading('primary.pages');

            this.fetchPages(this.query).then(() => {
                this.$loader.stopLoading('primary.pages');
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
            },

            onFilter(queryParams) {
                this.$loader.startLoading('secondary.pages');

                this.fetchPages(queryParams).then(() => {
                    this.$loader.stopLoading('secondary.pages');
                });
            }
        }
    }
</script>
