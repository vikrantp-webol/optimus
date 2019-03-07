<template>
    <page-form
        :item="page"
        method="patch"
        :action="uri"
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
                return '/admin/api/pages/' + this.$route.params.id;
            }
        },

        created() {
            this.setTitle('Edit page');
            
            this.fetchPage();
        },

        methods: {
            fetchPage() {
                this.$loader.startLoading('primary.page');

                axios.get(this.uri).then(response => {
                    this.page = response.data.data;
                    
                    this.$loader.stopLoading('primary.page');
                });
            }
        }
    }
</script>
