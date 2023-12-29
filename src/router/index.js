import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      
      component: HomeView,
      props: true, 
    },
    {
      path:'/home',
      name:'Home',
      component:()=>import('../views/TodoList.vue'),
     
      beforeEnter:(to,from,next) =>{
         if(from.name=='login'){
          next();
         }
         else{
          next({name:'login'})
         }
      }
    },
    {
      path:'/register',
      name:'Register',
      component:()=>import('../views/RegisterPage.vue'),
    }
     
  ]
  
})
 

export default router
