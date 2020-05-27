<template>
    <o-dashboard-layout :user="userData">
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
                :to="{ name: 'menus.index' }"
                label="Menus"
                section="menus"
            >
                <o-side-sub-nav-item :to="{ name: 'menus.index' }">
                    Manage Menus
                </o-side-sub-nav-item>

                <o-side-sub-nav-item :to="{ name: 'menus.create' }">
                    Create Menu
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
            user: 'adminUser/userData',
        }),

        userData() {
            return {
                id: this.user.id,
                name: this.user.name,
                avatar: `${this.user.gravatar_url}?d=identicon&s=96`,
            };
        },

        csrfToken() {
            return document.head.querySelector('meta[name="csrf-token"]').content;
        },
    },

    methods: {
        ...mapActions({
            openMediaManager: 'mediaManager/openMediaManager',
        }),
    },
};
</script>
