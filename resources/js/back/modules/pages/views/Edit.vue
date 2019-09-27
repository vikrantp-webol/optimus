<template>
    <page-form :item="page" />
</template>

<script>
import { getPage } from '../routes/api';
import PageForm from './partials/Form';

export default {
    components: { PageForm },

    data() {
        return {
            page: null,
        };
    },

    created() {
        this.setTitle('Edit Page');

        this.fetchPage();
    },

    methods: {
        fetchPage() {
            this.startLoading('primary.page');

            getPage(this.$route.params.id).then(response => {
                this.page = response.data.data;

                this.stopLoading('primary.page');
            });
        },
    },
};
</script>
