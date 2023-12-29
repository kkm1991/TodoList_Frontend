<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from './stores/counter';
const authstore=useCounterStore()
</script>

<template>
  <header class="text-center  ">
    <div class="row justify-content-end mt-1 " v-if="authstore.loginstatus">
            <div class="col-3">
                <button class="btn btn-outline-danger" @click="authstore.clearToken">Logout</button>
            </div>
    </div>
    <div class="row  justify-content-start">
      <div class="col"><img alt="Vue logo" class="logo" src="@/assets/logo.png" width="150" height="150" /> <div class="mb-2 fw-bolder"  v-if="authstore.loginstatus"> {{authstore.loginData.userdata.name}} </div> </div>
      
    </div>
    
    <div class="wrapper">
      <nav>
        <!-- <RouterLink class="me-3 text-decoration-none " to="/"></RouterLink>
        <RouterLink class="text-decoration-none  " to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
 
</style>