<template>
    <user-form
        :item="user"
        method="patch"
        :action="uri"
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
                return '/admin/api/users/' + this.userId;
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

                    // todo remove when user package is updated
                    let item = { avatar: null };
                    this.user = { ...this.user, ...item };
                    //
                    
                    this.$loader.stopLoading('primary.user');
                });
            }
        }
    }
</script>
