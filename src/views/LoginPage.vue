<template>
  <div class="container mt-5 ">
    <div class="row justify-content-center ">
      <div class="col-5 ">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="loginData.email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="loginData.password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="text-center">
            <button class="btn btn-dark my-4 btn-lg w-100 " @click="login"> Login</button>
             <router-link to="/register" class="text-decoration-none">Register</router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
 import { ref,reactive,onMounted} from 'vue';
 import axios from 'axios'
 import {useCounterStore} from '../stores/counter'
 import { useTaskStore } from '../stores/taskStore';
 import { useRouter } from 'vue-router';
 import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

 const router=useRouter()
 const authstore=useCounterStore()
 const taskStore=useTaskStore()

 const loginData = reactive({
    email:"",
    password:""
 })

 const showalert = (para2) => {
  toast.error( para2, {
    position: "top-right", // You can customize the position
    autoClose: 3000, // Notification will automatically close after 3 seconds
    closeOnClick: true, // Close the notification when clicked
  });
};

 
 const login=()=>{
    axios.post('http://todolistapi.kkm.logikamyanmar.com/api/login',loginData).then((res)=>{
        if(res.data.token==null){
           authstore.loginstatus=false
        }
        else{
            
              authstore.setToken(res.data.token)
            authstore.setuserData(res.data.user)
            authstore.loginstatus=true
            taskStore.loadtasklist(res.data.todolist)
             router.push({
                name:'Home'
               })
            }

        
    }).catch((error)=>{
      showalert("Login Information incorrect")
    })
 }

</script>

<style lang="scss" scoped></style>
