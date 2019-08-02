export default {
    props: {
        contents: {
            type: Array,
            default: () => [],
        },

        media: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            form: {},
        };
    },

    watch: {
        form: {
            deep: true,
            handler(form) {
                this.$emit('input', form);
            },
        },
    },

    mounted() {
        this.populateForm();
    },

    methods: {
        getMedia(groupName) {
            let media = this.media.filter(({ group }) => group === groupName);

            return media.length ? media : [];
        },

        getMediaIds(groupName) {
            let media = this.media.filter(({ group }) => group === groupName);

            return media.length ? media.map(({ id }) => id) : null;
        },

        getFirstMediaId(groupName) {
            let media = this.media.find(({ group }) => group === groupName);

            return media ? media.id : null;
        },

        getContent(name) {
            let content = this.contents.find(({ key }) => key === name);

            return content ? content.value : null;
        },
    },
};
