<template>
    <o-dashboard-layout :loading="isLoading('app.*')" :avatar="avatar">
        <template slot="side-nav">
            <o-side-nav-item
                :to="{ name: 'pages.index' }"
                label="Pages"
                section="pages"
            >
                <o-side-sub-nav-item
                    :to="{ name: 'pages.index' }"
                >
                    Manage Pages
                </o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'pages.create' }"
                >
                    Add Page
                </o-side-sub-nav-item>
            </o-side-nav-item>

            <o-side-nav-item
                label="Media manager"
                @click="openMediaManager()"
            />

            <o-side-nav-item
                :to="{ name: 'admin-users.index' }"
                label="Admin Users"
                section="admin-users"
            >
                <o-side-sub-nav-item
                    :to="{ name: 'admin-users.index' }"
                >
                    Manage Admin Users
                </o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'admin-users.create' }"
                >
                    Add Admin User
                </o-side-sub-nav-item>
            </o-side-nav-item>
        </template>

        <template slot="header">
            <form method="post" action="/admin/logout">
                <input
                    type="hidden"
                    name="_token"
                    :value="csrfToken"
                >

                <button class="icon icon-large -mr-2">
                    <icon icon="sign-out-alt" />
                </button>
            </form>
        </template>
    </o-dashboard-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            user: 'user/data',
        }),

        avatar() {
            if (this.user) {
                return `${this.user.gravatar_url}?d=identicon&s=96`;
            }

            return null;
        },

        csrfToken() {
            return document.head.querySelector('meta[name="csrf-token"]').content;
        },
    },

    created() {
        this.startLoading('app.user');

        this.fetchUser().then(() => {
            this.stopLoading('app.user');
        });
    },

    methods: {
        ...mapActions({
            fetchUser: 'user/fetch',
            openMediaManager: 'mediaManager/openMediaManager',
        }),
    },
};
</script>
