<template>
    <div>
        <slot name="tabs" v-bind="tabs">
            <div class="flex justify-end mb-6">
                <div class="field addons">
                    <div
                        v-for="(tab, i) in tabs"
                        v-show="tab.isVisible"
                        :key="i"
                        class="control w-1/2"
                    >
                        <a
                            class="button w-full"
                            :class="{ 'blue': tab.isActive }"
                            @click="selectTab(tab.hash)"
                        >
                            {{ tab.name }}
                        </a>
                    </div>
                </div>
            </div>
        </slot>

        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabs: [],
        };
    },

    computed: {
        firstTab() {
            return this.tabs[0];
        },
    },

    created() {
        this.tabs = this.$children;
    },

    mounted() {
        window.addEventListener('hashchange', () => this.selectTab(window.location.hash));

        if (this.findTab(window.location.hash)) {
            this.selectTab(window.location.hash);
            return;
        }

        if (this.tabs.length) {
            this.selectTab(this.firstTab.hash);
        }
    },

    methods: {
        findTab(hash) {
            return this.tabs.find(tab => tab.hash === hash);
        },

        selectTab(selectedTabHash) {
            const selectedTab = this.findTab(selectedTabHash);

            if (selectedTab) {
                this.tabs.forEach(tab => {
                    tab.isActive = tab.hash === selectedTab.hash;
                });

                this.activeTabHash = selectedTab.hash;
                const firstTabIsActive = this.activeTabHash === this.firstTab.hash;

                if (firstTabIsActive && window.location.hash) {
                    this.$router.push({
                        hash: null,
                    });
                } else if (! firstTabIsActive && (this.activeTabHash !== window.location.hash)) {
                    this.$router.push({
                        hash: this.activeTabHash,
                    });
                }
            }
        },
    },
};
</script>
