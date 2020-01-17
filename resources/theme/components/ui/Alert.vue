<template>
    <o-modal :active="isOpen" @close="confirm">
        <div class="modal-content bg-white rounded max-w-sm">
            <div class="content px-6 pt-8 text-center">
                <slot />
            </div>

            <div class="p-6 text-center">
                <a
                    class="button w-full sm:w-1/2"
                    :class="buttonClass"
                    @click="confirm"
                >
                    {{ buttonText }}
                </a>
            </div>
        </div>
    </o-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        id: {
            type: String,
            default: null,
        },

        buttonText: {
            type: String,
            default: 'Ok',
        },

        buttonClass: {
            type: String,
            default: 'green',
        },
    },

    computed: {
        ...mapGetters({
            isOpen: 'alert/isOpen',
        }),
    },

    methods: {
        ...mapActions({
            open: 'alert/open',
            close: 'alert/close',
        }),

        confirm() {
            this.$emit('close');
            this.close();
        },
    },
};
</script>
