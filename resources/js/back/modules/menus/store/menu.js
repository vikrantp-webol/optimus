import { groupBy, mapValues, sortBy } from 'lodash';

export const initialFormValues = () => {
    return {
        label: '',
        parent_id: null,
        linkable_type: null,
        linkable_id: null,
        url: '',
        url_parameters: '',
        opens_in_new_tab: false,
    };
};

const state = {
    linkableTypes: [],
    items: [],
    menuMaxDepth: null,

    formItem: initialFormValues(),

    selectedParentId: null,
    isSelectingParentId: false,
};

const getters = {
    linkableTypes: state => state.linkableTypes,

    menuItems: state => state.items,

    groupedMenuItems: state => {
        let menuLevels = groupBy(state.items, ({ parent_id }) => {
            return parent_id || 'root';
        });

        return mapValues(
            menuLevels, level => sortBy(level, 'order'),
        );
    },

    findMenuItemIndex: state => itemId => {
        return state.items.findIndex(({ id }) => {
            return itemId === id;
        });
    },

    formMenuItem: state => state.formItem,

    selectedParentId: state => state.selectedParentId,

    isSelectingParentId: state => state.isSelectingParentId,

    menuMaxDepth: state => state.menuMaxDepth,
};

const mutations = {
    setLinkableTypes(state, types) {
        state.linkableTypes = types;
    },

    setMenuItems(state, items) {
        state.items = items;
    },

    addMenuItem(state, item) {
        state.items.push(item);
    },

    updateMenuItem(state, { index, item }) {
        state.items.splice(index, 1, {
            ...state.items[index],
            ...item,
        });
    },

    moveMenuItem(state, { from, to }) {
        [state.items[from].order, state.items[to].order] = [state.items[to].order, state.items[from].order];
    },

    removeMenuItem(state, menuItemId) {
        state.items = state.items.filter(({ id }) => {
            return id !== menuItemId;
        });
    },

    setFormMenuItem(state, item) {
        state.formItem = { ...item };
    },

    setSelectedParentId(state, id) {
        state.selectedParentId = id;
    },

    startSelectingParentId(state) {
        state.isSelectingParentId = true;
    },

    stopSelectingParentId(state) {
        state.isSelectingParentId = false;
    },

    setMenuMaxDepth(state, depth) {
        state.menuMaxDepth = depth;
    },
};

const actions = {
    setLinkableTypes({ commit }, types) {
        commit('setLinkableTypes', types);
    },

    setMenuItems({ commit }, items) {
        commit('setMenuItems', items);
    },

    addMenuItem({ commit }, item) {
        commit('addMenuItem', item);
    },

    updateMenuItem({ commit, getters }, { id, item }) {
        let index = getters.findMenuItemIndex(id);

        if (index !== -1) {
            commit('updateMenuItem', { index, item });
        }
    },

    moveMenuItem({ commit, getters }, { id, moveToId }) {
        const fromIndex = getters.findMenuItemIndex(id);
        const toIndex = getters.findMenuItemIndex(moveToId);

        commit('moveMenuItem', {
            from: fromIndex,
            to: toIndex,
        });
    },

    removeMenuItem({ commit }, id) {
        commit('removeMenuItem', id);
    },

    // clearMenuItems({ commit }) {
    //     commit('setMenuItems', []);
    // },

    setFormMenuItem({ commit }, item) {
        commit('setFormMenuItem', item);
    },

    resetForm({ commit }) {
        commit('setFormMenuItem', initialFormValues());
    },

    setSelectedParentId({ commit }, id) {
        commit('setSelectedParentId', id);
    },

    clearSelectedParentId({ commit }) {
        commit('setSelectedParentId', null);
    },

    toggleSelectingParentId({ commit, getters }) {
        if (getters.isSelectingParentId) {
            commit('stopSelectingParentId');
        } else {
            commit('startSelectingParentId');
        }
    },

    stopSelectingParentId({ commit }) {
        commit('stopSelectingParentId');
    },

    setMenuMaxDepth({ commit }, depth) {
        commit('setMenuMaxDepth', depth);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
