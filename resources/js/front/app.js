import './bootstrap';
import icons from './lib/icons';

// Register icons
icons.register();

// Import components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Register components
Vue.component('icon', FontAwesomeIcon);

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
