import Dashboard from '@js/views/layouts/Dashboard';

import PageIndex from '@js/views/pages/Index';
import PageCreate from '@js/views/pages/Create';
import PageEdit from '@js/views/pages/Edit';

let routes = [
    {
        path: '/pages',
        component: Dashboard,
        meta: { section: 'pages' },

        children: [
            {
                path: '',
                name: 'pages.index',
                component: PageIndex
            },
            {
                path: 'create',
                name: 'pages.create',
                component: PageCreate
            },
            {
                path: ':id/edit',
                name: 'pages.edit',
                component: PageEdit
            }
        ]
    }
];

export default routes;
