let routes = [
    {
        path: '/login',
        name: 'login',
        component: require('../../views/auth/Login'),
        meta: { requiresGuest: true }
    }
];

export default routes;
