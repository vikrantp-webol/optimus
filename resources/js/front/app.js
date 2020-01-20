import './bootstrap';
import icons from './lib/icons';

// Register icons
icons.register();

// Import components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CollapsibleNavItem from './components/CollapsibleNavItem';
import Header from './components/Header';
import MobileNavigation from './components/MobileNavigation';

// Register components
Vue.component('icon', FontAwesomeIcon);
Vue.component('collapsible-nav-item', CollapsibleNavItem);
Vue.component('site-header', Header);
Vue.component('mobile-navigation', MobileNavigation);

new Vue({
    el: '#app',

    data() {
        return {
            navIsActive: false,
        };
    },

    methods: {
        toggleNav() {
            this.navIsActive = ! this.navIsActive;
        },
    },
});
