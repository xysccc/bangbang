import {defineStore} from "pinia";
export const useUserStore= defineStore("user",()=>{
    const token=ref("")
    const isLoading=ref(false)
    return {
        token,
        isLoading
    }
},{
    unistorage: true
})
