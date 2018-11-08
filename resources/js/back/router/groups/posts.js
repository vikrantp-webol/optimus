import Dashboard from '../../views/layouts/Dashboard';
import SubNav from '../../views/posts/partials/Nav';

// Post components
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
