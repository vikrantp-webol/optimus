<template>
    <li>
        <span class="has-collapse-toggle">
            <a :href="href">
                {{ title }}
            </a>

            <span class="is-collapse-toggle" @click="isOpen = ! isOpen">
                <span class="icon has-text-white" :class="{ 'is-rotated-180': isOpen }">
                    <icon icon="angle-down" size="2x"></icon>
                </span>
            </span>
        </span>

        <transition name="slide-fade">
            <ul class="nav is-mobile-sub" v-show="isOpen">
                <slot></slot>
            </ul>
        </transition>
    </li>
</template>

<script>
    export default {
        props: {
            href: {
                type: String,
                required: true
            },

            title: {
                type: String,
                required: true
            },

            open: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                isOpen: false
            }
        },

        mounted() {
            this.isOpen = this.open;
        }
    }
</script>
