import Dashboard from 'back/js/views/layouts/Dashboard';

import UserIndex from 'back/js/views/users/Index';
import UserCreate from 'back/js/views/users/Create';
import UserEdit from 'back/js/views/users/Edit';

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
