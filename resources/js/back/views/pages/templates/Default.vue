<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="content" label="Content" required>
            <editor v-model="form.content"></editor>
        </o-form-field>

        <!-- Images -->
        <o-form-field input="images" label="Images">
            <media-picker :limit="null" v-model="form.images">
                <template slot="help">
                    This image will be constrained to 1000px width
                </template>
            </media-picker>
        </o-form-field>
    </div>
</template>

<script>
    import templateMixin from '../../../mixins/template';

    export default {
        mixins: [ templateMixin ],

        data() {
            return {
                form: {
                    content: '',
                    images: null
                }
            }
        },

        methods: {
            populateForm() {
                this.form.content = this.getContent('content');
                this.form.images = this.getMediaIds('images');
            }
        }
    }
</script>
