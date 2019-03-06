<template>
    <form @submit.prevent="submit">
        <o-errors v-if="anyErrors" :errors="errors"></o-errors>

        <div class="p-8 border-b border-grey-light">
            <div class="xl:w-2/3">
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
                    <o-date-picker
                        id="published_at"
                        v-model="form.published_at"
                        required
                    ></o-date-picker>
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

        <div class="p-8">
            <button
                class="button button-green"
                :class="{ 'loading': isProcessing }"
            >Save</button>
        </div>
    </form>
</template>

<script>
    import formMixin from 'back/js/mixins/form';

    export default {
        mixins: [ formMixin ],

        data() {
            return {
                form: {
                    title: '',
                    excerpt: '',
                    body: '',
                    tags: [],
                    image: null,
                    published_at: ''
                },

                tags: []
            }
        },

        watch: {
            item(item) {
                this.form = {
                    title: item.title,
                    excerpt: item.excerpt,
                    body: item.body,
                    tags: item.tags.map(({ id }) => id),
                    image: item.image.id,
                    published_at: item.published_at
                };

                this.$mediaManager.setActiveMedia([item.image]);
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
                this.$loader.startLoading('primary.tags');

                axios.get('/api/post-tags').then(response => {
                    this.tags = response.data.data.map(({ id, name }) => {
                        return {
                            value: id,
                            label: name
                        }
                    });

                    this.$loader.stopLoading('primary.tags');
                });
            },

            onSuccess() {
                this.$router.push({ name: 'posts.index' });
            }
        }
    }
</script>
