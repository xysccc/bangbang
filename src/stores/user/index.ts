import {defineStore} from "pinia";
export const useUserStore= defineStore("user",()=>{
    const token=ref("123")
    return {
        token
    }
},{
    unistorage: true
})
