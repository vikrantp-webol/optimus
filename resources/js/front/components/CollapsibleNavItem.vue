<template>
    <li>
        <span class="flex">
            <a :href="href" class="flex-grow">
                {{ title }}
            </a>

            <span
                class="icon medium"
                :class="{ 'rotate-180': isOpen }"
                @click="isOpen = ! isOpen"
            >
                <icon icon="angle-down" />
            </span>
        </span>

        <transition name="collapse-toggle">
            <ul v-show="isOpen" class="mobile-nav-sub">
                <slot />
            </ul>
        </transition>
    </li>
</template>

<script>
export default {
    props: {
        href: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },
};
</script>

<style lang="scss" scoped>
    .collapse-toggle-enter-active,
    .collapse-toggle-leave-active {
        transition: all 150ms ease-in-out;
    }

    .collapse-toggle-enter,
    .collapse-toggle-leave-to {
        opacity: 0;
        transform: translateY(20%);
    }
</style>
