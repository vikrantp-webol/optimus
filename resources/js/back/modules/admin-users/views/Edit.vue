<template>
    <admin-user-form
        :item="user"
    />
</template>

<script>
import { getAdminUser } from '../routes/api';
import AdminUserForm from './partials/Form';

export default {
    components: { AdminUserForm },

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
        this.setTitle('Edit Admin User');

        this.fetchUser();
    },

    methods: {
        fetchUser() {
            this.startLoading('primary.admin-user');

            getAdminUser(this.userId).then(response => {
                this.user = response.data.data;

                this.stopLoading('primary.admin-user');
            }).catch(() => {
                this.$router.push({
                    name: 'admin-users.index',
                });
            });
        },
    },
};
</script>
