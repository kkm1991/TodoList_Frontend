<template>
    <div class="container mt-5 ">
    <div class="row justify-content-center ">
      <div class="col-5 ">
        <form @submit.prevent="register">
          <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="text"
            required
            v-model="username"
          />
          <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            v-model="useremail"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
             v-model="password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="ConfirmPassword"
            required
             v-model="confirmpass"
          />
          <label for="floatingPassword">Confirm Password</label>
        </div>
        <div class="text-center">
            <button class="btn btn-secondary my-4 btn-lg w-100 " type="submit"> Register</button>
            
        </div>
       
        </form>
        
    </div>
    <a href="" class="text-center text-decoration-none " @click="router.push('/')">Back</a>
</div>   
</div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from 'axios';
import { useCounterStore } from '@/stores/counter';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';
const authstore=useCounterStore()
const taskStore=useTaskStore()
const username=ref('')
const useremail=ref('')
const password=ref('')
const confirmpass=ref('')
const errormessage=ref('');
const router=useRouter()

const showalert = (para2) => {
  toast.error( para2, {
    position: "top-right", // You can customize the position
    autoClose: 3000, // Notification will automatically close after 3 seconds
    closeOnClick: true, // Close the notification when clicked
  });
};


const register=()=>{
      const registerdata={
        name:username.value,
        email:useremail.value,
        password:password.value
      }

  if(password.value.length <6 || confirmpass.value.length <6){
    showalert('Password is too short, There must be at least six')
  }
  else{
    if(password.value!==confirmpass.value){
         
        showalert('Password do not match')
    }
    else{
        axios.post('http://todolistapi.kkm.logikamyanmar.com/api/register',registerdata).then((res)=>{

          
          
          if(res.data.message){
            showalert('This email account is already registered')
          }
          else{
             
            router.push({
                name:'Home',
                 
               })

          }
        })

    }
  }
      
   
  
}

</script>

<style lang="scss" scoped>

</style>