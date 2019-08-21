<template>
    <user-form :item="user" />
</template>

<script>
import { getUser } from '../../util/api-client';
import UserForm from './partials/Form';

export default {
    components: { UserForm },

    data() {
        return {
            user: null,
        };
    },

    computed: {
        userId() {
            return this.$route.params.id;
        },
    },

    watch: {
        userId() {
            this.fetchUser();
        },
    },

    created() {
        this.setTitle('Edit user');

        this.fetchUser();
    },

    methods: {
        fetchUser() {
            this.startLoading('primary.user');

            getUser(this.userId).then(response => {
                this.user = response.data.data;

                // todo remove when user package is updated
                let item = { avatar: null };
                this.user = { ...this.user, ...item };
                //

                this.stopLoading('primary.user');
            });
        },
    },
};
</script>
