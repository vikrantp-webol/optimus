<template>
    <page-form
        method="post"
        action="/api/pages"
    ></page-form>
</template>

<script>
    import PageForm from './partials/Form';

    export default {
        components: { PageForm },

        created() {
            this.setTitle('Add page');
        }
    }
</script>
