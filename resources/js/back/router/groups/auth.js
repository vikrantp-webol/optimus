import Login from '@back/views/auth/Login';

let routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true }
    }
];

export default routes;
