<!-- 
<template>
  <view>
    <canvas id="canvas" type="2d" style="width: 100px; height: 100px"></canvas>
  </view>
</template>

<script setup lang="ts">
import lottie from 'lottie-miniprogram'
onReady(() => {
  // 主要差异点：
  // 微信中使用的是wx.createSelectorQuery()
  // uni-app中使用的是uni.createSelectorQuery()
  uni
    .createSelectorQuery()
    .select('#canvas')
    .node((res) => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      lottie.setup(canvas)
      lottie.loadAnimation({
        rendererSettings: {
          context
        },
        loop: true,
        autoplay: true,
        animationData: import('@/common/json/dataSVG.json')
        // path: 'https://xxxx/dataSVG.json'
      })
    })
    .exec()
})
</script> -->
