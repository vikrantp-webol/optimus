<template>
    <section v-show="isActive" :id="computedId">
        <slot />
    </section>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: null,
        },

        name: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isActive: false,
            isVisible: true,
        };
    },

    computed: {
        computedId() {
            if (this.id) {
                return this.id;
            }

            return `tab-${this.name.toLowerCase().replace(/ /g, '-')}`;
        },

        hash() {
            return '#' + this.computedId;
        },
    },
};
</script>
