<template>
    <user-form
        :item="this.user"
        method="patch"
        :action="this.uri"
    ></user-form>
</template>

<script>
    import UserForm from './partials/Form';

    export default {
        components: { UserForm },

        data() {
            return {
                user: null
            }
        },

        computed: {
            uri() {
                return '/api/admin-users/' + this.$route.params.id;
            }
        },

        created() {
            this.setTitle('Edit user');

            this.fetchUser();
        },

        methods: {
            fetchUser() {
                this.$loader.startLoading('primary.admin-user');

                axios.get(this.uri).then(response => {
                    this.user = response.data.data;

                    this.$loader.stopLoading('primary.admin-user');
                });
            }
        }
    }
</script>
