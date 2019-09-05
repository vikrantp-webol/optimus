export default {
    props: {
        item: {
            type: Object,
            default: null,
        },

        value: {
            type: Object,
            required: true,
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
        },
    },
};
