import { createRouter, createWebHistory } from 'vue-router'

// routers for the website are defined
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/register.vue')
    },
    {
        path: '/login',
        name: 'Log In',
        component: () => import('../views/login.vue')
    },
    {
        path: '/players',
        name: 'Players',
        component: () => import('../views/players.vue')
    },
    {
        path: '/forum',
        name: 'Forum',
        component: () => import('../views/forum.vue')
    }
]

//router instance created
const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;