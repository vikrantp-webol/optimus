import Vuex from 'vuex';
Vue.use(Vuex);

import user from '@optimuscms/core/src/storage/modules/user';

export default new Vuex.Store({
    modules: {
        user
    }
});
