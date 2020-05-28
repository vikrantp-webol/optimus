<template>
    <o-select
        :id="id"
        v-model="newValue"
        :options="items"
        :loading="loading"
        :loading-more="loadingMore"
        @load-more="fetchMoreItems"
        @search-change="searchItems"
    />
</template>

<script>
import { mapGetters } from 'vuex';
import { getLinkableItems } from '../../../routes/api';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },

        value: {
            type: [ Number, String ],
            default: null,
        },

        linkableType: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            items: [],
            newValue: null,

            loading: false,
            loadingMore: false,
            nextPageNumber: null,
            searchQuery: null,
        };
    },

    computed: {
        ...mapGetters({
            formMenuItem: 'menu/formMenuItem',
        }),
    },

    watch: {
        value: {
            handler(newValue) {
                if (! this.items.find( ({ value }) => value === newValue)) {
                    this.items.push({
                        label: this.formMenuItem.label,
                        value: this.formMenuItem.linkable_id,
                    });
                }

                this.newValue = newValue;
            },
            immediate: true,
        },

        newValue(newValue) {
            let item = this.items.find( ({ value }) => value === newValue);

            this.$emit('input', newValue);
            this.$emit('labelChanged', item.label);
        },

        linkableType: {
            handler(linkableType) {
                if (! linkableType) {
                    return this.items = [];
                }

                this.fetchItems();
            },
            immediate: true,
        },
    },

    methods: {
        fetchItems(queryParams = {}) {
            this.loading = true;

            getLinkableItems(this.linkableType, queryParams).then(response => {
                this.nextPageNumber = this.getNextPageNumber(response.data.meta);

                this.items = response.data.data.map(({ id, label }) => {
                    return {
                        value: id,
                        label,
                    };
                });

                this.loading = false;
            });
        },

        fetchMoreItems() {
            if (this.nextPageNumber) {
                let params = {
                    page: this.nextPageNumber,
                };

                if (this.searchQuery) {
                    params.q = this.searchQuery;
                }

                this.loadingMore = true;

                getLinkableItems(this.linkableType, params).then(response => {
                    this.nextPageNumber = this.getNextPageNumber(response.data.meta);

                    this.items.push(
                        ...response.data.data.map(({ id, label }) => {
                            return {
                                value: id,
                                label,
                            };
                        }),
                    );

                    this.loadingMore = false;
                });
            }
        },

        searchItems(query) {
            this.searchQuery = query;

            this.fetchItems({
                q: this.searchQuery,
            });
        },

        getNextPageNumber(meta) {
            const nextPageNumber = meta.current_page + 1;

            if (nextPageNumber <= meta.last_page) {
                return nextPageNumber;
            }

            return null;
        },
    },
};
</script>
