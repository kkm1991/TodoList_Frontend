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
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
 import { ref,reactive } from 'vue';
 import axios from 'axios'
 import {useCounterStore} from '../stores/counter'
 import { useTaskStore } from '../stores/taskStore';
 import { useRouter } from 'vue-router';
 const router=useRouter()
 const authstore=useCounterStore()
 const taskStore=useTaskStore()
 const userstatus=ref(false)
 const loginData = reactive({
    email:"",
    password:""
 })

 const login=()=>{
    axios.post('http://localhost:8000/api/login',loginData).then((res)=>{
        if(res.data.token==null){
            userstatus.value=false
        }
        else{
            authstore.setToken(res.data.token)
            authstore.setuserData(res.data.user)
            userstatus.value=true
            taskStore.loadtasklist(res.data.todolist)
             router.push({
                name:'Home'
               })
        }
    })
 }

</script>

<style lang="scss" scoped></style>
