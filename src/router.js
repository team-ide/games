import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/page1',
      name: 'page1',
      component: () => import('./views/Page1.vue')
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('./views/Page2.vue')
    },
    {
      path: '/page3',
      name: 'page3',
      component: () => import('./views/Page3.vue')
    },
    {
      path: '/page4',
      name: 'page4',
      component: () => import('./views/Page4.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('./views/game/Index.vue')
    },
  ]
});

export default router
