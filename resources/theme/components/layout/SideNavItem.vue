<template>
    <li :class="{ 'active': sectionIsActive }">
        <router-link v-if="isRouterLink" :to="to">
            <span>{{ label }}</span>

            <span class="icon large" @click="toggleSubNav">
                <icon :icon="icon" size="sm" />
            </span>
        </router-link>

        <a v-else @click="$emit('click')">
            <span>{{ label }}</span>

            <span class="icon large">
                <icon icon="angle-right" size="sm" />
            </span>
        </a>

        <ul v-if="hasSubNav && subNavIsVisible" class="side-sub-nav list-reset">
            <slot />
        </ul>
    </li>
</template>

<script>
export default {
    props: {
        to: {
            type: Object,
            default: null,
        },

        section: {
            type: String,
            default: null,
        },

        label: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            subNavIsVisible: false,
        };
    },

    computed: {
        currentSection() {
            let meta = this.$route.matched[this.$route.matched.length - 1].meta;

            return meta.hasOwnProperty('section')
                ? meta.section
                : this.$route.matched[0].meta.section;
        },

        sectionIsActive() {
            return this.section === this.currentSection;
        },

        isRouterLink() {
            return !! this.to;
        },

        hasSubNav() {
            return !! this.$slots.default;
        },

        icon() {
            if (this.hasSubNav) {
                return this.subNavIsVisible ? 'angle-up' : 'angle-down';
            }

            return 'angle-right';
        },
    },

    watch: {
        currentSection(section) {
            if (section === this.section) {
                this.subNavIsVisible = true;
            } else {
                this.subNavIsVisible = false;
            }
        },
    },

    created() {
        if (this.currentSection === this.section) {
            this.subNavIsVisible = true;
        }
    },

    methods: {
        toggleSubNav(e) {
            if (this.hasSubNav) {
                this.subNavIsVisible = ! this.subNavIsVisible;

                e.preventDefault();
            }
        },
    },
};
</script>
