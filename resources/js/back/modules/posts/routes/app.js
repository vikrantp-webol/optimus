import Dashboard from '../../../components/ui/Dashboard';

import PostIndex from '../views/Index';
import PostCreate from '../views/Create';
import PostEdit from '../views/Edit';

import TagIndex from '../views/tags/Index';
import TagCreate from '../views/tags/Create';
import TagEdit from '../views/tags/Edit';

let routes = [
    {
        path: '/posts',
        component: Dashboard,
        meta: { section: 'posts' },

        children: [
            {
                path: '',
                name: 'posts.index',
                component: PostIndex,
            },
            {
                path: 'create',
                name: 'posts.create',
                component: PostCreate,
            },
            {
                path: ':id/edit',
                name: 'posts.edit',
                component: PostEdit,
            },
            {
                path: 'tags',
                name: 'posts.tags.index',
                component: TagIndex,
            },
            {
                path: 'tags/create',
                name: 'posts.tags.create',
                component: TagCreate,
            },
            {
                path: 'tags/:id/edit',
                name: 'posts.tags.edit',
                component: TagEdit,
            },
        ],
    },
];

export default routes;
