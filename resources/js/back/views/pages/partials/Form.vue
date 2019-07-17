<template>
    <form @submit.prevent="submit">
        <o-errors v-if="anyErrors" :errors="errors"></o-errors>

        <div class="p-8 border-b border-grey-400">
            <div class="xl:w-2/3">
                <!-- Title -->
                <o-form-field input="title" label="Title" required>
                    <o-input
                        id="title"
                        v-model="fields.title"
                        required
                    ></o-input>
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
                                <option :value="null" disabled>Please select...</option>
                                <option :value="page.id" :key="page.id" v-for="page in pages">{{
                                    page.title
                                }}</option>
                            </o-select>
                        </o-form-field>
                    </div>

                    <div class="mb-8 flex-grow lg:px-4" v-if="! item || ! item.has_fixed_template">
                        <!-- Template -->
                        <o-form-field
                            input="template_id"
                            label="Template"
                            required
                        >
                            <o-select id="template_id" v-model="fields.template" required>
                                <option :value="null" disabled>Please select...</option>
                                <option
                                    :key="template.name"
                                    v-for="template in templates"
                                    :value="template.name"
                                >{{ template.label }}</option>
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
                ></component>

                <!-- Stand alone -->
                <o-form-field
                    v-if="! item || item.is_deletable"
                    input="is_stand_alone"
                    label="Stand alone"
                >
                    <o-checkbox
                        id="is_stand_alone"
                        label="Yes"
                        v-model="fields.is_stand_alone"
                    ></o-checkbox>
                </o-form-field>
            </div>
        </div>

        <div class="p-8">
            <div class="field flex items-center">
                <div class="control">
                    <button
                        class="button green"
                        :class="{ 'loading': isProcessing }"
                    >Save</button>
                </div>
                
                <!-- Publish -->
                <o-checkbox
                    id="is_published"
                    v-if="! item || item.is_deletable"
                    label="Publish"
                    class="ml-4"
                    v-model="fields.is_published"
                ></o-checkbox>
            </div>
        </div>
    </form>
</template>

<script>
    import formMixin from '../../../mixins/form';
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
                    is_stand_alone: false
                },
                dynamicFields: {},

                media: [],
                contents: [],

                pages: [],
                templates: []
            }
        },

        computed: {
            form() {
                return Object.assign({}, this.fields, this.dynamicFields);
            }
        },

        watch: {
            item(item) {
                this.fields = {
                    title: item.title,
                    slug: item.slug,
                    parent_id: item.parent_id,
                    template: item.template,
                    is_published: item.is_published,
                    is_stand_alone: item.is_stand_alone
                };

                this.contents = item.contents;
            }
        },

        created() {
            this.fetchPages();
            this.fetchTemplates();
        },

        methods: {
            fetchPages() {
                this.$loader.startLoading('primary.pages');
                
                axios.get('/admin/api/pages', {
                    params: { parent: 'root' }
                }).then(response => {
                    this.pages = response.data.data.filter(({ id }) => id !== this.$route.params.id);
                    
                    this.$loader.stopLoading('primary.pages');
                });
            },

            fetchTemplates() {
                this.$loader.startLoading('primary.templates');
                
                axios.get('/admin/api/page-templates').then(response => {
                    this.templates = response.data.data;

                    this.$loader.stopLoading('primary.templates');
                });
            },

            onSuccess() {
                let query = this.form.parent_id ? { parent: this.form.parent_id } : null;

                this.$router.push({
                    name: 'pages.index',
                    query
                });
            }
        }
    }
</script>
