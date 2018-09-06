<template>
    <page-form
        :item="this.page"
        method="patch"
        :action="this.uri"
    ></page-form>
</template>

<script>
    import PageForm from './partials/Form';

    export default {
        components: { PageForm },

        data() {
            return {
                page: null
            }
        },

        computed: {
            uri() {
                return '/api/pages/' + this.$route.params.id;
            }
        },

        created() {
            this.fetchPage();
        },

        methods: {
            fetchPage() {
                this.$loader.start('page');

                axios.get(this.uri).then(response => {
                    this.page = response.data.data;
                    
                    this.$loader.stop('page');
                });
            }
        }
    }
</script>
