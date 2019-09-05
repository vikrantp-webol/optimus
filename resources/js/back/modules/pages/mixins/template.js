export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            form: {},
        };
    },

    watch: {
        form: {
            handler(form) {
                this.$emit('input', form);
            },
            deep: true,
            immediate: true,
        },
    },
};
