
import Dashboard from '../../../components/ui/Dashboard';

import Index from '../views/Index';
import Create from '../views/Create';
import Edit from '../views/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: { section: 'users' },

        children: [
            {
                path: '',
                name: 'users.index',
                component: Index,
            },
            {
                path: 'create',
                name: 'users.create',
                component: Create,
            },
            {
                path: ':id/edit',
                name: 'users.edit',
                component: Edit,
            },
        ],
    },
];

export default routes;
