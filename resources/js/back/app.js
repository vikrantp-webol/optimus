import './bootstrap';
import './lib/icons';

import router from './router';
import store from './store';
import App from './views/App';

// Plugins
import VueAuth from '@optix/vue-auth';
Vue.use(VueAuth);

import VueLoader from '@optix/vue-loader';
Vue.use(VueLoader, { store });

import OptimusUi from '@optimuscms/ui';
Vue.use(OptimusUi);

import MediaManager from '@optimuscms/media-manager';
Vue.use(MediaManager, { store });

import './util/editor';

Vue.component('meta-holder', require('./views/partials/MetaHolder'));

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
