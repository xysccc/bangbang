<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-03 00:38:02
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-03 01:00:35
 * @FilePath: \bangbang\src\pages\circle\bang-topicDetail.vue
-->
<template>
  <div class="bang-topicDetail">
    <div class="top">
      <!-- 顶部状态栏占位 -->
      <div class="bang-nav"></div>
      <BangNav />
    </div>
  </div>
</template>

<script setup lang="ts">
import BangNav from '@/components/bangNav.vue'
onLoad((option) => {
  console.log(option)
})
</script>

<style scoped lang="scss">
.top {
  // padding-top: 156rpx;
  width: 100%;
  height: 432rpx;
  position: relative;
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 432rpx;
    background: url('http://qjpqjp.top:9000/bang/photo/bg.png') no-repeat center
      center;
    background-size: cover;
    filter: blur(5px);
  }
}
</style>
