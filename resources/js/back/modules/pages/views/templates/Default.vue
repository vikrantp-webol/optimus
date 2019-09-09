<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="default_content" label="Content" required>
            <editor
                id="default_content"
                v-model="form.content"
            />
        </o-form-field>

        <!-- Images -->
        <o-form-field input="image_id" label="Image">
            <media-picker
                id="image_id"
                v-model="form.image_id"
                :media="image"
                preview
            >
                <template slot="help">
                    This image will be constrained to 1000px width
                </template>
            </media-picker>
        </o-form-field>
    </div>
</template>

<script>
import templateMixin from '../../mixins/template';

export default {
    mixins: [ templateMixin ],

    data() {
        return {
            form: {
                content: '',
                image_id: null,
            },

            image: null,
        };
    },

    watch: {
        item(item) {
            this.form = {
                content: item.content,
                image_id: item.image ? item.image.id : null,
            };

            this.image = item.image;
        },
    },
};
</script>
