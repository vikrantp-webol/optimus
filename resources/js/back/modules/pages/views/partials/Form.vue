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
                                        input="template_id"
                                        label="Template"
                                        required
                                    >
                                        <o-select
                                            id="template_id"
                                            v-model="form.template_id"
                                            :options="templates"
                                            :disabled="getItemAttribute('has_fixed_template', false)"
                                        />
                                    </o-form-field>
                                </div>
                            </div>

                            <!-- Contents -->
                            <component
                                :is="templateComponent"
                                v-model="form.template_data"
                                :item="getItemAttribute('template_data')"
                            />

                            <div class="md:flex">
                                <div class="lg:w-1/2">
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
                                </div>

                                <div class="lg:w-1/2 lg:px-4" />
                            </div>
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
                        v-if="getItemAttribute('is_deletable', true)"
                        id="is_published"
                        v-model="form.is_published"
                        label="Publish"
                        class="ml-4"
                    />

                    <!-- Add to menu -->
                    <o-checkbox
                        v-if="! isEditing"
                        id="addToMenu"
                        v-model="addToMenu"
                        label="Add to menu"
                        class="ml-4"
                    />
                </div>
            </div>
        </form>
    </o-loader>
</template>

<script>
import { formMixin } from '@optimuscms/theme';
import {createMenuItem, getMenus} from '../../../menus/routes/api';

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
                template_id: '',
                template_data: null,
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
            addToMenu: true,
        };
    },

    computed: {
        templateComponent() {
            const template = this.templates.find(({ value }) => {
                return value === this.form.template_id;
            });

            if (! template) {
                return null;
            }

            return `template-${template.value}`;
        },
    },

    watch: {
        item(item) {
            const meta = item.meta;

            this.form = {
                title: item.title,
                slug: item.slug,
                template_id: item.template_id,
                template_data: item.template_data,
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
                this.templates = response.data.data.map(({ id, name }) => {
                    return {
                        value: id,
                        label: name,
                    };
                });

                this.stopLoading('primary.templates');
            });
        },

        save() {
            if (this.isEditing) {
                return updatePage(this.item.id, this.form);
            }

            return createPage(this.form)
                .then(pageResponse => { if (this.addToMenu) {
                    getMenus().then(menuResponse => {
                        let menu = menuResponse.data.data.find(({ identifier }) => {
                            return identifier === 'primary';
                        });

                        createMenuItem(menu.id, {
                            linkable_id: pageResponse.data.data.id,
                            linkable_type: 'pages',
                            label: this.form.title,
                            opens_in_new_tab: false,
                            url_parameters: '',
                            parent_id: null,
                            url: '',
                        });
                    });
                }});
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
