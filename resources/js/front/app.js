import { mapActions } from 'vuex';

import './bootstrap';
import store from './store';
import icons from './lib/icons';

// Register icons
icons.register();

// Import components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CollapsibleNavItem from './components/CollapsibleNavItem';
import MobileNavigation from './components/MobileNavigation';

// Import forms
// ...

// Register components
Vue.component('icon', FontAwesomeIcon);

Vue.component('collapsible-nav-item', CollapsibleNavItem);
Vue.component('mobile-navigation', MobileNavigation);

// Register forms
// ...

new Vue({
    el: '#app',
    store,

    methods: {
        ...mapActions({
            showMobileNavigation: 'site/showMobileNavigation',
        }),
    },
});
