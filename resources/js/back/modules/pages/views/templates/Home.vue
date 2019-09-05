<template>
    <div class="field">
        <!-- Content -->
        <o-form-field input="default_content" label="Content" required>
            <editor
                id="default_content"
                v-model="form.content"
            />
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
            },
        };
    },

    watch: {
        item(item) {
            this.form = {
                content: item.content,
            };
        },
    },
};
</script>
