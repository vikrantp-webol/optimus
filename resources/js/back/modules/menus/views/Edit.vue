<template>
    <menu-form :item="menu" />
</template>

<script>
import { getMenu } from '../routes/api';
import MenuForm from './partials/Form';

export default {
    components: { MenuForm },

    data() {
        return {
            menu: null,
        };
    },

    created() {
        this.setTitle('Edit Menu');

        this.fetchMenu();
    },

    methods: {
        fetchMenu() {
            this.startLoading('primary.menu');

            getMenu(this.$route.params.id).then(response => {
                this.menu = response.data.data;

                this.stopLoading('primary.menu');
            }).catch(() => {
                this.$router.push({
                    name: 'menus.index',
                });
            });
        },
    },
};
</script>
