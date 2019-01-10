<template>
    <post-form
        method="post"
        action="/api/posts"
    ></post-form>
</template>

<script>
    import PostForm from './partials/Form';

    export default {
        components: { PostForm },

        created() {
            this.setTitle('Add news');
        }
    }
</script>
