<template>
    <page-form :item="page" />
</template>

<script>
import { getPage } from '../../util/api-client';
import PageForm from './partials/Form';

export default {
    components: { PageForm },

    data() {
        return {
            page: null,
        };
    },

    created() {
        this.setTitle('Edit page');

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
