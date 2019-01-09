<template>
    <o-dashboard-layout
        :title="meta.title"
        @logout="logout"
        :loading="$loader.isLoading('primary.*')"
    >
        <template slot="side-nav">
            <o-side-nav-item :to="{ name: 'pages.index' }" area="pages" label="Pages">
                <o-side-sub-nav-item
                    :to="{ name: 'pages.index' }"
                >Manage Pages</o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'pages.create' }"
                >Add Page</o-side-sub-nav-item>
            </o-side-nav-item>

            <o-side-nav-item :to="{ name: 'posts.index' }" area="posts" label="News">
                <o-side-sub-nav-item
                    :to="{ name: 'posts.index' }"
                >Manage News</o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'posts.create' }"
                >Add News Article</o-side-sub-nav-item>

                <li class="divide"></li>

                <o-side-sub-nav-item
                    :to="{ name: 'posts.tags.index' }"
                >Manage Categories</o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'posts.tags.create' }"
                >Add Category</o-side-sub-nav-item>
            </o-side-nav-item>

            <o-side-nav-item
                label="Media manager"
                @click="$mediaManager.open({ limit: 0 })"
            ></o-side-nav-item>

            <o-side-nav-item :to="{ name: 'users.index' }" area="users" label="Users">
                <o-side-sub-nav-item
                    :to="{ name: 'users.index' }"
                >Manage Users</o-side-sub-nav-item>

                <o-side-sub-nav-item
                    :to="{ name: 'users.create' }"
                >Add User</o-side-sub-nav-item>
            </o-side-nav-item>
        </template>
    </o-dashboard-layout>
</template>

<script>
    export default {
        computed: {
            meta() {
                return this.$route.matched[this.$route.matched.length - 1].meta;
            }
        },

        methods: {
            logout() {
                axios.post('/api/auth/logout').then(() => {
                    this.$auth.removeToken();
                    this.$auth.removeUser();

                    this.$router.push({ name: 'login' });
                });
            }
        }
    }
</script>
