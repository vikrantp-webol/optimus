import Dashboard from '@js/views/layouts/Dashboard';

import UserIndex from '@js/views/users/Index';
import UserCreate from '@js/views/users/Create';
import UserEdit from '@js/views/users/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: {
            area: 'users',
            requiresAuth: true
        },

        children: [
            {
                path: '',
                name: 'users.index',
                component: UserIndex,
                meta: { title: 'Users' },
            },
            {
                path: 'create',
                name: 'users.create',
                component: UserCreate,
                meta: { title: 'Add user' }
            },
            {
                path: ':id/edit',
                name: 'users.edit',
                component: UserEdit,
                meta: { title: 'Edit user' }
            }
        ]
    }
];

export default routes;
