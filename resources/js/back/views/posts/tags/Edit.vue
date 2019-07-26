<template>
    <tag-form
        :item="tag"
        method="patch"
        :action="uri"
    />
</template>

<script>
import TagForm from './partials/Form';

export default {
    components: { TagForm },

    data() {
        return {
            tag: null
        };
    },

    computed: {
        uri() {
            return '/api/post-tags/' + this.$route.params.id;
        }
    },

    created() {
        this.setTitle('Edit category');

        this.fetchTag();
    },

    methods: {
        fetchTag() {
            this.$loader.startLoading('primary.tag');

            axios.get(this.uri).then(response => {
                this.tag = response.data.data;

                this.$loader.stopLoading('primary.tag');
            });
        }
    }
};
</script>
