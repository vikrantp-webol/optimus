<template>
    <o-modal :active="isOpen" @close="close" @escape="close">
        <div class="modal-content bg-white rounded max-w-sm">
            <div class="content px-6 py-8 text-center">
                <slot :item="item">
                    Are you sure?
                </slot>
            </div>

            <div class="button-group">
                <a
                    class="button"
                    :class="buttonClass"
                    @click="confirm"
                >
                    {{ buttonText }}
                </a>

                <a
                    class="button"
                    @click="close"
                >
                    {{ buttonCancelText }}
                </a>
            </div>
        </div>
    </o-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        buttonText: {
            type: String,
            default: 'Confirm',
        },

        buttonClass: {
            type: String,
            default: 'green',
        },

        buttonCancelText: {
            type: String,
            default: 'Cancel',
        },
    },

    computed: {
        ...mapGetters({
            isOpen: 'confirmation/isOpen',
            item: 'confirmation/item',
        }),
    },

    methods: {
        ...mapActions({
            close: 'confirmation/close',
        }),

        confirm() {
            this.$emit('confirm', this.item);
            this.close();
        },
    },
};
</script>
