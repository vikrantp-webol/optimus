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

                    <!-- Type -->
                    <o-form-field
                        input="type_id"
                        label="Type"
                        required
                    >
                        <o-select
                            id="type_id"
                            v-model="form.type_id"
                            :options="menuTypes"
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
    getMenuTypes,
} from '../../routes/api';

export default {
    mixins: [ formMixin ],

    data() {
        return {
            form: {
                name: '',
                type_id: null,
            },

            menuTypes: [],
        };
    },

    watch: {
        item(item) {
            this.form = {
                name: item.name,
                type_id: item.type ? item.type.id : null,
            };
        },
    },

    created() {
        this.getMenuTypes();
    },

    methods: {
        getMenuTypes() {
            getMenuTypes().then(response => {
                this.menuTypes = response.data.data.map(({ id, name }) => {
                    return {
                        value: id,
                        label: name,
                    };
                });
            });
        },

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
