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
                                    v-model="fields.title"
                                    required
                                />
                            </o-form-field>

                            <div class="lg:flex lg:-mx-4">
                                <div class="mb-8 flex-grow lg:px-4">
                                    <!-- Parent -->
                                    <o-form-field
                                        v-if="! item || ! item.has_fixed_slug"
                                        input="parent_id"
                                        label="Parent"
                                    >
                                        <o-select id="parent_id" v-model="fields.parent_id">
                                            <option :value="null" disabled>
                                                Please select...
                                            </option>

                                            <option v-for="page in pages" :key="page.id" :value="page.id">
                                                {{ page.title }}
                                            </option>
                                        </o-select>
                                    </o-form-field>
                                </div>

                                <div v-if="! item || ! item.has_fixed_template" class="mb-8 flex-grow lg:px-4">
                                    <!-- Template -->
                                    <o-form-field
                                        input="template_id"
                                        label="Template"
                                        required
                                    >
                                        <o-select id="template_id" v-model="fields.template" required>
                                            <option :value="null" disabled>
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
                                :is="fields.template"
                                v-if="fields.template"
                                v-model="dynamicFields"
                                :media="media"
                                :contents="contents"
                            />

                            <!-- Stand alone -->
                            <o-form-field
                                v-if="! item || item.is_deletable"
                                input="is_stand_alone"
                                label="Stand alone"
                            >
                                <o-checkbox
                                    id="is_stand_alone"
                                    v-model="fields.is_stand_alone"
                                    label="Yes"
                                />
                            </o-form-field>
                        </o-tab>

                        <o-tab name="Meta">
                            <!-- Meta Title -->
                            <o-form-field input="meta_title" label="Meta Title">
                                <o-input
                                    id="meta_title"
                                    v-model="fields.meta.title"
                                />
                            </o-form-field>

                            <!-- Meta Description -->
                            <o-form-field input="meta_description" label="Meta Description">
                                <o-input
                                    id="meta_description"
                                    v-model="fields.meta.description"
                                />
                            </o-form-field>

                            <!-- OG Title -->
                            <o-form-field input="meta_og_title" label="OG Title">
                                <o-input
                                    id="meta_og_title"
                                    v-model="fields.meta.og_title"
                                />
                            </o-form-field>

                            <!-- OG Description -->
                            <o-form-field input="meta_og_description" label="OG Description">
                                <o-input
                                    id="meta_og_description"
                                    v-model="fields.meta.og_description"
                                />
                            </o-form-field>

                            <!-- OG Image -->
                            <o-form-field input="meta_og_image" label="OG Image">
                                <media-picker
                                    id="meta_og_image"
                                    v-model="fields.meta.og_image_id"
                                    :media="og_image"
                                    preview
                                    accepted-extensions="image"
                                />

                                <template slot="help">
                                    This image will be resized to 1200x630px
                                </template>
                            </o-form-field>

                            <!-- Custom Tags -->
                            <o-form-field input="meta_custom_tags" label="Custom Tags">
                                <o-input
                                    id="meta_custom_tags"
                                    v-model="fields.meta.custom_tags"
                                    type="textarea"
                                />
                            </o-form-field>
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
                        >
                            Save
                        </button>
                    </div>

                    <!-- Publish -->
                    <o-checkbox
                        v-if="! item || item.is_deletable"
                        id="is_published"
                        v-model="fields.is_published"
                        label="Publish"
                        class="ml-4"
                    />
                </div>
            </div>
        </form>
    </o-loader>
</template>

<script>
import formMixin from '../../../mixins/form';

import {
    getPages,
    createPage,
    updatePage,
    getPageTemplates,
} from '../../../util/api-client';

import templates from '../templates';

export default {
    components: { ...templates },

    mixins: [ formMixin ],

    data() {
        return {
            fields: {
                title: '',
                slug: '',
                parent_id: null,
                template: null,
                is_published: true,
                is_stand_alone: false,

                meta: {
                    title: null,
                    description: null,
                    og_title: null,
                    og_description: null,
                    og_image: [],
                    og_image_id: null,
                    custom_tags: null,
                },
            },
            dynamicFields: {},

            media: [],
            og_image: null,
            contents: [],

            pages: [],
            templates: [],
        };
    },

    computed: {
        form() {
            return Object.assign({}, this.fields, this.dynamicFields);
        },
    },

    watch: {
        item(item) {
            let meta = item.meta || {};

            this.fields = {
                title: item.title,
                slug: item.slug,
                parent_id: item.parent_id,
                template: item.template,
                is_published: item.is_published,
                is_stand_alone: item.is_stand_alone,

                meta: {
                    title: meta.title,
                    description: meta.description,
                    og_title: meta.og_title,
                    og_description: meta.og_description,
                    og_image_id: meta.og_image ? item.meta.og_image.id : null,
                    custom_tags: meta.custom_tags,
                },
            };

            this.media = item.media;
            this.og_image = meta.og_image;

            this.contents = item.contents;
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
