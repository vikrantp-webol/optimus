<template>
    <o-loader :loading="isLoading('primary.*')">
        <form @submit.prevent="submit">
            <o-errors v-if="anyErrors" :errors="errors" />

            <div class="p-8 border-b border-grey-400">
                <div class="max-w-3xl">
                    <o-tabs>
                        <o-tab name="Content">
                            <!-- Title -->
                            <o-form-field
                                input="title"
                                label="Title"
                                required
                            >
                                <o-input
                                    id="title"
                                    v-model="form.title"
                                    required
                                />
                            </o-form-field>

                            <div class="lg:flex lg:-mx-4">
                                <div class="mb-8 lg:w-1/2 lg:px-4">
                                    <!-- Parent -->
                                    <o-form-field
                                        input="parent_id"
                                        label="Parent"
                                    >
                                        <o-select
                                            id="parent_id"
                                            v-model="form.parent_id"
                                            :options="pages"
                                            placeholder="No parent"
                                            :disabled="getItemAttribute('has_fixed_path', false)"
                                        />
                                    </o-form-field>
                                </div>

                                <div class="mb-8 lg:w-1/2 lg:px-4">
                                    <!-- Template -->
                                    <o-form-field
                                        input="template_name"
                                        label="Template"
                                        required
                                    >
                                        <o-select
                                            id="template_name"
                                            v-model="form.template.name"
                                            :options="templates"
                                            :disabled="item && item.template.is_fixed"
                                        />
                                    </o-form-field>
                                </div>
                            </div>

                            <!-- Contents -->
                            <component
                                :is="getTemplateComponent(form.template.name)"
                                v-if="form.template.name"
                                v-model="form.template.data"
                                :item="item ? item.template.data : null"
                            />

                            <!-- Stand alone -->
                            <o-form-field
                                input="is_stand_alone"
                                label="Stand alone"
                            >
                                <o-checkbox
                                    id="is_stand_alone"
                                    v-model="form.is_standalone"
                                    label="Yes"
                                />
                            </o-form-field>
                        </o-tab>

                        <o-tab name="Meta">
                            <!-- Slug -->
                            <o-form-field
                                input="slug"
                                label="Slug"
                            >
                                <o-input
                                    id="slug"
                                    v-model="form.slug"
                                    :disabled="getItemAttribute('has_fixed_path', false)"
                                />
                            </o-form-field>

                            <o-meta-fields
                                v-model="form.meta"
                                :item="getItemAttribute('meta')"
                            />
                        </o-tab>
                    </o-tabs>
                </div>
            </div>

            <div class="p-8">
                <div class="field flex items-center">
                    <div class="control">
                        <button
                            class="button green"
                            :class="{ 'loading': isProcessing }"
                            :disabled="isProcessing"
                        >
                            Save
                        </button>
                    </div>

                    <!-- Publish -->
                    <o-checkbox
                        v-if="! getItemAttribute('is_deletable', false)"
                        id="is_published"
                        v-model="form.is_published"
                        label="Publish"
                        class="ml-4"
                    />
                </div>
            </div>
        </form>
    </o-loader>
</template>

<script>
import { formMixin } from '@optimuscms/theme';

import {
    getPages,
    createPage,
    updatePage,
    getPageTemplates,
} from '../../routes/api';

import templates from '../templates';

export default {
    components: { ...templates },

    mixins: [ formMixin ],

    data() {
        return {
            form: {
                title: '',
                slug: '',
                template: {
                    name: '',
                    data: {},
                },
                parent_id: null,
                is_standalone: false,
                is_published: true,
                meta: {
                    title: '',
                    description: '',
                    og_title: '',
                    og_description: '',
                    og_image_id: null,
                    additional_tags: '',
                },
            },

            pages: [],
            templates: [],
        };
    },

    watch: {
        item(item) {
            const meta = item.meta;
            const template = item.template;

            this.form = {
                title: item.title,
                slug: item.slug,
                template: {
                    name: template.name,
                    data: template.data,
                },
                parent_id: item.parent_id,
                is_standalone: item.is_standalone,
                is_published: item.is_published,
                meta: {
                    title: meta.title,
                    description: meta.description,
                    og_title: meta.og_title,
                    og_description: meta.og_description,
                    og_image_id: meta.og_image ? meta.og_image.id : null,
                    additional_tags: meta.additional_tags,
                },
            };
        },
    },

    created() {
        this.fetchPages();
        this.fetchTemplates();
    },

    methods: {
        fetchPages() {
            this.startLoading('primary.pages');

            getPages({ parent: 'root' }).then(response => {
                this.pages = response.data.data.filter(({ id }) => {
                    return id !== this.$route.params.id;
                }).map(({ id, title }) => {
                    return {
                        value: id,
                        label: title,
                    };
                });

                this.stopLoading('primary.pages');
            });
        },

        fetchTemplates() {
            this.startLoading('primary.templates');

            getPageTemplates().then(response => {
                this.templates = response.data.data.map(({ name, label }) => {
                    return {
                        value: name,
                        label,
                    };
                });

                this.stopLoading('primary.templates');
            });
        },

        getTemplateComponent(templateName) {
            return `Template${templateName.charAt(0).toUpperCase()}${templateName.slice(1)}`;
        },

        save() {
            if (this.isEditing) {
                return updatePage(this.item.id, this.form);
            }

            return createPage(this.form);
        },

        onSuccess() {
            let query = null;

            if (this.form.parent_id) {
                query = {
                    parent: this.form.parent_id,
                };
            }

            this.$router.push({
                name: 'pages.index',
                query,
            });
        },
    },
};
</script>
