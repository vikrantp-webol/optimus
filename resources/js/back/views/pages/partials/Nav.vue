<template>
    <ul class="list-reset">
        <o-sub-nav-item
            :to="{ name: 'pages.index' }"
            :class="{ 'is-active': route.name === 'pages.index' }"
        >Manage pages</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'pages.create' }"
            :class="{ 'is-active': route.name === 'pages.create' }"
        >Add page</o-sub-nav-item>
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
