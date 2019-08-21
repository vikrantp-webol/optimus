import Dashboard from '../../components/ui/Dashboard';

import PostIndex from '../../views/posts/Index';
import PostCreate from '../../views/posts/Create';
import PostEdit from '../../views/posts/Edit';

import TagIndex from '../../views/posts/tags/Index';
import TagCreate from '../../views/posts/tags/Create';
import TagEdit from '../../views/posts/tags/Edit';

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
