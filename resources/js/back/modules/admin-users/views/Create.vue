<template>
    <admin-user-form />
</template>

<script>
import AdminUserForm from './partials/Form';

export default {
    components: { AdminUserForm },

    created() {
        this.setTitle('Add Admin User');
    },
};
</script>
