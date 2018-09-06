<template>
    <transition name="cookie">
        <div class="cookie-notice px-4-widescreen py-3" v-if="isActive">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },

        methods: {
            close() {
                axios.post('/cookies/accept');
                this.isActive = false;
            }
        }
    }
</script>
