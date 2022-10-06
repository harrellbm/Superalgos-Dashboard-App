import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GlobalView from '../views/GlobalsView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/global',
    name: 'Global',
    component: GlobalView
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
