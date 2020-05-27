<template>
    <o-loader :loading="isLoading('primary.*')">
        <form ref="form" @submit.prevent="submit">
            <o-errors
                v-if="anyErrors"
                class="mb-4 rounded"
                :errors="errors"
            />

            <div class="mb-2">
                <div class="-m-2 sm:flex">
                    <div class="p-2 flex-grow">
                        <!-- Label -->
                        <o-form-field
                            input="label"
                            label="Label"
                            required
                        >
                            <o-input
                                id="label"
                                v-model="form.label"
                                required
                            />
                        </o-form-field>
                    </div>

                    <div v-if="menuMaxDepth > 0" class="p-2 flex-shink-0 sm:w-2/5">
                        <o-form-field input="parent_id" label="Parent">
                            <div class="field addons cursor-pointer">
                                <div class="control flex-grow control-icon-right">
                                    <o-input
                                        id="parent_id"
                                        class="cursor-pointer"
                                        :value="parentPickerLabel"
                                        readonly
                                    />

                                    <a
                                        v-if="form.parent_id"
                                        class="icon"
                                        @click="form.parent_id = null"
                                    >
                                        <icon icon="times" />
                                    </a>
                                </div>

                                <div class="control">
                                    <div
                                        class="button"
                                        title="Choose parent"
                                        @click="toggleSelectingParentId"
                                    >
                                        <icon
                                            :icon="isSelectingParentId ? 'stop' : 'hand-pointer'"
                                        />
                                    </div>
                                </div>
                            </div>
                        </o-form-field>
                    </div>
                </div>
            </div>

            <div class="mb-2">
                <div class="-m-2 md:flex">
                    <div class="p-2 flex-shink-0 sm:w-2/5">
                        <!-- Linkable type -->
                        <o-form-field
                            input="linkable_type"
                            label="Link type"
                            required
                        >
                            <o-select
                                id="linkable_type"
                                v-model="form.linkable_type"
                                :options="linkableTypeOptions"
                                placeholder="External Url"
                                @change="resetRelationship"
                            />
                        </o-form-field>
                    </div>

                    <div class="p-2 flex-grow">
                        <!-- Url -->
                        <o-form-field
                            v-if="! selectedLinkableType"
                            input="url"
                            label="Url"
                            required
                        >
                            <o-input
                                id="url"
                                v-model="form.url"
                                required
                            />
                        </o-form-field>

                        <!-- Linkable id -->
                        <o-form-field
                            v-else
                            input="linkable_id"
                            :label="linkablePickerLabel"
                            required
                        >
                            <linkable-items-selector
                                id="linkable_id"
                                v-model="form.linkable_id"
                                :linkable-type="selectedLinkableType"
                            />
                        </o-form-field>
                    </div>
                </div>
            </div>

            <div class="-m-2 md:flex">
                <div class="p-2 flex-shink-0 sm:w-2/5">
                    <!-- Url parameters -->
                    <o-form-field input="url_parameters" label="Additional parameters">
                        <o-input
                            id="url_parameters"
                            v-model="form.url_parameters"
                            placeholder="Eg. #anchor-link, ?page=2"
                        />
                    </o-form-field>
                </div>

                <div class="p-2 flex flex-grow items-end">
                    <div class="field flex flex-grow items-center justify-between">
                        <o-checkbox
                            id="opens_in_new_tab"
                            v-model="form.opens_in_new_tab"
                            label="Open in new tab"
                        />

                        <div>
                            <a
                                v-if="isEditing"
                                class="button mr-2"
                                @click="reset"
                            >
                                Cancel
                            </a>

                            <button
                                class="button green"
                                :class="{ 'loading': isProcessing }"
                                :disabled="isProcessing"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </o-loader>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { formMixin } from '@optimuscms/theme';
import { initialFormValues } from '../../../store/menu';

import {
    getLinkableTypes,
    createMenuItem,
    updateMenuItem,
} from '../../../routes/api';

import LinkableItemsSelector from '../components/LinkableItemsSelector';

export default {
    components: { LinkableItemsSelector },

    mixins: [ formMixin ],

    data() {
        return {
            form: initialFormValues(),
        };
    },

    computed: {
        ...mapGetters({
            menuItems: 'menu/menuItems',
            menuMaxDepth: 'menu/menuMaxDepth',
            linkableTypes: 'menu/linkableTypes',
            selectedParentId: 'menu/selectedParentId',
            isSelectingParentId: 'menu/isSelectingParentId',
        }),

        linkableTypeOptions() {
            return this.linkableTypes.map(({ identifier, name }) => {
                return {
                    value: identifier,
                    label: name,
                };
            });
        },

        isEditing() {
            return !! (this.item && this.item.id);
        },

        selectedLinkableType() {
            return this.form.linkable_type;
        },

        linkablePickerLabel() {
            const linkableType = this.linkableTypes.find(({ identifier }) => {
                return identifier === this.selectedLinkableType;
            });

            return linkableType ? linkableType.name : '';
        },

        parentPickerLabel() {
            if (this.isSelectingParentId) {
                return 'Select a parent from the list below';
            }

            if (this.form.parent_id) {
                const parent = this.menuItems.find(({ id }) => {
                    return id === this.form.parent_id;
                });

                if (parent) {
                    return parent.label;
                }
            }

            return 'No Parent';
        },
    },

    watch: {
        item(item) {
            this.form = {
                label: item.label,
                parent_id: item.parent_id,
                linkable_type: item.linkable_type,
                linkable_id: item.linkable_id,
                url: item.url,
                url_parameters: item.url_parameters,
                opens_in_new_tab: item.opens_in_new_tab,
            };

            this.$refs.form.scrollIntoView({
                inline: 'start',
                block: 'nearest',
                behavior: 'smooth',
            });
        },

        selectedParentId(parentId) {
            this.form.parent_id = parentId;

            this.$refs.form.scrollIntoView({
                inline: 'start',
                block: 'nearest',
                behavior: 'smooth',
            });
        },
    },

    methods: {
        ...mapActions({
            resetForm: 'menu/resetForm',
            addMenuItem: 'menu/addMenuItem',
            updateMenuItem: 'menu/updateMenuItem',
            clearSelectedParentId: 'menu/clearSelectedParentId',
            stopSelectingParentId: 'menu/stopSelectingParentId',
            toggleSelectingParentId: 'menu/toggleSelectingParentId',
        }),

        resetRelationship() {
            this.form.url = '';
            this.form.linkable_id = null;
        },

        save() {
            if (this.isEditing) {
                return updateMenuItem(this.item.id, this.form);
            }

            return createMenuItem(this.$route.params.menuId, this.form);
        },

        onSuccess(response) {
            const data = response.data.data;

            if (this.isEditing) {
                this.updateMenuItem({
                    id: this.item.id,
                    item: data,
                });
            } else {
                this.addMenuItem(data);
            }

            this.reset();
        },

        reset() {
            this.stopSelectingParentId();

            this.resetForm();
            this.clearSelectedParentId();
        },
    },
};
</script>
