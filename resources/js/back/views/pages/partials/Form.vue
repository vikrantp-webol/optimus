<template>
    <form @submit.prevent="submit">
        <o-errors :errors="form.errors.all()" v-if="form.errors.any()"></o-errors>

        <div class="has-border-bottom p-4">
            <div class="columns is-gapless is-multiline">
                <div class="column is-12 is-8-fullhd">
                    <div class="pr-4-fullhd">
                        <!-- Title -->
                        <o-form-field input="title" label="Title" required>
                            <o-input
                                id="title"
                                v-model="form.title"
                                required
                            ></o-input>
                        </o-form-field>

                        <!-- Parent id -->
                        <o-form-field
                            v-if="! item || ! item.has_fixed_slug"
                            input="parent_id"
                            label="Parent"
                        >
                            <o-select id="parent_id" v-model="form.parent_id">
                                <option :value="null" disabled>Please select...</option>
                                <option :value="page.id" :key="page.id" v-for="page in pages">{{
                                    page.title
                                }}</option>
                            </o-select>
                        </o-form-field>

                        <!-- Template -->
                        <o-form-field
                            v-if="! item || ! item.has_fixed_template"
                            input="template_id"
                            label="Template"
                            required
                        >
                            <o-select id="template_id" v-model="form.template_id" required>
                                <option :value="null" disabled>Please select...</option>
                                <option
                                    :key="template.id"
                                    v-if="template.is_selectable"
                                    v-for="template in templates"
                                    :value="template.id"
                                >{{ template.name }}</option>
                            </o-select>
                        </o-form-field>

                        <!-- Contents -->
                        <component
                            :is="activeTemplate"
                            v-if="activeTemplate"
                            :media="media"
                            v-model="form.contents"
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
                                v-model="form.is_stand_alone"
                            ></o-checkbox>
                        </o-form-field>
                    </div>
                </div>

                <div class="column is-12 is-4-fullhd">
                    <hr class="my-4 is-hidden-fullhd">

                    <div class="pl-4-fullhd">
                        <meta-holder v-model="form.meta"></meta-holder>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="field is-grouped is-vcentered">
                <div class="control">
                    <button
                        class="button is-success"
                        :class="{ 'is-loading': form.processing }"
                    >Save</button>
                </div>

                <!-- Publish -->
                <o-checkbox
                    id="is_published"
                    label="Publish"
                        v-if="! item || item.is_deletable"
                    v-model="form.is_published"
                ></o-checkbox>
            </div>
        </div>
    </form>
</template>

<script>
    import Form from 'form-backend-validation';
    import formMixin from '../../../mixins/form';
    import templates from '../templates';

    export default {
        components: { ...templates },

        mixins: [ formMixin ],

        data() {
            return {
                form: new Form({
                    title: '',
                    slug: '',
                    parent_id: null,
                    template_id: null,
                    contents: null,
                    is_published: true,
                    is_stand_alone: false,
                    meta: {
                        title: '',
                        description: ''
                    }
                }),

                media: [],
                contents: [],

                pages: [],
                templates: []
            }
        },

        computed: {
            activeTemplate() {
                let template = this.templates.find(({ id }) => id === this.form.template_id);

                return template ? template.component : null;
            }
        },

        watch: {
            item(item) {
                this.form.populate({
                    title: item.title,
                    slug: item.slug,
                    parent_id: item.parent_id,
                    template_id: item.template.id,
                    contents: item.contents,
                    is_published: item.is_published,
                    is_stand_alone: item.is_stand_alone,
                    meta: item.meta
                });

                this.media = item.media;
                this.$mediaManager.setActiveMedia(this.media);

                this.contents = item.contents;
            }
        },

        created() {
            this.fetchPages();
            this.fetchTemplates();
        },

        beforeDestroy() {
            this.$mediaManager.clearActiveMedia();
        },

        methods: {
            fetchPages() {
                this.$loader.startLoading('pages');
                
                axios.get('/api/pages', {
                    params: { parent: 'root' }
                }).then(response => {
                    this.pages = response.data.data.filter(({ id }) => id !== this.$route.params.id);
                    
                    this.$loader.stopLoading('pages');
                });
            },

            fetchTemplates() {
                this.$loader.startLoading('templates');
                
                axios.get('/api/page-templates').then(response => {
                    this.templates = response.data.data;

                    this.$loader.stopLoading('templates');
                });
            },

            submit() {
                let query = this.form.parent_id ? { parent: this.form.parent_id } : null;

                this.form[this.method](this.action)
                    .then(response => {
                        this.$router.push({
                            name: 'pages.index',
                            query
                        });
                    });
            }
        }
    }
</script>
