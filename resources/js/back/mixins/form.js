export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            errors: {},
            scrollTop: true,
            isProcessing: false,
        };
    },

    computed: {
        anyErrors() {
            return Object.keys(this.errors).length > 0;
        },

        isEditing() {
            return !! this.item;
        },
    },

    methods: {
        getMedia(group) {
            return this.item && this.item[group]
                ? this.item[group]
                : [];
        },

        submit() {
            this.errors = {};
            this.isProcessing = true;

            this.save().then(response => {
                this.onSuccess(response);
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = {
                        error: ['An unexpected error occured.'],
                    };
                }

                if (this.scrollTop) {
                    window.scrollTo(0, 0);
                }

                this.onError(error);
            }).finally(() => {
                this.isProcessing = false;

                this.onFinally();
            });
        },

        onSuccess() {
            //
        },

        onError() {
            //
        },

        onFinally() {
            //
        },
    },
};
