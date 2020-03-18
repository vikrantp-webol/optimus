<template>
    <div>
        <router-view />
        <media-manager />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    created() {
        this.setAdminUser(this.user);
    },

    methods: {
        ...mapActions({
            setAdminUser: 'adminUser/setUserData',
        }),
    },
};
</script>
