<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="default_content" label="Content" required>
            <editor id="default_content" v-model="form.content"></editor>
        </o-form-field>

        <!-- Testing -->
        <o-form-field input="date" label="Date" required>
            <o-date-picker
                id="date"
                :time="false"
                v-model="form.date"
            ></o-date-picker>
        </o-form-field>

        <!-- Images -->
        <o-form-field input="images" label="Images">
            <media-picker
                id="images"
                :limit="null"
                v-model="form.images"
            >
            <!-- :media="getMedia('images')" -->
                <template slot="help">
                    This image will be constrained to 1000px width
                </template>
            </media-picker>
        </o-form-field>
    </div>
</template>

<script>
    import templateMixin from '@js/mixins/template';

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
