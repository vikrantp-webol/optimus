import './bootstrap';

import router from './router';
import store from './store';
import App from './views/App';

// Plugins
import OptimusTheme from '@optimuscms/theme';
Vue.use(OptimusTheme, { store });

import MediaManager from '@optimuscms/media-manager';
Vue.use(MediaManager, { store });

import Editor from '@optimuscms/editor';
import editorConfig from './config/editor';

Vue.use(Editor, {
    apiKey: 'i9k078qcvbqg8d6gffh58fkky46ltc5d8a3rb7igrn5h6q3i',
    config: editorConfig,
});

Vue.component('vue-app', App);

new Vue({
    el: '#app',
    router,
    store,
});
