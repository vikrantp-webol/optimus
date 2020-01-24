// Import plugins
import Icons from './lib/icons';
import { mapActions, mapGetters } from 'vuex';

// Import plugins
import VueSelect from '@optix/vue-select';

// Import vuex modules
import alertStore from './store/modules/alert';
import confirmationStore from './store/modules/confirmation';
import dashboardStore from './store/modules/dashboard';
import loaderStore from './store/modules/loader';
import userStore from './store/modules/user';

// Import components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Errors from './components/form/Errors.vue';
import Checkbox from './components/form/Checkbox.vue';
import Input from './components/form/Input.vue';
import Field from './components/form/Field.vue';
import MetaFields from './components/form/MetaFields.vue';

import Dashboard from './components/layout/Dashboard.vue';
import SideNavItem from './components/layout/SideNavItem.vue';
import SideSubNavItem from './components/layout/SideSubNavItem.vue';

import Alert from './components/ui/Alert.vue';
import Confirmation from './components/ui/Confirmation.vue';
import Dropdown from './components/ui/Dropdown.vue';
import Loader from './components/ui/Loader.vue';
import Modal from './components/ui/Modal.vue';
import Notification from './components/ui/Notification.vue';
import Pagination from './components/ui/Pagination.vue';
import Search from './components/ui/Search.vue';
import Tabs from './components/ui/Tabs.vue';
import Tab from './components/ui/Tab.vue';
import ThSort from './components/ui/ThSort.vue';

// Import/Export mixins
export { default as formMixin, formHelpersMixin } from './mixins/form';
export { default as listingMixin } from './mixins/listing';
export { default as sortableMixin } from './mixins/sortable';

export default function install(Vue, options = {}) {
    if (options.hasOwnProperty('store')) {
        options.store.registerModule('alert', alertStore);
        options.store.registerModule('confirmation', confirmationStore);
        options.store.registerModule('dashboard', dashboardStore);
        options.store.registerModule('loader', loaderStore);
        options.store.registerModule('user', userStore);

        // Mixins
        Vue.mixin({
            computed: {
                ...mapGetters({
                    isLoading: 'loader/isLoading',
                }),
            },

            methods: {
                ...mapActions({
                    startLoading: 'loader/start',
                    stopLoading: 'loader/stop',
                    openAlert: 'alert/open',
                    setTitle: 'dashboard/setTitle',
                    openConfirmation: 'confirmation/open',
                }),
            },
        });
    }

    // Register Plugins
    Vue.use(VueSelect, {
        componentName: 'o-select',
    });

    // Register icons
    Icons.register();

    // Register components
    Vue.component('icon', FontAwesomeIcon);

    // Register form components
    Vue.component('o-errors', Errors);
    Vue.component('o-checkbox', Checkbox);
    Vue.component('o-input', Input);
    Vue.component('o-form-field', Field);
    Vue.component('o-meta-fields', MetaFields);

    // Register layout components
    Vue.component('o-dashboard-layout', Dashboard);
    Vue.component('o-side-nav-item', SideNavItem);
    Vue.component('o-side-sub-nav-item', SideSubNavItem);

    // Register UI components
    Vue.component('o-alert', Alert);
    Vue.component('o-confirmation', Confirmation);
    Vue.component('o-dropdown', Dropdown);
    Vue.component('o-loader', Loader);
    Vue.component('o-modal', Modal);
    Vue.component('o-notification', Notification);
    Vue.component('o-pagination', Pagination);
    Vue.component('o-search', Search);
    Vue.component('o-tabs', Tabs);
    Vue.component('o-tab', Tab);
    Vue.component('o-th-sort', ThSort);
}
