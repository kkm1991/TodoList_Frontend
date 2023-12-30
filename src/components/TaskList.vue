<template>
  <div
    class="col-8"
    v-for="(task, index) in taskStore.state.tasklist"
    :key="task.id"
  >
    <div class="row my-1 p-2 shadow-sm align-items-center ">
      <div class="col-2">{{ formatDate(task.created_at) }}</div>
      <div
        class="col-7"
        :class="{ 'text-decoration-line-through  ': task.isDone }"
      >
        {{ task.task_name }}
      </div>

      <div class="col-3 text-end">
        <button class="btn">
          <i
            class="material-icons me-1 fw-bolder "
            :class="{ 'text-success ': task.isDone }"
            @click="addDone(task)"
            >done</i
          >
        </button>
        <button class="btn">
          <i class="material-icons   me-1" @click="addFav(task)" :class="{ 'text-primary': task.isFav }"
            >favorite</i
          >
        </button>
        <button class="btn"><i class="material-icons text-danger  me-1" @click="deleteTask(task)"  
            >delete</i
          ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useTaskStore } from "@/stores/taskStore";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const authstore = useCounterStore();
const taskStore = useTaskStore();

const formatDate = (datestring) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(datestring).toLocaleString("en-US", options);
  return formattedDate;
};

const showsuccessalert = (para2) => {
  toast.info("Success  " + para2, {
    position: "top-right", // You can customize the position
    autoClose: 3000, // Notification will automatically close after 3 seconds
    closeOnClick: true, // Close the notification when clicked
  });
};

//click နှိပ်လိုက်တုန်းက object လိုက်ကြီးထဲ့ပေးလိုက်တယ် ပြီးမှ doneData ထဲကိုလိုတာပဲခွဲထဲ့လိုက်တယ်
const addDone = (task) => {
  const doneData = {
    isDone: !task.isDone,
    task_id: task.id,
    user_id:task.user_id
  };
  axios
    .post("http://todolistapi.kkm.logikamyanmar.com/api/task/addDone", doneData, {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      taskStore.loadtasklist(res.data);
       
      if (doneData.isDone == true) {
        showsuccessalert("Done checked");
      } else {
        showsuccessalert("Undone checked");
      }
    })
    .catch((error) => {
      // Define 'error' in the catch block
      console.error("Error:", error);
    });

  

  
};
//addFav
const addFav = (task) => {
    const Favdata = {
      isFav: !task.isFav,
      task_id: task.id,
      user_id:task.user_id
    };
    axios.post("http://todolistapi.kkm.logikamyanmar.com/api/task/addFav", Favdata, {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json",
      },
    }).then((res)=>{
      taskStore.loadtasklist(res.data)
      if(Favdata.isFav==true){
        showsuccessalert("Favorite Task")
      }
      else{
        showsuccessalert("Removed from Favorite Task")
      }
       
    });
  };

  //delete task
  const deleteTask=(task)=>{
    const deletetask={
      task_id:task.id,
      user_id:task.user_id
    }
    axios.post("http://todolistapi.kkm.logikamyanmar.com/api/task/delete",deletetask,{
      headers:{
      Authorization:`Bearer ${authstore.loginData.token}`,
      Accept:"application/json"
    }}).then((res)=>{
      taskStore.loadtasklist(res.data)
      showsuccessalert("deleted task")
    })
  }
</script>

<style lang="scss" scoped></style>
