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
        :src="selected === index ? item.selectedIconPath : item.iconPath"
      ></image>
      <view
        class="tab_text"
        v-if="item.text"
        :style="{ color: selected === index ? selectedColor : color }"
        >{{ item.text }}</view
      >
    </view>
  </view>
  <uni-popup
    ref="popup"
    background-color="#fff"
    mask-background-color="transparent"
    :safe-area="false"
  >
    <div class="pop">
      <div class="wrapped">
        <div class="title">Hi,发表点什么吧!</div>
        <div class="bang" @click="goTo(`/pages/add/bang-add`)">
          <div class="mainBox">
            <i class="iconfont icon-fasong" style="font-size: 35px"> </i>
            <text>发帮忙</text>
          </div>
        </div>
        <div class="post" @click="goTo(`/pages/add/post-add`)">
          <div class="mainBox">
            <i class="iconfont icon-fasong" style="font-size: 35px"> </i>
            <text>发动态</text>
          </div>
        </div>
        <div class="close" @click="close">
          <uni-icons type="closeempty" size="32"></uni-icons>
        </div>
      </div>
    </div>
  </uni-popup>
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
const popup = ref()
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
    pagePath: '',
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
  let url = item.pagePath
  switch (index) {
    case 0:
      url = '/pages/index/bang-index'
      break
    case 1:
      url = '/pages/circle/bang-circle'
      break
    case 2:
      url = ''
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
  if (url) {
    uni.switchTab({
      url
    })
  } else {
    popup.value.open('bottom')
  }
}
const close = () => {
  popup.value.close()
}
const goTo = (url: string) => {
  uni.navigateTo({ url })
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
.pop {
  & > .wrapped {
    padding: 0 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    background-color: #ebeced;
    & > .title {
      font-size: 30px;
      font-weight: 500;
    }
    .bang,
    .post {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 95%;
      height: 150px;
      background-color: #fff;
      font-size: 20px;
      & > .mainBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .post {
      margin-top: 15px;
    }
    .bang {
      margin-top: 22px;
    }
    .close {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
    }
  }
}
</style>
