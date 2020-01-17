<template>
    <div class="field" :class="{ 'required': required }">
        <label v-if="label" :for="input" class="label">
            {{ label }}
        </label>

        <div class="control">
            <slot />
        </div>

        <div v-if="$slots.hasOwnProperty('help')" class="help">
            <slot name="help" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: null,
        },

        input: {
            type: String,
            default: null,
        },

        required: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
