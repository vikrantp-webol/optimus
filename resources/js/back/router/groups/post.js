import Dashboard from '@back/views/layouts/Dashboard';
import SubNav from '@back/views/posts/partials/Nav';

import PostIndex from '@back/views/posts/Index';
import PostCreate from '@back/views/posts/Create';
import PostEdit from '@back/views/posts/Edit';

import TagIndex from '@back/views/posts/tags/Index';
import TagCreate from '@back/views/posts/tags/Create';
import TagEdit from '@back/views/posts/tags/Edit';

let routes = [
    {
        path: '/posts',
        component: Dashboard,
        meta: {
            area: 'posts',
            subNav: SubNav,
            requiresAuth: true
        },

        children: [
            {
                path: '',
                name: 'posts.index',
                component: PostIndex,
                meta: { title: 'News' },
            },
            {
                path: 'create',
                name: 'posts.create',
                component: PostCreate,
                meta: { title: 'Add news article' }
            },
            {
                path: ':id/edit',
                name: 'posts.edit',
                component: PostEdit,
                meta: { title: 'Edit news article' }
            },
            {
                path: 'tags',
                name: 'posts.tags.index',
                component: TagIndex,
                meta: { title: 'News categories' }
            },
            {
                path: 'tags/create',
                name: 'posts.tags.create',
                component: TagCreate,
                meta: { title: 'Add news category' }
            },
            {
                path: 'tags/:id/edit',
                name: 'posts.tags.edit',
                component: TagEdit,
                meta: { title: 'Edit news category' }
            }
        ]
    }
];

export default routes;
