<script>
export default {
    data() {
        return {
            mobileNavigationIsVisible: false,
        };
    },

    methods: {
        toggleMobileNavigation() {
            this.mobileNavigationIsVisible = ! this.mobileNavigationIsVisible;
        },

        closeMobileNavigation() {
            this.mobileNavigationIsVisible = false;
        },
    },
};
</script>
