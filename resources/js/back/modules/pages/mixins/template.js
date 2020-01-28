import { formHelpersMixin } from '../../../../../theme';

export default {
    mixins: [ formHelpersMixin ],

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
