<template>
    <post-form
        method="post"
        action="/admin/api/posts"
    />
</template>

<script>
import PostForm from './partials/Form';

export default {
    components: { PostForm },

    created() {
        this.setTitle('Add news');
    },
};
</script>
