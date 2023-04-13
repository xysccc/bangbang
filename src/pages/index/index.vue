<template>
  <!-- <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button @click="changeToken">btn {{ token }}</button>
  </view> -->
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
const title = ref('Hello')
const store = useUserStore()
const { token } = storeToRefs(store)

const changeToken = () => {
  uni.navigateTo({ url: '/pages/test/index' })
}
</script>

<style lang="scss" scoped></style>
