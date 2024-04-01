import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import GuestLayout from '../components/layouts/GuestLayout.vue';
import AppLayout from '../components/layouts/AppLayout.vue';
import Home from '../views/Home.vue';
import Food from '../views/Food.vue';
import store from '../store';

const routes = [{
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: GuestLayout,
    meta: {
      guest: true,
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { isGuest: true },
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { isGuest: true },
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/food',
        name: 'Food',
        component: Food,
      },
    ],
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  const isLoggedIn = store.getters.userState;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Redirigir a /login si el usuario no está autenticado
    if (!isLoggedIn) {
      next('/login');
    } else {
      // Continuar con la navegación normal si el usuario está autenticado
      next();
    }
  } else if(to.matched.some(record => record.meta.isGuest)) {
    //Reedirigir a home
    if (isLoggedIn) {
      next('/home');
    } else {
      // Continuar con la navegación normal si el usuario está autenticado
      next();
    }
  }else{
    next();
  }
});

export default router;
