import Dashboard from '../../../components/ui/Dashboard';

import Index from '../views/Index';
import Create from '../views/Create';
import Edit from '../views/Edit';

let routes = [
    {
        path: '/pages',
        component: Dashboard,
        meta: { section: 'pages' },

        children: [
            {
                path: '',
                name: 'pages.index',
                component: Index,
            },
            {
                path: 'create',
                name: 'pages.create',
                component: Create,
            },
            {
                path: ':id/edit',
                name: 'pages.edit',
                component: Edit,
            },
        ],
    },
];

export default routes;
