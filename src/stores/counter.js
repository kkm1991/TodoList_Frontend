import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { useTaskStore } from './taskStore'
export const useCounterStore = defineStore('counter', () => {

   //Auth Start
   const loginstatus=ref(false) //logout button လေးအပေါ်အဖျောက်လုပ်ဖို.အတွက်
   const taskStore=useTaskStore()
   const loginData=reactive({
    token: localStorage.getItem('token') || null,
    userdata:localStorage.getItem('userData')||null
   })

   const setToken=(tokenpass)=>{
      loginData.token=tokenpass
      localStorage.setItem('token',tokenpass)
   }
   const setuserData=(userinfo)=>{
      loginData.userdata=userinfo
      localStorage.setItem('userData',JSON.stringify(userinfo))
   }
   const clearToken=()=>{
    loginData.token=null,
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    taskStore.state.tasklist=[]
    loginstatus.value=false
      router.push({
         name:'login'
      })
   }
   //Auth end
   

  return { loginData, setToken, setuserData , clearToken ,loginstatus }
})
