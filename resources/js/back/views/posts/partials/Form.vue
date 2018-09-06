<template>
    <form @submit.prevent="submit">
        <errors :errors="form.errors.all()" v-if="form.errors.any()"></errors>

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

                        <!-- Tags -->
                        <o-form-field input="tags" label="Categories" v-if="tags.length" required>
                            <o-multi-select
                                id="tags"
                                v-model="form.tags"
                                :options="tags"
                                required
                            ></o-multi-select>
                        </o-form-field>

                        <!-- Excerpt -->
                        <o-form-field input="excerpt" label="Excerpt" required>
                            <o-input
                                id="excerpt"
                                type="textarea"
                                v-model="form.excerpt"
                                required
                            ></o-input>
                        </o-form-field>
                        
                        <!-- Body -->
                        <o-form-field input="body" label="Body" required>
                            <editor v-model="form.body"></editor>
                        </o-form-field>

                        <!-- Published at -->
                        <o-form-field input="published_at" label="Published at" required>
                            <date-picker
                                id="published_at"
                                v-model="form.published_at"
                                required
                            ></date-picker>
                        </o-form-field>

                        <!-- Image -->
                        <o-form-field input="image" label="Image" required>
                            <media-picker
                                :limit="1"
                                v-model="form.image"
                                preview
                            >
                                <template slot="help">
                                    This image will be resized to 1000x500px
                                </template>
                            </media-picker>
                        </o-form-field>
                    </div>
                </div>

                <div class="column is-12 is-4-fullhd">
                    <hr class="my-4 is-hidden-fullhd">

                    <div class="pl-4-fullhd">
                        <!-- <meta-holder v-model="form.meta"></meta-holder> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="field">
                <div class="control">
                    <button
                        class="button is-success"
                        :class="{ 'is-loading': form.processing }"
                    >Save</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import Form from 'form-backend-validation';
    import formMixin from '../../../mixins/form';

    import DatePicker from '../../../components/DatePicker';

    export default {
        components: { DatePicker },

        mixins: [ formMixin ],

        data() {
            return {
                form: new Form({
                    title: '',
                    excerpt: '',
                    body: '',
                    tags: [],
                    image: null,
                    meta: {
                        title: '',
                        description: ''
                    },
                    published_at: '',
                    // meta: {
                    //     title: '',
                    //     description: ''
                    // }
                }),

                tags: []
            }
        },

        watch: {
            item(item) {
                this.form.populate({
                    title: item.title,
                    excerpt: item.excerpt,
                    tags: item.tags.map(({ id }) => id),
                    body: item.body,
                    meta: item.meta,
                    image: item.image.id,
                    published_at: item.published_at,
                    // meta: item.meta
                });

                // this.$mediaManager.setActiveMedia([item.image]);
            }
        },

        created() {
            this.fetchTags();
        },

        beforeDestroy() {
            this.$mediaManager.clearActiveMedia();
        },

        methods: {
            fetchTags() {
                this.$loader.start('tags');

                axios.get('/api/post-tags').then(response => {
                    this.tags = response.data.data.map(({ id, name }) => {
                        return {
                            id,
                            name
                        }
                    });

                    this.$loader.stop('tags');
                });
            },

            submit() {
                this.form[this.method](this.action)
                    .then(response => {
                        this.$router.push({
                            name: 'posts.index'
                        });
                    });
            }
        }
    }
</script>
