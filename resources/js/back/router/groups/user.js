import Dashboard from '@js/views/layouts/Dashboard';

import UserIndex from '@js/views/users/Index';
import UserCreate from '@js/views/users/Create';
import UserEdit from '@js/views/users/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: { section: 'users' },

        children: [
            {
                path: '',
                name: 'users.index',
                component: UserIndex
            },
            {
                path: 'create',
                name: 'users.create',
                component: UserCreate
            },
            {
                path: ':id/edit',
                name: 'users.edit',
                component: UserEdit
            }
        ]
    }
];

export default routes;
