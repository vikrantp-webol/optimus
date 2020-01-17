<template>
    <transition-group
        tag="div"
        mode="out-in"
        name="dashboard"
        class="min-h-screen bg-grey-200"
    >
        <div
            v-if="loading"
            key="loader"
            class="flex min-h-screen items-center justify-center bg-grey-200"
        >
            <div class="text-center pulse">
                <logo class="w-16" />

                <div class="title text-3xl uppercase">
                    <strong>Optimus</strong>
                </div>

                <div class="subtitle text-coral-500">
                    <i>loading...</i>
                </div>
            </div>
        </div>

        <div
            v-show="! loading"
            key="dashboard"
            class="dashboard"
            :class="{ 'show-side': sideIsVisible }"
        >
            <transition name="side">
                <div v-show="! loading" class="side bg-blue-700">
                    <a class="side-toggle bg-blue-700 lg:hidden" @click="toggleSide">
                        <span class="dots">
                            <i />
                        </span>
                    </a>

                    <side-header
                        :avatar="avatar"
                    />

                    <div class="side-content px-10 py-8">
                        <side-nav>
                            <slot name="side-nav" />
                        </side-nav>
                    </div>
                </div>
            </transition>

            <transition name="main">
                <div v-show="! loading" id="main" class="main ml-5 lg:ml-0">
                    <main-header>
                        <slot name="header" />
                    </main-header>

                    <router-view />
                </div>
            </transition>
        </div>
    </transition-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Logo from './OptimusLogo.vue';
import MainHeader from './MainHeader.vue';
import SideHeader from './SideHeader.vue';
import SideNav from './SideNav.vue';

export default {
    components: {
        Logo,
        MainHeader,
        SideHeader,
        SideNav,
    },

    props: {
        loading: {
            type: Boolean,
            default: false,
        },

        avatar: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters({
            sideIsVisible: 'dashboard/sideIsVisible',
        }),
    },

    methods: {
        ...mapActions({
            toggleSide: 'dashboard/toggleSide',
        }),
    },
};
</script>
