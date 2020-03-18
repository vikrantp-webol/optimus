import Vuex from 'vuex';
Vue.use(Vuex);

import adminUser from '../modules/admin-users/store/admin-user';

export default new Vuex.Store({
    modules: {
        adminUser,
    },
});
