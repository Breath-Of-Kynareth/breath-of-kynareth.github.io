import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Homepage.vue';
import TimestampPage from '../pages/TimestampPage.vue'
import RostersPage from '../pages/RostersPage.vue'
import VideoPage from '../pages/VideoPage.vue'
import AdvRosterPage from '../pages/AdvRosterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/timestamp',
    name: 'timestamp',
    component: TimestampPage
  },
  {
    path: '/rosters',
    name: 'rosters',
    component: RostersPage
  },
  {
    path: '/advanced-rosters',
    name: 'advanced-rosters',
    component: AdvRosterPage
  },
  {
    path: '/videos',
    name: 'videos',
    component: VideoPage
  },
  {
    path: '/:catchAll(.*)',
    redirect:  { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
