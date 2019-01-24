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
            userId() {
                return this.$route.params.id;
            },

            uri() {
                return '/admin/users/' + this.userId;
            }
        },

        watch: {
            userId() {
                this.fetchUser();
            }
        },

        created() {
            this.setTitle('Edit user');
            
            this.fetchUser();
        },

        methods: {
            fetchUser() {
                this.$loader.startLoading('primary.user');

                axios.get(this.uri).then(response => {
                    this.user = response.data.data;

                    this.$loader.stopLoading('primary.user');
                });
            }
        }
    }
</script>
