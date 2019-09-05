<template>
    <tag-form :item="tag" />
</template>

<script>
import { getPostTag } from '../../routes/api';
import TagForm from './partials/Form';

export default {
    components: { TagForm },

    data() {
        return {
            tag: null,
        };
    },

    created() {
        this.setTitle('Edit category');

        this.fetchTag();
    },

    methods: {
        fetchTag() {
            this.startLoading('primary.tag');

            getPostTag(this.$route.params.id).then(response => {
                this.tag = response.data.data;

                this.stopLoading('primary.tag');
            });
        },
    },
};
</script>
