<template>
    <div>
        <!-- Meta Title -->
        <o-form-field input="meta_title" label="Meta Title">
            <o-input
                id="meta_title"
                v-model="form.title"
            />
        </o-form-field>

        <!-- Meta Description -->
        <o-form-field input="meta_description" label="Meta Description">
            <o-input
                id="meta_description"
                v-model="form.description"
            />
        </o-form-field>

        <!-- OG Title -->
        <o-form-field input="meta_og_title" label="OG Title">
            <o-input
                id="meta_og_title"
                v-model="form.og_title"
            />
        </o-form-field>

        <!-- OG Description -->
        <o-form-field input="meta_og_description" label="OG Description">
            <o-input
                id="meta_og_description"
                v-model="form.og_description"
            />
        </o-form-field>

        <!-- OG Image -->
        <o-form-field input="meta_og_image" label="OG Image">
            <media-picker
                id="meta_og_image"
                v-model="form.og_image_id"
                :media="og_image"
                show-preview
                accepted-extensions="image"
            />

            <template slot="help">
                This image will be resized to 1200x630px
            </template>
        </o-form-field>

        <!-- Additional Tags -->
        <o-form-field input="meta_additional_tags" label="Custom Tags">
            <o-input
                id="meta_additional_tags"
                v-model="form.additional_tags"
                type="textarea"
            />
        </o-form-field>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            form: {
                title: '',
                description: '',
                og_title: '',
                og_description: '',
                og_image_id: null,
                additional_tags: '',
            },

            og_image: null,
        };
    },

    watch: {
        item: {
            handler(item) {
                if (item) {
                    this.form = {
                        title: item.title,
                        description: item.description,
                        og_title: item.og_title,
                        og_description: item.og_description,
                        og_image_id: item.og_image ? item.og_image.id : null,
                        additional_tags: item.additional_tags,
                    };

                    this.og_image = item.og_image;
                }
            },
            immediate: true,
        },

        form: {
            handler(form) {
                this.$emit('input', form);
            },
            deep: true,
        },
    },
};
</script>
