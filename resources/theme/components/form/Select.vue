<template>
    <div class="select w-full">
        <select
            :id="id"
            v-model="newValue"
            :required="required"
            :disabled="disabled"
            @change="$event => $emit('change', $event)"
        >
            <slot />
        </select>
    </div>
</template>

<script>
import inputMixin from '../../mixins/input';

export default {
    mixins: [ inputMixin ],

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
