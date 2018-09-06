import Dashboard from '../../views/layouts/Dashboard';
import SubNav from '../../views/posts/partials/Nav';

// Post components
import PostIndex from '../../views/posts/Index';
import PostCreate from '../../views/posts/Create';
import PostEdit from '../../views/posts/Edit';

import TagsIndex from '../../views/posts/tags/Index';
import TagCreate from '../../views/posts/tags/Create';
import TagEdit from '../../views/posts/tags/Edit';

let routes = [
    {
        path: '/posts',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            subNav: SubNav
        },

        children: [
            {
                path: '',
                name: 'posts.index',
                component: PostIndex,
                meta: { title: 'News' },
            },
            {
                path: '/posts/create',
                name: 'posts.create',
                component: PostCreate,
                meta: { title: 'Add news article' }
            },
            {
                path: '/posts/:id/edit',
                name: 'posts.edit',
                component: PostEdit,
                meta: { title: 'Edit news article' }
            },
            {
                path: '/posts/tags',
                name: 'posts.tags.index',
                component: TagsIndex,
                meta: { title: 'News categories' }
            },
            {
                path: '/posts/tags/create',
                name: 'posts.tags.create',
                component: TagCreate,
                meta: { title: 'Add news category' }
            },
            {
                path: '/posts/tags/:id/edit',
                name: 'posts.tags.edit',
                component: TagEdit,
                meta: { title: 'Edit news category' }
            }
        ]
    }
];

export default routes;
