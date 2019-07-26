<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="content" label="Content" required>
            <editor id="content" v-model="form.content" />
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
                content: ''
            }
        };
    },

    methods: {
        populateForm() {
            this.form.content = this.getContent('content');
        }
    }
};
</script>
