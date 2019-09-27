import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '../store';

// Routes
import pageRoutes from '../modules/pages/routes/app';
import userRoutes from '../modules/users/routes/app';

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
                name: 'pages.index',
            },
        },

        ...pageRoutes,
        ...userRoutes,
    ],
});

router.afterEach(() => {
    store.dispatch('loader/stop');

    Vue.nextTick(() => {
        store.dispatch('dashboard/closeSide');
    });
});

export default router;
