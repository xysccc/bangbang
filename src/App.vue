<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-11 18:22:42
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-30 23:41:19
 * @FilePath: \bangbang\src\App.vue
-->
<template>123</template>
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  // console.log('App Launch')
})
onShow(() => {
  // console.log('App Show')
  uni.hideTabBar({
    animation: false
  })
})
onHide(() => {
  // console.log('App Hide')
})
</script>
<style lang="scss" scoped></style>
