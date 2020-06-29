const state = {
    mobileNavigationIsVisible: false,
};

const getters = {
    mobileNavigationIsVisible: state => state.mobileNavigationIsVisible,
};

const mutations = {
    showMobileNavigation(state) {
        state.mobileNavigationIsVisible = true;
    },

    hideMobileNavigation(state) {
        state.mobileNavigationIsVisible = false;
    },
};

const actions = {
    showMobileNavigation({ commit }) {
        commit('showMobileNavigation');
    },

    hideMobileNavigation({ commit }) {
        commit('hideMobileNavigation');
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
