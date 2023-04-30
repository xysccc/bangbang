<template>
  <view class="tab-bar">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @click="switchTab(item, index)"
    >
      <image
        class="tab_img"
        :src="
          selected === (index && item.selectedIconPath)
            ? item.selectedIconPath
            : item.iconPath
        "
      ></image>
      <view
        class="tab_text"
        v-if="item.text"
        :style="{ color: selected === index ? selectedColor : color }"
        >{{ item.text }}</view
      >
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  selected: {
    type: Number,
    default: () => 0
  }
})
const selected = props.selected

const color = '#a6a6a6'
const selectedColor = 'rgba(75, 106, 239, 1)'

const list = [
  {
    pagePath: 'pages/index/index',
    text: '首页',
    iconPath: '/static/icon/home.png',
    selectedIconPath: '/static/icon/home-active.png'
  },
  {
    pagePath: 'pages/bizhi/index',
    text: '友圈',
    iconPath: '/static/icon/circle.png',
    selectedIconPath: '/static/icon/circle-active.png'
  },
  {
    pagePath: 'pages/add/bang-add',
    iconPath: 'https://bj.bcebos.com/txy-dev/txy/main/zhenjian.png'
  },
  {
    pagePath: 'pages/message/bang-message',
    text: '信息',
    iconPath: '/static/icon/message.png',
    selectedIconPath: '/static/icon/message-active.png'
  },
  {
    pagePath: 'pages/my/bang-my',
    text: '我的',
    iconPath: '/static/icon/my.png',
    selectedIconPath: '/static/icon/my-active.png'
  }
]

const switchTab = (item: any, index: number) => {
  // console.log('item', item)
  // console.log('index', index)
  let url = item.pagePath
  switch (index) {
    case 0:
      url = '/pages/index/bang-index'
      break
    case 1:
      url = '/pages/circle/bang-circle'
      break
    case 2:
      url = '/pages/add/bang-add'
      break
    case 3:
      url = '/pages/message/bang-message'
      break
    case 4:
      url = '/pages/my/bang-my'
      break
    default:
      // Handle unexpected index value
      url = '/pages/index/bang-index'
      break
  }

  uni.switchTab({
    url
  })
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  // 130rpx
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tab_img {
      width: 50rpx;
      height: 50rpx;
    }

    .tab_text {
      font-size: 20rpx;
      margin-top: 9rpx;
    }
  }
}
</style>
