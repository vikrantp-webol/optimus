<template>
    <th>
        <a class="inline-flex items-center" @click="sort">
            <span class="select-none">
                <slot />
            </span>

            <span class="icon ml-4" :class="{ 'opacity-50': ! direction }">
                <icon :icon="icon" />
            </span>
        </a>
    </th>
</template>

<script>
export default {
    props: {
        column: {
            type: String,
            required: true,
        },

        value: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            direction: null,
        };
    },

    computed: {
        isActive() {
            let column = (this.value && this.value.charAt(0) === '-')
                ? this.value.substr(1)
                : this.value;

            return column === this.column;
        },

        icon() {
            if (! this.direction) {
                return 'sort';
            }

            return this.direction === 'desc' ? 'sort-up' : 'sort-down';
        },
    },

    watch: {
        value() {
            if (! this.isActive) {
                this.direction = null;
            }
        },
    },

    created() {
        this.direction = this.getDefaultDirection();
    },

    methods: {
        getDefaultDirection() {
            if (! this.isActive) {
                return null;
            }

            return this.value.charAt(0) === '-' ? 'desc' : 'asc';
        },

        sort() {
            let sort = null;

            if (! this.direction) {
                this.direction = 'asc';
                sort = this.column;
            } else if (this.direction == 'asc') {
                this.direction = 'desc';
                sort = '-' + this.column;
            } else if (this.direction == 'desc') {
                this.direction = null;
                sort = null;
            }

            this.$emit('input', sort);
        },
    },
};
</script>
