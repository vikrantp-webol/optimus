<template>
    <ul class="list-reset">
        <o-sub-nav-item
            :to="{ name: 'users.index' }"
            :class="{ 'is-active': route.name === 'users.index' }"
        >Manage users</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'users.create' }"
            :class="{ 'is-active': route.name === 'users.create' }"
        >Add user</o-sub-nav-item>
    </ul>
</template>

<script>
    export default {
        computed: {
            route() {
                return this.$route.matched[this.$route.matched.length - 1];
            }
        }
    }
</script>
