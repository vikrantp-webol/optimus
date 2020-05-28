<template>
    <o-loader :loading="isLoading('primary.*')">
        <form @submit.prevent="submit">
            <o-errors v-if="anyErrors" :errors="errors" />

            <div class="p-8 border-b border-grey-400">
                <div class="max-w-3xl">
                    <!-- Name -->
                    <o-form-field
                        input="name"
                        label="Name"
                        required
                    >
                        <o-input
                            id="name"
                            v-model="form.name"
                            required
                        />
                    </o-form-field>

                    <!-- Identifier -->
                    <o-form-field
                        input="identifier"
                        label="Identifier"
                        required
                    >
                        <o-input
                            id="identifier"
                            v-model="form.identifier"
                            required
                        />
                    </o-form-field>
                </div>
            </div>

            <div class="p-8">
                <button
                    class="button green"
                    :class="{ 'loading': isProcessing }"
                    :disabled="isProcessing"
                >
                    Save
                </button>
            </div>
        </form>
    </o-loader>
</template>

<script>
import { formMixin } from '@optimuscms/theme';
import {
    createMenu,
    updateMenu,
} from '../../routes/api';

export default {
    mixins: [ formMixin ],

    data() {
        return {
            form: {
                name: '',
                identifier: '',
            },
        };
    },

    watch: {
        item(item) {
            this.form = {
                name: item.name,
                identifier: item.identifier,
            };
        },
    },

    methods: {
        save() {
            if (this.isEditing) {
                return updateMenu(this.item.id, this.form);
            }

            return createMenu(this.form);
        },

        onSuccess() {
            this.$router.push({
                name: 'menus.index',
            });
        },
    },
};
</script>
