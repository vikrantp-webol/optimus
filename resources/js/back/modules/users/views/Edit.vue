<template>
    <user-form :item="user" />
</template>

<script>
import { getUser } from '../routes/api';
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
        this.setTitle('Edit User');

        this.fetchUser();
    },

    methods: {
        fetchUser() {
            this.startLoading('primary.user');

            getUser(this.userId).then(response => {
                this.user = response.data.data;

                this.stopLoading('primary.user');
            });
        },
    },
};
</script>
