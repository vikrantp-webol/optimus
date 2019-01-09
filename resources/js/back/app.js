import './bootstrap';

import router from './router';
import store from './store';
import App from './views/App';

// Plugins
import VueAuth from '@optix/vue-auth';
Vue.use(VueAuth);

import VueLoader from '@optix/vue-loader';
Vue.use(VueLoader);

import OptimusTheme from '@optimuscms/theme';
Vue.use(OptimusTheme, { store });

import MediaManager from '@optimuscms/media-manager';
Vue.use(MediaManager, { store });

// Libraries
import Icons from './lib/icons';
Icons.register();

// Utilities
import './util/editor';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
