import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Homepage.vue';
import TimestampPage from '../pages/TimestampPage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/test.vue'),
  },
  {
    path: '/timestamp',
    name: 'timestamp',
    component: TimestampPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
