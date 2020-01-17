import { isEqual } from 'lodash';

export default {
    filters: {
        truncate(string, length = 150) {
            if (string.length > length) {
                return string.substring(0, length).replace(/[^A-Za-z0-9]+$/g, '...');
            }

            return string;
        },
    },

    data() {
        return {
            filters: {},
            initialFilters: {},
        };
    },

    computed: {
        routeQuery() {
            return this.$route.query;
        },

        query() {
            let query = {};

            Object.keys(this.filters).forEach(key => {
                if (this.hasValue(this.routeQuery, key)) {
                    query[key] = this.routeQuery[key];
                }
            });

            return query;
        },
    },

    watch: {
        query(query) {
            this.setFilters(query);
            this.onFilter(query);
        },

        filters: {
            handler(filters) {
                let query = {};

                Object.keys(filters).forEach(key => {
                    if (this.hasValue(filters, key)) {
                        query[key] = filters[key];
                    }
                });

                if (! isEqual(query, this.routeQuery)) {
                    this.$router.push({ query });
                }
            },
            deep: true,
        },
    },

    created() {
        this.initialFilters = Object.assign({}, this.filters);

        this.setFilters(this.query);
    },

    methods: {
        hasValue(object, key) {
            return object[key] !== ''
                && object[key] !== null
                && object[key] !== undefined;
        },

        setFilters(query) {
            Object.keys(this.filters).forEach(key => {
                if (query.hasOwnProperty(key) && this.hasValue(query, key)) {
                    this.filters[key] = query[key];
                } else {
                    this.filters[key] = this.initialFilters[key];
                }
            });
        },

        applyFilter(filter, value) {
            if (this.filters.hasOwnProperty('page')) {
                this.filters.page = null;
            }

            this.filters[filter] = value;
        },

        onFilter() {
            //
        },
    },
};
