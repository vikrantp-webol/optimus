import Dashboard from 'back/js/views/layouts/Dashboard';

import PostIndex from 'back/js/views/posts/Index';
import PostCreate from 'back/js/views/posts/Create';
import PostEdit from 'back/js/views/posts/Edit';

import TagIndex from 'back/js/views/posts/tags/Index';
import TagCreate from 'back/js/views/posts/tags/Create';
import TagEdit from 'back/js/views/posts/tags/Edit';

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
