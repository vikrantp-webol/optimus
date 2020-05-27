import Dashboard from '../../../components/ui/Dashboard';

// Menus
import Index from '../views/Index';
import Create from '../views/Create';
import Edit from '../views/Edit';

// Menu Items
import ItemsIndex from '../views/items/Index';

let routes = [
    {
        path: '/menus',
        component: Dashboard,
        meta: { section: 'menus' },

        children: [
            {
                path: '',
                name: 'menus.index',
                component: Index,
            },
            {
                path: 'create',
                name: 'menus.create',
                component: Create,
            },
            {
                path: ':id/edit',
                name: 'menus.edit',
                component: Edit,
            },
            {
                path: ':menuId/items',
                name: 'menus.items.index',
                component: ItemsIndex,
            },
        ],
    },
];

export default routes;
