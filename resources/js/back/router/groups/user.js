import Dashboard from '../../components/ui/Dashboard';

import UserIndex from '../../views/users/Index';
import UserCreate from '../../views/users/Create';
import UserEdit from '../../views/users/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: { section: 'users' },

        children: [
            {
                path: '',
                name: 'users.index',
                component: UserIndex,
            },
            {
                path: 'create',
                name: 'users.create',
                component: UserCreate,
            },
            {
                path: ':id/edit',
                name: 'users.edit',
                component: UserEdit,
            },
        ],
    },
];

export default routes;
