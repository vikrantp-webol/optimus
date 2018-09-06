<template>
    <user-form
        method="post"
        action="/api/users"
    ></user-form>
</template>

<script>
    import UserForm from './partials/Form';

    export default {
        components: { UserForm }
    }
</script>
