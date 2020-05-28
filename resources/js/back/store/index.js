import Vuex from 'vuex';
Vue.use(Vuex);

import adminUser from '../modules/admin-users/store/admin-user';
import menu from '../modules/menus/store/menu';

export default new Vuex.Store({
    modules: {
        adminUser,
        menu,
    },
});
