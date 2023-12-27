import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView
    },
    {
      path:'/home',
      name:'Home',
      component:()=>import('../views/TodoList.vue')
    }
     
  ]
})

export default router
