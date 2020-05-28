<template>
    <o-loader :loading="isLoading('primary.*')">
        <section v-if="menus.length === 0" class="p-8">
            <o-notification class="rounded">
                You haven't added any menus yet,

                <router-link
                    :to="{ name: 'menus.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <table v-else class="table">
            <thead>
                <tr>
                    <th>
                        Name
                    </th>

                    <th>
                        Items
                    </th>

                    <th class="narrow">
                        Actions
                    </th>
                </tr>
            </thead>

            <o-loader tag="tbody" :loading="isLoading('secondary.*')">
                <tr v-for="menu in menus" :key="menu.id">
                    <td>
                        {{ menu.name }}
                    </td>

                    <td>
                        <router-link
                            :to="{
                                name: 'menus.items.index',
                                params: { menuId: menu.id },
                            }"
                        >
                            Manage items
                        </router-link>
                    </td>

                    <td class="actions">
                        <a
                            title="Copy"
                            class="icon medium"
                            :class="{
                                'opacity-25 pointer-events-none': menu.is_published,
                            }"
                            @click="publish(menu)"
                        >
                            <icon icon="copy" />
                        </a>

                        <router-link
                            :to="{
                                name: 'menus.edit',
                                params: { id: menu.id },
                            }"
                            class="icon medium"
                        >
                            <icon icon="pencil-alt" />
                        </router-link>

                        <a
                            class="icon medium"
                            :class="{
                                'opacity-25 pointer-events-none': ! menu.is_deletable,
                            }"
                            @click="openConfirmation(menu)"
                        >
                            <icon icon="trash-alt" />
                        </a>
                    </td>
                </tr>
            </o-loader>
        </table>

        <o-confirmation
            v-slot="{ item: menu }"
            button-class="red"
            button-text="Delete"
            @confirm="deleteMenu"
        >
            Are you sure you want to delete the menu by<br>

            <strong>
                {{ menu.name }}
            </strong>
        </o-confirmation>
    </o-loader>
</template>

<script>
import { listingMixin } from '@optimuscms/theme';

import {
    getMenus,
    publishMenu,
    deleteMenu,
} from '../routes/api';

export default {
    mixins: [ listingMixin ],

    data() {
        return {
            menus: [],
        };
    },

    created() {
        this.setTitle('Manage Menus');

        this.fetchMenus();
    },

    methods: {
        fetchMenus() {
            this.startLoading('primary.menus');

            return getMenus().then(response => {
                this.menus = response.data.data;

                this.stopLoading('primary.menus');
            });
        },

        getMenuIndex(menuId) {
            return this.menus.findIndex(({ id }) => {
                return id === menuId;
            });
        },

        updateMenuItem(menuId, item) {
            const menuIndex = this.getMenuIndex(menuId);

            this.menus.splice(menuIndex, 1, {
                ...this.menus[menuIndex],
                ...item,
            });
        },

        publish(menu) {
            if (! menu.is_published) {
                publishMenu(menu.id);

                this.updateMenuItem(menu.id, {
                    is_published: true,
                });

                const menus = this.menus.filter(({ type }) => {
                    return type.id === menu.type.id;
                });

                if (menus.length !== 0) {
                    menus.forEach(menu => {
                        this.updateMenuItem(menu.id, {
                            is_published: false,
                        });
                    });
                }
            }
        },

        deleteMenu(menu) {
            if (! menu.is_published) {
                deleteMenu(menu.id);

                this.menus = this.menus.filter(({ id }) => {
                    return id !== menu.id;
                });
            }
        },
    },
};
</script>
