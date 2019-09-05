<template>
    <tag-form />
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
