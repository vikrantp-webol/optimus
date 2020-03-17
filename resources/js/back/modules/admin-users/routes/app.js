
import Dashboard from '../../../components/ui/Dashboard';

import Index from '../views/Index';
import Create from '../views/Create';
import Edit from '../views/Edit';

let routes = [
    {
        path: '/admin-users',
        component: Dashboard,
        meta: { section: 'admin-users' },

        children: [
            {
                path: '',
                name: 'admin-users.index',
                component: Index,
            },
            {
                path: 'create',
                name: 'admin-users.create',
                component: Create,
            },
            {
                path: ':id/edit',
                name: 'admin-users.edit',
                component: Edit,
            },
        ],
    },
];

export default routes;
