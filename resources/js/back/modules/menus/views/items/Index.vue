<template>
    <o-loader :loading="isLoading('primary.*')">
        <div class="p-8 border-b border-grey-400">
            <div class="max-w-4xl">
                <menu-item-form
                    :item="formMenuItem"
                />
            </div>
        </div>

        <div class="p-8">
            <div class="max-w-4xl">
                <o-notification v-if="menuItems.length === 0" class="rounded">
                    You haven't added any menu items yet.
                </o-notification>

                <transition-group v-else name="flip-list">
                    <menu-item
                        v-for="menuItem in menuItems"
                        :key="menuItem.id"
                        :item="menuItem"
                    />
                </transition-group>
            </div>
        </div>

        <o-confirmation
            v-slot="{ item: menuItem }"
            button-class="red"
            button-text="Delete"
            @confirm="deleteMenuItem"
        >
            Are you sure you want to delete the menu item<br>

            <strong>
                {{ menuItem.label }}
            </strong><br>

            Any child items will also be deleted.
        </o-confirmation>
    </o-loader>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
    getMenu,
    getMenuItems,
    deleteMenuItem,
    getLinkableTypes,
} from '../../routes/api';

import MenuItem from './partials/Item';
import MenuItemForm from './partials/Form';

export default {
    components: {
        MenuItem,
        MenuItemForm,
    },

    computed: {
        ...mapGetters({
            formMenuItem: 'menu/formMenuItem',
            groupedMenuItems: 'menu/groupedMenuItems',
        }),

        menuItems() {
            return this.groupedMenuItems.root || [];
        },
    },

    created() {
        this.setTitle('Manage Menu Items');

        this.fetchMenu();
        this.fetchMenuItems();
        this.getLinkableTypes();
    },

    methods: {
        ...mapActions({
            setMenuItems: 'menu/setMenuItems',
            removeMenuItem: 'menu/removeMenuItem',
            setLinkableTypes: 'menu/setLinkableTypes',
        }),

        getLinkableTypes() {
            this.startLoading('primary.linkable-types');

            getLinkableTypes().then(response => {
                this.setLinkableTypes(response.data.data);

                this.stopLoading('primary.linkable-types');
            });
        },

        fetchMenu() {
            this.startLoading('primary.menu');

            getMenu(this.$route.params.menuId).then(() => {
                this.stopLoading('primary.menu');
            }).catch(() => {
                this.$router.push({
                    name: 'menus.index',
                });
            });
        },

        fetchMenuItems() {
            this.startLoading('primary.menu-items');

            getMenuItems(this.$route.params.menuId).then(response => {
                this.setMenuItems(response.data.data);

                this.stopLoading('primary.menu-items');
            });
        },

        deleteMenuItem(menuItem) {
            deleteMenuItem(menuItem.id);

            this.removeMenuItem(menuItem.id);
        },
    },
};
</script>
