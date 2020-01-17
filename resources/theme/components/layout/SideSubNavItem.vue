<template>
    <router-link :to="to" tag="li" :class="{ 'active': isActive }">
        <a>
            <slot />
        </a>
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: Object,
            default: () => {},
        },
    },

    computed: {
        isActive() {
            let route = this.$route.matched[this.$route.matched.length - 1];

            return this.to.hasOwnProperty('name') && route.name === this.to.name;
        },
    },
};
</script>
