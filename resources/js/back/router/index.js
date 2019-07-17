import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '../store';

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

axios.interceptors.response.use(response => response, error => {
    // if (error.response.status === 401) {
    //     return window.location.href = '/admin/login';
    // }
    
    // return Promise.reject(error);
});

export default router;
