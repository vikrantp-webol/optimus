<template>
    <user-form
        :item="this.user"
        method="patch"
        :action="this.uri"
    ></user-form>
</template>

<script>
    import { mapMutations } from 'vuex';
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
                return '/api/users/' + this.$route.params.id;
            }
        },

        created() {
            this.fetchUser();
        },

        methods: {
            ...mapMutations({
                startLoading: 'loader/start',
                stopLoading: 'loader/stop'
            }),

            fetchUser() {
                this.startLoading('user');

                axios.get(this.uri).then(response => {
                    this.user = response.data.data;

                    this.stopLoading('user');
                });
            }
        }
    }
</script>
