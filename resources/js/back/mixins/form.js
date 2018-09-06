export default {
    props: {
        method: {
            type: String,
            required: true
        },

        action: String,

        item: {
            type: Object,
            default: null
        }
    }
};
