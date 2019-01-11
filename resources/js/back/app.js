import './bootstrap';
import { mapActions } from 'vuex';

import router from './router';
import store from './store';
import App from './views/App';

// Plugins
import VueLoader from '@optix/vue-loader';
Vue.use(VueLoader);

import OptimusTheme from '@optimuscms/theme';
Vue.use(OptimusTheme, { store });

import MediaManager from '@optimuscms/media-manager';
Vue.use(MediaManager, { store });

// Utilities
import './util/editor';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),

    created() {
        this.$loader.startLoading('app.ui');
        this.$loader.startLoading('app.user');

        this.fetchUser().then(() => {
            this.$loader.stopLoading('app.user');
        });
    },

    mounted() {
        this.$loader.stopLoading('app.ui');
    },

    methods: {
        ...mapActions({
            fetchUser: 'user/fetchData'
        })
    }
});
