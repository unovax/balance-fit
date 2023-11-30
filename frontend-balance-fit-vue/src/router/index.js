import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import GuestLayout from '../components/layouts/GuestLayout.vue';
const isAuthenticated = () => {
    return false; // Cambia esto con tu lógica de autenticación real.
};

const routes = [
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: GuestLayout,
        meta: { isGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/Register',
                name: 'About',
                component: Register
            }
        ]
    },
    {
        path: '/',
        name: 'Home',
        redirect: '/login'
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
