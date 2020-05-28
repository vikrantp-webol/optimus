<template>
    <div class="menu-item-wrap">
        <div
            class="menu-item p-4 mb-4 border border-grey-400 shadow-lg rounded"
            :class="{
                'disabled': isDisabled,
                'selectable': isSelectable,
                'bg-grey-300': isEditing,
            }"
            @click="setFormItemParent"
        >
            <div class="-mx-2 flex items-center">
                <div class="flex-shrink-0 px-2">
                    <a
                        class="icon medium"
                        :class="{
                            'pointer-events-none opacity-50': ! canMoveItemUp(currentItems, item.id)
                        }"
                        @click="moveItemUp(currentItems, item.id)"
                    >
                        <icon icon="angle-up" />
                    </a>

                    <a
                        class="icon medium"
                        :class="{
                            'pointer-events-none opacity-50': ! canMoveItemDown(currentItems, item.id)
                        }"
                        @click="moveItemDown(currentItems, item.id)"
                    >
                        <icon icon="angle-down" />
                    </a>
                </div>

                <div class="w-1/5 flex-shrink-0 px-4 min-w-0">
                    <div class="truncate">
                        {{ item.label }}
                    </div>
                </div>

                <div class="flex items-center flex-grow px-4 min-w-0">
                    <div class="truncate direction-rtl">
                        {{ item.url }}
                    </div>

                    <div
                        v-if="item.opens_in_new_tab"
                        class="icon ml-1 text-grey-600"
                    >
                        <icon icon="external-link-alt" />
                    </div>
                </div>

                <div class="flex-shrink-0 px-2 select-none">
                    <a
                        class="icon"
                        @click="editItem"
                    >
                        <icon icon="pencil-alt" />
                    </a>

                    <a
                        class="icon ml-2"
                        @click="openConfirmation(item)"
                    >
                        <icon icon="trash-alt" />
                    </a>

                    <a
                        class="icon ml-2"
                        :class="{ 'pointer-events-none opacity-25': ! hasChildren }"
                        @click="showChildren = ! showChildren"
                    >
                        <icon
                            :icon="hasChildren && showChildren ? 'angle-up' : 'angle-down'"
                        />
                    </a>
                </div>
            </div>
        </div>

        <transition name="slide-fade">
            <transition-group
                v-if="hasChildren && showChildren"
                tag="div"
                name="flip-list"
                class="px-6 mt-4 mb-8"
            >
                <menu-item
                    v-for="child in children"
                    :key="child.id"
                    :item="child"
                />
            </transition-group>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { sortableMixin } from '@optimuscms/theme';
import { moveMenuItem } from '../../../routes/api';

export default {
    name: 'MenuItem',

    mixins: [ sortableMixin ],

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            showChildren: false,
        };
    },

    computed: {
        ...mapGetters({
            menuItems: 'menu/menuItems',
            formMenuItem: 'menu/formMenuItem',
            isSelectable: 'menu/isSelectingParentId',
            groupedMenuItems: 'menu/groupedMenuItems',
        }),

        activeId() {
            if (this.formMenuItem && this.formMenuItem.hasOwnProperty('id')) {
                return this.formMenuItem.id;
            }

            return null;
        },

        isEditing() {
            return this.activeId === this.item.id;
        },

        isActive() {
            return this.item.id === this.activeId;
        },

        isDisabled() {
            const {
                ids: descendantIds,
                depth: descendantsDepth,
            } = this.getDescendantIdsAndDepth(this.activeId);

            return (
                this.isActive
                || descendantIds.includes(this.item.id)
            );
        },

        currentItems() {
            return this.groupedMenuItems[this.item.parent_id || 'root'];
        },

        children() {
            if (this.groupedMenuItems.hasOwnProperty(this.item.id)) {
                return this.groupedMenuItems[this.item.id];
            }

            return [];
        },

        hasChildren() {
            return this.children.length !== 0;
        },
    },

    watch: {
        hasChildren(hasChildren) {
            if (hasChildren) {
                this.showChildren = true;
            }
        },
    },

    methods: {
        ...mapActions({
            moveMenuItem: 'menu/moveMenuItem',
            updateMenuItem: 'menu/updateMenuItem',
            setFormMenuItem: 'menu/setFormMenuItem',
            setSelectedParentId: 'menu/setSelectedParentId',
            stopSelectingParentId: 'menu/stopSelectingParentId',
        }),

        getItemDepth(item, depth = 1) {
            if (item.parent_id) {
                depth += 1;

                const parent = this.menuItems.find(menuItem => {
                    return menuItem.id === item.parent_id;
                });

                if (parent) {
                    depth = this.getItemDepth(parent, depth);
                }
            }

            return depth;
        },

        getDescendantIdsAndDepth(menuItemId, depth = 1) {
            let ids = [];

            if (this.groupedMenuItems.hasOwnProperty(menuItemId)) {
                depth += 1;

                this.groupedMenuItems[menuItemId].map(({ id }) => {
                    return id;
                }).forEach(childId => {
                    const {
                        ids: descendantIds,
                        depth: descendantsDepth,
                    } = this.getDescendantIdsAndDepth(childId, depth);

                    if (descendantsDepth > depth) {
                        depth = descendantsDepth;
                    }

                    ids = [
                        ...ids,
                        childId,
                        ...descendantIds,
                    ];
                });
            }

            return { ids, depth };
        },

        editItem() {
            this.setFormMenuItem(this.item);
        },

        setFormItemParent() {
            if (this.isSelectable && ! this.isDisabled) {
                this.setSelectedParentId(this.item.id);
                this.stopSelectingParentId();
            }
        },

        move(id, from, to) {
            moveMenuItem(id, this.getMoveDirection(from, to));

            this.moveMenuItem({
                id,
                moveToId: this.currentItems[to].id,
            });
        },
    },
};
</script>
