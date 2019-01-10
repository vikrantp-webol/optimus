import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '@js/store';

// Routes
import pageRoutes from './groups/page';
import postRoutes from './groups/post';
import userRoutes from './groups/user';

const router = new VueRouter({
    base: '/admin',
    mode: 'history',

    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: {
                name: 'pages.index'
            }
        },
        
        ...pageRoutes,
        ...postRoutes,
        ...userRoutes
    ]
});

router.beforeEach((to, from, next) => {
    Vue.loader.stopLoading();
    next();
});

router.afterEach(() => {
    Vue.nextTick(() => store.commit('dashboard/closeSide'));
});

export default router;
