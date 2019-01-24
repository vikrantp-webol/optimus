import Dashboard from '@js/views/layouts/Dashboard';
import Testing from '@js/views/Testing';

let routes = [
    {
        path: '/testing',
        component: Dashboard,
        meta: { section: 'testing' },

        children: [
            {
                path: '',
                name: 'testing.index',
                component: Testing
            }
        ]
    }
];

export default routes;
