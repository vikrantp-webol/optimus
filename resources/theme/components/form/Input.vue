<template>
    <component
        :is="type === 'textarea' ? type : 'input'"
        :id="id"
        :type="type"
        :class="type === 'textarea' ? 'textarea' : 'input'"
        :required="required"
        :value.prop="newValue"
        @input="newValue = $event.currentTarget.value"
    />
</template>

<script>
export default {
    props: {
        value: {
            type: null,
            default: null,
        },

        id: {
            type: String,
            required: true,
        },

        required: {
            type: Boolean,
            default: false,
        },

        type: {
            type: String,
            default: 'text',
        },
    },

    computed: {
        newValue: {
            get() { return this.value; },
            set(value) { this.$emit('input', value); },
        },
    },

    watch: {
        value(value) {
            this.newValue = value;
        },

        newValue(value) {
            this.$emit('input', value);
        },
    },
};
</script>
