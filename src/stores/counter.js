import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

   //Auth Start
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
   }
   //Auth end
   

  return { loginData, setToken, setuserData , clearToken }
})
