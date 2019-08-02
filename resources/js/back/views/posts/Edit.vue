<template>
    <post-form
        :item="post"
        method="patch"
        :action="uri"
    />
</template>

<script>
import PostForm from './partials/Form';

export default {
    components: { PostForm },

    data() {
        return {
            post: null,
        };
    },

    computed: {
        uri() {
            return '/admin/api/posts/' + this.$route.params.id;
        },
    },

    created() {
        this.setTitle('Edit news');

        this.fetchPost();
    },

    methods: {
        fetchPost() {
            this.$loader.startLoading('primary.post');

            axios.get(this.uri).then(response => {
                this.post = response.data.data;

                this.$loader.stopLoading('primary.post');
            });
        },
    },
};
</script>
