import Dashboard from '@/views/layouts/Dashboard';
import SubNav from '@/views/pages/partials/Nav';

import PageIndex from '@/views/pages/Index';
import PageCreate from '@/views/pages/Create';
import PageEdit from '@/views/pages/Edit';

let routes = [
    {
        path: '/pages',
        component: Dashboard,
        meta: {
            area: 'pages',
            subNav: SubNav,
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
