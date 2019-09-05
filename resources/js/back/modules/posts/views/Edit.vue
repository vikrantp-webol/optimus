<template>
    <post-form :item="post" />
</template>

<script>
import { getPost } from '../routes/api';
import PostForm from './partials/Form';

export default {
    components: { PostForm },

    data() {
        return {
            post: null,
        };
    },

    created() {
        this.setTitle('Edit news');

        this.fetchPost();
    },

    methods: {
        fetchPost() {
            this.startLoading('primary.post');

            getPost(this.$route.params.id).then(response => {
                this.post = response.data.data;

                this.stopLoading('primary.post');
            });
        },
    },
};
</script>
