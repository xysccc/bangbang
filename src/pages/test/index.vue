<template>
  <div class="test">test111</div>
</template>

<script setup lang="ts">
import userService from '@/api/user'
import { onLaunch, onShow, onHide,onLoad } from "@dcloudio/uni-app";

   onLoad(() => {
    console.log("App Launch");
    // )
  });
  onMounted(()=>{
    console.log("1234567");
    // prequest.get('/user').then((res)=>console.log(res))
  })
  userService.Login({
    email:"949516815@qq.com",
    password:"1234567a"
  });
</script>

<style scoped></style>