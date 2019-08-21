<template>
    <post-form />
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
