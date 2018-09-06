import Vuex from 'vuex';
Vue.use(Vuex);

import navigation from './modules/navigation';

export default new Vuex.Store({
    modules: {
        navigation
    }
});
