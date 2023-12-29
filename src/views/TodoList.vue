<template>
    <div class="container">
       
        <div class="row justify-content-center">
            <AddNewTask/>
        </div>
        <div class="row justify-content-center ">
            <TaskList/>
        </div>
        
    </div>
</template>

<script setup>
    import AddNewTask from '@/components/AddNewTask.vue';
    import TaskList from '@/components/TaskList.vue';
    import { useCounterStore } from '@/stores/counter';
    const authstore=useCounterStore()
</script>

<style lang="scss" scoped>

</style>