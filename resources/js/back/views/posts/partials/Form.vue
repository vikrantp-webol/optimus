<template>
    <form @submit.prevent="submit">
        <o-errors v-if="anyErrors" :errors="errors" />

        <div class="p-8 border-b border-grey-400">
            <div class="max-w-3xl">
                <!-- Title -->
                <o-form-field input="title" label="Title" required>
                    <o-input
                        id="title"
                        v-model="form.title"
                        required
                    />
                </o-form-field>

                <!-- Tags -->
                <o-form-field
                    v-if="tags.length"
                    input="tags"
                    label="Categories"
                    required
                >
                    <o-multi-select
                        id="tags"
                        v-model="form.tags"
                        :options="tags"
                        required
                    />
                </o-form-field>

                <!-- Excerpt -->
                <o-form-field input="excerpt" label="Excerpt" required>
                    <o-input
                        id="excerpt"
                        v-model="form.excerpt"
                        type="textarea"
                        required
                    />
                </o-form-field>

                <!-- Body -->
                <o-form-field input="body" label="Body" required>
                    <editor v-model="form.body" />
                </o-form-field>

                <!-- Published at -->
                <o-form-field input="published_at" label="Published at" required>
                    <o-date-picker
                        id="published_at"
                        v-model="form.published_at"
                        required
                    />
                </o-form-field>

                <!-- Image -->
                <o-form-field input="image" label="Image" required>
                    <media-picker
                        id="image"
                        v-model="form.image"
                        :media="getMedia('image')"
                        preview
                        accepted-extensions="image"
                    />

                    <template slot="help">
                        This image will be resized to 1000x500px
                    </template>
                </o-form-field>
            </div>
        </div>

        <div class="p-8">
            <button
                class="button green"
                :class="{ 'loading': isProcessing }"
            >
                Save
            </button>
        </div>
    </form>
</template>

<script>
import formMixin from '../../../mixins/form';

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
                published_at: '',
            },

            tags: [],
        };
    },

    watch: {
        item(item) {
            this.form = {
                title: item.title,
                excerpt: item.excerpt,
                body: item.body,
                tags: item.tags.map(({ id }) => id),
                image: item.image ? item.image.id : null,
                published_at: item.published_at,
            };
        },
    },

    created() {
        this.fetchTags();
    },

    methods: {
        fetchTags() {
            this.$loader.startLoading('primary.tags');

            axios.get('/admin/api/post-tags').then(response => {
                this.tags = response.data.data.map(({ id, name }) => {
                    return {
                        value: id,
                        label: name,
                    };
                });

                this.$loader.stopLoading('primary.tags');
            });
        },

        onSuccess() {
            this.$router.push({
                name: 'posts.index',
            });
        },
    },
};
</script>
