<template>
    <o-dashboard-layout :loading="isLoading('app.*')">
        <template slot="side-nav">
            <o-side-nav-item :to="{ name: 'pages.index' }" label="Pages" section="pages">
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

            <o-side-nav-item :to="{ name: 'posts.index' }" label="News" section="posts">
                <o-side-sub-nav-item
                    :to="{ name: 'posts.index' }"
                >
                    Manage News
                </o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'posts.create' }"
                >
                    Add News Article
                </o-side-sub-nav-item>

                <li class="divide" />

                <o-side-sub-nav-item
                    :to="{ name: 'posts.tags.index' }"
                >
                    Manage Categories
                </o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'posts.tags.create' }"
                >
                    Add Category
                </o-side-sub-nav-item>
            </o-side-nav-item>

            <o-side-nav-item
                label="Media manager"
                @click="openMediaManager()"
            />

            <o-side-nav-item :to="{ name: 'users.index' }" label="Users" section="users">
                <o-side-sub-nav-item
                    :to="{ name: 'users.index' }"
                >
                    Manage Users
                </o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'users.create' }"
                >
                    Add User
                </o-side-sub-nav-item>
            </o-side-nav-item>
        </template>

        <template slot="header">
            <a class="icon icon-large -mr-2" @click="logout">
                <icon icon="sign-out-alt" />
            </a>
        </template>
    </o-dashboard-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    created() {
        this.startLoading('app.user');

        this.fetchUser().then(() => {
            this.stopLoading('app.user');
        });
    },

    methods: {
        ...mapActions({
            fetchUser: 'user/fetch',
            openMediaManager: 'mediaManager/open',
        }),

        logout() {
            axios.post('/admin/logout').then(() => {
                window.location.href = '/admin/login';
            });
        },
    },
};
</script>
