import Dashboard from '@js/views/layouts/Dashboard';

import PageIndex from '@js/views/pages/Index';
import PageCreate from '@js/views/pages/Create';
import PageEdit from '@js/views/pages/Edit';

let routes = [
    {
        path: '/pages',
        component: Dashboard,
        meta: {
            area: 'pages',
            requiresAuth: true
        },

        children: [
            {
                path: '',
                name: 'pages.index',
                component: PageIndex,
                meta: { title: 'Pages' },
            },
            {
                path: 'create',
                name: 'pages.create',
                component: PageCreate,
                meta: { title: 'Create page' }
            },
            {
                path: ':id/edit',
                name: 'pages.edit',
                component: PageEdit,
                meta: { title: 'Edit page' }
            }
        ]
    }
];

export default routes;
