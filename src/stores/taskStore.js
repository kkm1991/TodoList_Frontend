import { reactive, ref } from "vue";
import { defineStore } from 'pinia'
import axios from "axios";
export const useTaskStore=defineStore('tasks',()=>{
    const state=reactive({
        tasklist:[]
    })
    const loadtasklist=(tasks)=>{
        state.tasklist=tasks
    }
    
    
    return {state ,loadtasklist}
})