import moment from 'moment';

export default {
    filters: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },

        truncate(string) {
            if (string.length > 150) {
                return string.substring(0, 150).replace(/[^A-Za-z0-9]+$/g, '...');
            }
            
            return string;
        }
    },

    data() {
        return {
            isLoading: false,
            allowedQueryParams: []
        }
    },

    computed: {
        queryParams() {
            let params = {};

            this.allowedQueryParams.forEach(param => {
                if (this.hasQueryParam(param)) {
                    params[param] = this.getQueryParam(param);
                }
            });

            return params;
        },

        currentRoute() {
            return this.$route;
        }
    },

    methods: {
        hasQueryParam(query) {
            return this.currentRoute.query.hasOwnProperty(query);
        },

        getQueryParam(query) {
            return this.hasQueryParam(query) ? this.currentRoute.query[query] : null;
        },

        setQueryParam(key, value = null) {
            let queryParams = Object.assign({}, this.currentRoute.query);
            
            if (value) {
                queryParams[key] = value;
            } else {
                delete queryParams[key];
            }

            this.$router.push({
                query: queryParams
            });
        }
    }
};
