<script setup>
import { RouterLink, RouterView } from 'vue-router'
 
</script>

<template>
  <header class="text-center mt-3 ">
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="250" height="250" />
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