<template>
    <div class="col-8">
        <div class="form-floating mb-3">
            <input type="email" v-model="newTask" class="form-control" @keyup.enter="addtask" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Add New Task and Press Enter</label>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useTaskStore } from '../stores/taskStore';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const taskStore=useTaskStore(); // takslist နဲ့ဆိုင်တဲ့အချက်အလက်တွေခေါ်သုံးဖို.
const authstore=useCounterStore(); //user_id စတဲ့အချက်အလက်တွေခေါ်သုံးဖို.
const newTask=ref('');
 
 
const userData = authstore.loginData.userdata ? JSON.parse(authstore.loginData.userdata) : null; 

const addtask=()=>{
            const newTaskDataToAdd={
            task_name:newTask.value,
            user_id:userData.id
            };
            axios.post('http://localhost:8000/api/task/add/',newTaskDataToAdd,{
              headers:{
                'Authorization':`Bearer ${authstore.loginData.token}`,
                'Accept':'application/json'}
            }).then((res)=>{
                    taskStore.loadtasklist(res.data) //backend ကပြန်ပို.လိုက်တဲ့ dataတွေကို store ထဲမှာသွားသိမ်းတာ
                    showsuccessalert() //alert ပြ
                    newTask.value="" //input box ကို clear လုပ်
            }).catch((error)=>{
                console.error('Error adding task:',error)
            })
          
             
    }
    const showsuccessalert=()=>{
        toast.success('Success adding new task',{
    position: 'top-right', // You can customize the position
    autoClose: 3000, // Notification will automatically close after 3 seconds
    closeOnClick: true, // Close the notification when clicked
  });
    }

</script>

<style lang="scss" scoped>

</style>