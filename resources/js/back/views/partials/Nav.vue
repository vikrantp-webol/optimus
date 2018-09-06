<template>
    <ul>
        <nav-link icon="file-alt" :to="{ name: 'pages.index' }">Pages</nav-link>
        <li>
            <a @click="openMediaManager">
                <icon icon="images" size="2x" class="mb-2"></icon>
                <strong>Media</strong>
            </a>
        </li>
        <nav-link icon="users" :to="{ name: 'users.index' }" exact>Users</nav-link>
    </ul>
</template>

<script>
    import NavLink from '@optimuscms/ui/src/components/layout/nav/MainNavLink';

    export default {
        components: {
            NavLink
        },

        methods: {
            openMediaManager() {
                eventBus.$emit('media-manager-open', { limit: 0 });
            }
        }
    }
</script>
