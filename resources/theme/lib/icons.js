import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faAngleDown, faAngleRight, faAngleUp,
    faCalendarAlt,
    faCog,
    faPencilAlt,
    faSignOutAlt,
    faSearch,
    faSort,
    faSortDown,
    faSortUp,
    faSpinner,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export default {
    register() {
        library.add(
            faAngleDown, faAngleRight, faAngleUp,
            faCalendarAlt,
            faCog,
            faPencilAlt,
            faSignOutAlt,
            faSearch,
            faSort,
            faSortDown,
            faSortUp,
            faSpinner,
            faTrashAlt
        );
    },
};
