import Dashboard from '../../components/ui/Dashboard';

import PageIndex from '../../views/pages/Index';
import PageCreate from '../../views/pages/Create';
import PageEdit from '../../views/pages/Edit';

let routes = [
    {
        path: '/pages',
        component: Dashboard,
        meta: { section: 'pages' },

        children: [
            {
                path: '',
                name: 'pages.index',
                component: PageIndex,
            },
            {
                path: 'create',
                name: 'pages.create',
                component: PageCreate,
            },
            {
                path: ':id/edit',
                name: 'pages.edit',
                component: PageEdit,
            },
        ],
    },
];

export default routes;
