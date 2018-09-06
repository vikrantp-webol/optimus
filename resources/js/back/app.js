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

import Editor, { config as editorConfig } from '@optimuscms/editor';

editorConfig.file_picker_types = 'image';
editorConfig.file_picker_callback = callback => {
    Vue.mediaManager.open({
        limit: 1,
        accept: Vue.mediaManager.imageExtensions()
    });

    Vue.mediaManager.onMediaSelected(mediaIds => {
        let image = Vue.mediaManager.getActiveMedia(mediaIds[0]);

        callback(image.url, {
            alt: image.name
        });
    });
};

Vue.use(Editor, {
    apiKey: 'i9k078qcvbqg8d6gffh58fkky46ltc5d8a3rb7igrn5h6q3i'
});

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
