<template>
    <div>
        <section v-if="! pages.length" class="p-8">
            <o-notification class="bg-blue-300 rounded">
                You haven't added any pages yet,

                <router-link
                    :to="{ name: 'pages.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <table v-else class="table">
            <thead>
                <tr>
                    <th>Title</th>

                    <th>Uri</th>

                    <th>Sub pages</th>

                    <th class="narrow">
                        Actions
                    </th>
                </tr>
            </thead>

            <transition name="fade">
                <tbody v-show="! $loader.isLoading('secondary.*')">
                    <tr
                        v-for="page in pages"
                        :key="page.id"
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
                            <router-link
                                :to="{
                                    name: 'pages.edit',
                                    params: { id: page.id }
                                }"
                                class="icon medium"
                            >
                                <icon icon="pencil-alt" />
                            </router-link>

                            <a
                                v-if="page.is_deletable"
                                class="icon medium"
                                @click="openConfirmation(page)"
                            >
                                <icon icon="trash-alt" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </transition>
        </table>

        <o-confirmation
            button-class="red"
            button-text="Delete"
            @confirm="deletePage"
        >
            <template slot-scope="page">
                Are you sure you want to delete <strong>"{{ page.title }}"</strong>
            </template>
        </o-confirmation>
    </div>
</template>

<script>
import listingMixin from '../../mixins/listing';

export default {
    mixins: [ listingMixin ],

    data() {
        return {
            pages: [],

            filters: {
                parent: null,
            },
        };
    },

    created() {
        this.setTitle('Manage pages');

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

            return axios.get('/admin/api/pages', {
                params: queryParams,
            }).then(response => {
                this.pages = response.data.data;
            });
        },

        deletePage(page) {
            axios.delete(`/admin/api/pages/${page.id}`).then(() => {
                this.pages = this.pages.filter(({ id }) => id !== page.id);
            });
        },

        onFilter(queryParams) {
            this.$loader.startLoading('secondary.pages');

            this.fetchPages(queryParams).then(() => {
                this.$loader.stopLoading('secondary.pages');
            });
        },
    },
};
</script>
