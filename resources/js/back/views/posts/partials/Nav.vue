<template>
    <ul class="list-reset">
        <o-sub-nav-item
            :to="{ name: 'posts.index' }"
            :class="{ 'is-active': route.name === 'posts.index' }"
        >Manage news</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'posts.create' }"
            :class="{ 'is-active': route.name === 'posts.create' }"
        >Add news article</o-sub-nav-item>

        <li class="is-divider"></li>

        <o-sub-nav-item
            :to="{ name: 'posts.tags.index' }"
            :class="{ 'is-active': route.name === 'posts.tags.index' }"
        >Manage categories</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'posts.tags.create' }"
            :class="{ 'is-active': route.name === 'posts.tags.create' }"
        >Add category</o-sub-nav-item>
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
