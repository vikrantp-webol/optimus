const state = {
    userData: null,
};

const getters = {
    userData: state => state.userData,
};

const mutations = {
    setUserData(state, userData) {
        state.userData = userData;
    },

    updateUserData(state, userData) {
        state.userData = {
            ...state.userData,
            ...userData,
        };
    },
};

const actions = {
    setUserData({ commit }, data) {
        commit('setUserData', data);
    },

    updateUserData({ commit }, data) {
        commit('updateUserData', data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
