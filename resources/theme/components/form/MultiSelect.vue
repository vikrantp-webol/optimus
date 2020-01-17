<template>
    <div class="select w-full multiselect">
        <vue-select
            :value="newValue"
            :options="options.map(option => option[optionValue])"
            :multiple="true"
            :custom-label="label"
            @input="value => $emit('input', value)"
        />
    </div>
</template>

<script>
import VueSelect from 'vue-multiselect';

export default {
    components: { VueSelect },

    props: {
        options: {
            type: Array,
            required: true,
        },

        value: {
            type: Array,
            required: true,
        },

        optionValue: {
            type: String,
            default: 'value',
        },

        optionLabel: {
            type: String,
            default: 'label',
        },
    },

    computed: {
        newValue() {
            if (! this.options.length) {
                return [];
            }

            let optionValues = this.options.map(option => {
                return option[this.optionValue];
            });

            return this.value.filter(value => optionValues.includes(value));
        },
    },

    methods: {
        label(value) {
            let option = this.options.find(option => {
                return option[this.optionValue] === value;
            });

            return option ? option[this.optionLabel] : false;
        },
    },
};
</script>
