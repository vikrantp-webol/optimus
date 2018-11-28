import Dashboard from '@back/views/layouts/Dashboard';
import SubNav from '@back/views/users/partials/Nav';

import UserIndex from '@back/views/users/Index';
import UserCreate from '@back/views/users/Create';
import UserEdit from '@back/views/users/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: {
            area: 'users',
            subNav: SubNav,
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
