<template>
    <o-loader :loading="isLoading('primary.*')">
        <form @submit.prevent="submit">
            <o-errors v-if="anyErrors" :errors="errors" />

            <div class="p-8 border-b border-grey-400">
                <div class="max-w-3xl">
                    <o-tabs>
                        <o-tab name="Content">
                            <!-- Title -->
                            <o-form-field input="title" label="Title" required>
                                <o-input
                                    id="title"
                                    v-model="form.title"
                                    required
                                />
                            </o-form-field>

                            <div class="lg:flex lg:-mx-4">
                                <div class="mb-8 flex-grow lg:px-4">
                                    <!-- Parent -->
                                    <o-form-field
                                        v-if="! item || ! item.template.is_fixed"
                                        input="parent_id"
                                        label="Parent"
                                    >
                                        <o-select id="parent_id" v-model="form.parent_id">
                                            <option :value="null" disabled>
                                                Please select...
                                            </option>

                                            <option v-for="page in pages" :key="page.id" :value="page.id">
                                                {{ page.title }}
                                            </option>
                                        </o-select>
                                    </o-form-field>
                                </div>

                                <div v-if="! item || ! item.template.is_fixed" class="mb-8 flex-grow lg:px-4">
                                    <!-- Template -->
                                    <o-form-field
                                        input="template_id"
                                        label="Template"
                                        required
                                    >
                                        <o-select id="template_id" v-model="form.template.name" required>
                                            <option value="" disabled>
                                                Please select...
                                            </option>

                                            <option
                                                v-for="template in templates"
                                                :key="template.name"
                                                :value="template.name"
                                            >
                                                {{ template.label }}
                                            </option>
                                        </o-select>
                                    </o-form-field>
                                </div>
                            </div>

                            <!-- Contents -->
                            <component
                                :is="form.template.name"
                                v-if="form.template.name"
                                v-model="form.template.data"
                                :item="item ? item.template.data : null"
                            />

                            <!-- Stand alone -->
                            <o-form-field
                                v-if="! item || item.is_deletable"
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
                            <o-form-field input="slug" label="Slug">
                                <o-input
                                    id="slug"
                                    v-model="form.slug"
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
                        v-if="! item || item.is_deletable"
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
                });

                this.stopLoading('primary.pages');
            });
        },

        fetchTemplates() {
            this.startLoading('primary.templates');

            getPageTemplates().then(response => {
                this.templates = response.data.data;

                this.stopLoading('primary.templates');
            });
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
