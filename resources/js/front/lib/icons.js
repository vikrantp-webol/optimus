import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('icon', FontAwesomeIcon);

library.add(
    require('@fortawesome/free-solid-svg-icons/faAngleDown').definition
);
