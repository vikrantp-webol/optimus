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
    },

    data() {
        return {
            errors: {},
            isProcessing: false
        }
    },

    computed: {
        anyErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },

    methods: {
        submit() {
            this.errors = {};
            this.isProcessing = true;

            axios[this.method](this.action, this.form)
                .then(response => {
                    this.onSuccess(response);
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else {
                        this.errors = {
                            error: [ 'An unexpected error occured.' ]
                        }
                    }

                    window.scroll(0, 0);

                    this.onError(error);
                })
                .finally(() => {
                    this.isProcessing = false;

                    this.onFinally();
                })
        },

        onSuccess(response) {
            //
        },

        onError(error) {
            //
        },

        onFinally() {
            //
        }
    }
};
