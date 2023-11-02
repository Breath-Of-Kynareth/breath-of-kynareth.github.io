import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Homepage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/test.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
