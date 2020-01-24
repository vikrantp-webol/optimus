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
        <o-form-field input="image_ids" label="Images">
            <media-picker
                id="image_ids"
                v-model="form.image_ids"
                :limit="null"
                :media="getItemAttribute('images')"
                accepted-extensions="image"
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
                image_ids: [],
            },
        };
    },

    watch: {
        item: {
            handler(item) {
                if (item) {
                    this.form = {
                        content: item.content,
                        image_ids: item.images.map(({ id }) => id),
                    };
                }
            },
            immediate: true,
        },
    },
};
</script>
