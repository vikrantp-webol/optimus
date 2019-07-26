<template>
    <page-form
        method="post"
        action="/admin/api/pages"
    />
</template>

<script>
import PageForm from './partials/Form';

export default {
    components: { PageForm },

    created() {
        this.setTitle('Add page');
    }
};
</script>
