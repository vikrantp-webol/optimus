<template>
    <tag-form
        method="post"
        action="/admin/api/post-tags"
    />
</template>

<script>
import TagForm from './partials/Form';

export default {
    components: { TagForm },

    created() {
        this.setTitle('Add category');
    },
};
</script>
