<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="default_content" label="Content" required>
            <editor
                id="default_content"
                v-model="form.content"
            />
        </o-form-field>

        <!-- Testing -->
        <o-form-field input="date" label="Date" required>
            <o-date-picker
                id="date"
                v-model="form.date"
                :time="false"
            />
        </o-form-field>

        <!-- Images -->
        <o-form-field input="image_ids" label="Images">
            <media-picker
                id="images"
                v-model="form.image_ids"
                :media="images"
                :limit="null"
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
    mixin: [ templateMixin ],

    data() {
        return {
            form: {
                content: '',
                date: '',
                image_ids: null,
            },

            images: [],
        };
    },

    watch: {
        item(item) {
            this.form = {
                content: item.content,
                date: item.date,
                image_ids: item.images.map(({ id }) => id),
            };

            this.images = item.images;
        },
    },
};
</script>
