import AboutViewVue from '@/views/AboutView.vue'
import CateogoriesViewVue from '@/views/CateogoriesView.vue'
import GameDetailViewVue from '@/views/GameDetailView.vue'
import HomeViewVue from '@/views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GamesViewVue from '../views/GamesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/games',
      name: 'games',
      component: GamesViewVue
    },
    {
      path: '/gamedetails',
      name: 'gamedetails',
      component: GameDetailViewVue
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
    },
    {
      path: '/categories',
      name: 'categories',
      component: CateogoriesViewVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue,
    },

  ]
})

export default router
