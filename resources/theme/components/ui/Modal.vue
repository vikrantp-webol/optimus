<template>
    <transition name="fade">
        <div v-if="active" class="modal active">
            <div class="modal-background" @click="$emit('close')" />

            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            required: true,
        },
    },

    created() {
        document.addEventListener('keydown', this.onEscape);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.onEscape);
    },

    methods: {
        onEscape(event) {
            if (this.active && event.keyCode === 27) {
                this.$emit('escape');
            }
        },
    },
};
</script>
