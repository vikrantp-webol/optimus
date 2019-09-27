<template>
    <page-form />
</template>

<script>
import PageForm from './partials/Form';

export default {
    components: { PageForm },

    created() {
        this.setTitle('Add Page');
    },
};
</script>
