<script>
    export default {
        props: {
            active: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                isOpen: this.active,
                isActive: this.active
            }
        },

        methods: {
            open() {
                this.isOpen = true;
                this.isActive = true;
            },

            close() {
                this.isActive = false;
            }
        }
    }
</script>
