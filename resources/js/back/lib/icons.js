import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('icon', FontAwesomeIcon);

library.add(
    require('@fortawesome/free-regular-svg-icons/faNewspaper').definition,

    require('@fortawesome/free-solid-svg-icons/faAngleDown').definition,
    require('@fortawesome/free-solid-svg-icons/faCalendarAlt').definition,
    require('@fortawesome/free-solid-svg-icons/faImages').definition,
    require('@fortawesome/free-solid-svg-icons/faFileAlt').definition,
    require('@fortawesome/free-solid-svg-icons/faPencilAlt').definition,
    require('@fortawesome/free-solid-svg-icons/faSignOutAlt').definition,
    require('@fortawesome/free-solid-svg-icons/faSearch').definition,
    require('@fortawesome/free-solid-svg-icons/faSort').definition,
    require('@fortawesome/free-solid-svg-icons/faSortDown').definition,
    require('@fortawesome/free-solid-svg-icons/faSortUp').definition,
    require('@fortawesome/free-solid-svg-icons/faTrashAlt').definition,
    require('@fortawesome/free-solid-svg-icons/faUsers').definition
);
