import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '../store';

// Routes
import authRoutes from './modules/auth';
import pageRoutes from './modules/pages';
import userRoutes from './modules/users';

const router = new VueRouter({
    linkActiveClass: 'is-active',

    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'pages.index' }
        },
        
        ...authRoutes,
        ...pageRoutes,
        ...userRoutes
    ]
});

let isRefreshing = false;
let subscribers = [];

router.beforeEach((to, from, next) => {
    Vue.loader.clear();

    if (to.matched.some(record => record.meta.requiresAuth) && ! Vue.auth.check()) {
        if (Vue.auth.hasToken()) {
            if (! isRefreshing) {
                isRefreshing = true;

                axios.post('/api/auth/refresh').then(response => {
                    Vue.auth.setToken(response.data.access_token);
                    Vue.auth.setUser(response.data.user);
    
                    isRefreshing = false;
                    onRefreshed();
                }).catch(error => {
                    Vue.auth.removeToken();
                    Vue.auth.removeUser();
    
                    next({
                        name: 'login',
                        query: { redirect: to.fullPath }
                    });
                });
            }

            return new Promise(resolve => {
                addSubscriber(() => {
                    resolve(next());
                });
            });
        } else {
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            });
        }
    } else if (to.matched.some(record => record.meta.requiresGuest) && Vue.auth.check()) {
        next({ name: 'home' });
    } else {
        next();
    }
});

router.afterEach(() => {
    Vue.nextTick(() => store.commit('navigation/close'));
});

// Authorization Header
axios.interceptors.request.use(config => {
    if (Vue.auth.hasToken()) {
        config.headers['Authorization'] = 'Bearer ' + Vue.auth.token();
    }

    return config;
});
  
// Refresh
axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401 && Vue.auth.hasToken()) {
        if (! isRefreshing) {
            isRefreshing = true;

            axios.post('/api/auth/refresh').then(response => {
                Vue.auth.setToken(response.data.access_token);
                Vue.auth.setUser(response.data.user);
                
                isRefreshing = false;
                onRefreshed();
            }).catch(error => {
                Vue.auth.removeToken();
                Vue.auth.removeUser();

                router.push({ name: 'login' });
            });
        }

        return new Promise(resolve => {
            addSubscriber(() => {
                resolve(axios(error.config));
            });
        });
    }

    return Promise.reject(error);
});

function onRefreshed() {
    subscribers = subscribers.filter(callback => callback());
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export default router;
