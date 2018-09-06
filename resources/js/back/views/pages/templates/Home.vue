<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="content" label="Content" required>
            <editor v-model="form.content"></editor>
        </o-form-field>
    </div>
</template>

<script>
    import template from '../../../mixins/template';

    export default {
        mixins: [ template ],

        data() {
            return {
                form: {
                    content: ''
                }
            }
        },

        methods: {
            populateForm() {
                this.form.content = this.getContent('content');
            }
        }
    }
</script>
