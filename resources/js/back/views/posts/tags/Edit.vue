<template>
    <tag-form
        :item="this.tag"
        method="patch"
        :action="this.uri"
    ></tag-form>
</template>

<script>
    import TagForm from './partials/Form';

    export default {
        components: { TagForm },

        data() {
            return {
                tag: null
            }
        },

        computed: {
            uri() {
                return '/api/post-tags/' + this.$route.params.id;
            }
        },

        created() {
            this.fetchTag();
        },

        methods: {
            fetchTag() {
                this.$loader.startLoading('primary.tag');

                axios.get(this.uri).then(response => {
                    this.tag = response.data.data;

                    this.$loader.stopLoading('primary.tag');
                });
            }
        }
    }
</script>
