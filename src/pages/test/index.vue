<template>
  <div class="test">
    <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">
      获取手机号
    </button>
  </div>
</template>

<script setup lang="ts">
import userService from '@/api/user'
import { onLaunch, onShow, onHide, onLoad } from '@dcloudio/uni-app'

onLoad(() => {
  console.log('App Launch')
  // )
})
onMounted(() => {
  console.log('123456789')
  // uni.authorize({
  //   scope: 'scope.userLocation',
  //   success() {
  //     uni.getLocation({
  //       success(res) {
  //         console.log(res)
  //       }
  //     })
  //   },
  //   fail() {
  //     console.log('fa')
  //     uni.openSetting({
  //       success() {
  //         console.log('set open')
  //       },
  //       fail() {
  //         console.log('set fa')
  //       }
  //     })
  //   }
  // })
  uni.getLocation({
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.log(res)
    }
  })
})
// userService.Login({
//   email:"949516815@qq.com",
//   password:"1234567a"
// });
userService.GetUserInfo()
const decryptPhoneNumber = (e: any) => console.log(e)
</script>

<style scoped></style>
