<template>
    <div v-show="isActive" class="mobile-navigation-holder lg:hidden">
        <div
            class="mobile-navigation-background"
            @click="hide"
        />

        <transition name="mobile-navigation" @after-leave="setInactive">
            <div v-if="isVisible" class="mobile-navigation-panel">
                <div class="flex flex-shink-0 justify-end px-4 py-6 sm:px-10">
                    <a
                        class="mobile-navigation-close flex items-center -mr-3"
                        @click="hide"
                    >
                        <strong class="mr-2 uppercase text-xs">
                            Close
                        </strong>

                        <span class="hamburger active">
                            <span class="hamburger-holder">
                                <span class="hamburger-inner" />
                            </span>
                        </span>
                    </a>
                </div>

                <div class="mobile-navigation-content flex-grow px-4 pb-4 sm:px-10">
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            isVisible: false,
        };
    },

    computed: {
        ...mapGetters({
            isActive: 'site/mobileNavigationIsVisible',
        }),
    },

    watch: {
        isActive(isActive) {
            if (isActive) {
                this.isVisible = true;
            }
        },
    },

    created() {
        document.addEventListener('keydown', this.onEscape);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.onEscape);
    },

    methods: {
        ...mapActions({
            setInactive: 'site/hideMobileNavigation',
        }),

        hide() {
            this.isVisible = false;
        },

        onEscape(event) {
            if (this.isVisible && event.keyCode === 27) {
                this.hide();
            }
        },
    },
};
</script>
