const state = {
    data: null,
    isLoading: false,
};

const getters = {
    data: state => state.data,
};

const mutations = {
    startLoading(state) {
        state.isLoading = true;
    },

    stopLoading(state) {
        state.isLoading = false;
    },

    set(state, data) {
        state.data = data;
    },

    update(state, data) {
        state.data = { ...state.data, ...data };
    },
};

const actions = {
    fetch({ commit, state }) {
        if (! state.data && ! state.isLoading) {
            commit('startLoading');

            return axios.get('/admin/api/user').then(response => {
                commit('set', response.data.data);

                commit('stopLoading');
            });
        }
    },

    update({ commit }, data) {
        commit('update', data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
