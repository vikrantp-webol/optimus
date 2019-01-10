import Dashboard from '@js/views/layouts/Dashboard';

import PostIndex from '@js/views/posts/Index';
import PostCreate from '@js/views/posts/Create';
import PostEdit from '@js/views/posts/Edit';

import TagIndex from '@js/views/posts/tags/Index';
import TagCreate from '@js/views/posts/tags/Create';
import TagEdit from '@js/views/posts/tags/Edit';

let routes = [
    {
        path: '/posts',
        component: Dashboard,
        meta: { section: 'posts' },

        children: [
            {
                path: '',
                name: 'posts.index',
                component: PostIndex
            },
            {
                path: 'create',
                name: 'posts.create',
                component: PostCreate
            },
            {
                path: ':id/edit',
                name: 'posts.edit',
                component: PostEdit
            },
            {
                path: 'tags',
                name: 'posts.tags.index',
                component: TagIndex
            },
            {
                path: 'tags/create',
                name: 'posts.tags.create',
                component: TagCreate
            },
            {
                path: 'tags/:id/edit',
                name: 'posts.tags.edit',
                component: TagEdit
            }
        ]
    }
];

export default routes;
