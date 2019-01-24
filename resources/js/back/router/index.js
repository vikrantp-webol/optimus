import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '@js/store';

// Routes
import pageRoutes from './groups/page';
import postRoutes from './groups/post';
import userRoutes from './groups/user';

import testRoutes from './groups/test'; // todo delete

const router = new VueRouter({
    base: '/manage',
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
        ...userRoutes,

        ...testRoutes // todo delete
    ]
});

router.beforeEach((to, from, next) => {
    Vue.loader.stopLoading();
    next();
});

router.afterEach(() => {
    Vue.nextTick(() => store.commit('dashboard/closeSide'));
});

// axios.interceptors.response.use(response => response, error => {
//     if (error.response.status === 401) {
//         return window.location.href = '/admin';
//     }
    
//     return Promise.reject(error);
// });

export default router;
