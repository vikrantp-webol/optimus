<template>
    <transition name="loader" mode="out-in">
        <div
            v-if="loading"
            key="loader"
            class="p-8"
            :class="tag === 'tbody'
                ? 'table-loader text-center'
                : 'flex items-center justify-center'"
        >
            <transition name="fade">
                <div v-if="showLoader" class="icon">
                    <icon icon="spinner" spin size="lg" />
                </div>
            </transition>
        </div>

        <transition-group v-else-if="transitionName" :tag="tag" :name="transitionName">
            <slot />
        </transition-group>

        <component :is="tag" v-else key="content">
            <slot />
        </component>
    </transition>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'div',
        },

        loading: {
            type: Boolean,
            default: false,
        },

        spinnerDelay: {
            type: Number,
            default: 350,
        },

        transitionName: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            timeout: null,
            showLoader: false,
        };
    },

    watch: {
        loading: {
            handler(isLoading) {
                if (isLoading) {
                    this.timeout = setTimeout(() => {
                        this.showLoader = true;
                    }, this.spinnerDelay);
                } else {
                    clearTimeout(this.timeout);
                }
            },
            immediate: true,
        },
    },
};
</script>
