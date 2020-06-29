import Vuex from 'vuex';
Vue.use(Vuex);

import site from './modules/site';

export default new Vuex.Store({
    modules: {
        site,
    },
});
