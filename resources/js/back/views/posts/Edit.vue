<template>
    <post-form
        :item="this.post"
        method="patch"
        :action="this.uri"
    ></post-form>
</template>

<script>
    import PostForm from './partials/Form';

    export default {
        components: { PostForm },

        data() {
            return {
                post: null
            }
        },

        computed: {
            uri() {
                return '/api/posts/' + this.$route.params.id;
            }
        },

        created() {
            this.fetchPost();
        },

        methods: {
            fetchPost() {
                this.$loader.startLoading('post');

                axios.get(this.uri).then(response => {
                    this.post = response.data.data;

                    this.$loader.stopLoading('post');
                });
            }
        }
    }
</script>
