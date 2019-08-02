<template>
    <user-form
        method="post"
        action="/admin/api/users"
    />
</template>

<script>
import UserForm from './partials/Form';

export default {
    components: { UserForm },

    created() {
        this.setTitle('Add user');
    },
};
</script>
