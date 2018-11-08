<template>
    <user-form
        method="post"
        action="/api/admin-users"
    ></user-form>
</template>

<script>
    import UserForm from './partials/Form';

    export default {
        components: { UserForm }
    }
</script>
