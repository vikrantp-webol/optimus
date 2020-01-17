<template>
    <transition name="notification">
        <div class="p-6" :class="notificationClass">
            <a
                v-if="closeable"
                class="delete"
                @click="$emit('close')"
            />

            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        closeable: {
            type: Boolean,
            default: false,
        },

        isSuccess: {
            type: Boolean,
            default: false,
        },

        isError: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        notificationClass() {
            if (this.isSuccess) {
                return 'bg-green-500 text-white';
            }

            if (this.isError) {
                return 'bg-red-500 text-white';
            }

            return 'bg-blue-300';
        },
    },
};
</script>
