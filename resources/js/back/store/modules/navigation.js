const state = {
    isOpen: false
}

const getters = {
    isOpen: state => state.isOpen
}

const mutations = {
    open(state) {
        state.isOpen = true;
    },

    close(state) {
        state.isOpen = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
