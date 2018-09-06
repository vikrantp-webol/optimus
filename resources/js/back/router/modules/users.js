import Dashboard from '../../views/layouts/Dashboard';
import SubNav from '../../views/users/partials/Nav';

// User components
import UserIndex from '../../views/users/Index';
import UserCreate from '../../views/users/Create';
import UserEdit from '../../views/users/Edit';

let routes = [
    {
        path: '/users',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            subNav: SubNav
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
