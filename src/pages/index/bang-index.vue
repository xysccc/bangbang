<template>
  <view class="content">
    <view class="bang-nav"></view>
    <uni-nav-bar
      background-color="transparent"
      :border="false"
      @clickLeft="getLocation"
    >
      <template v-slot:left>
        <view class="address">
          <i
            class="iconfont icon-weizhi-copy-copy"
            :class="{ danger: !simAdress }"
          ></i>
          <text class="address_des" :class="{ danger: !simAdress }">
            {{ simAdress ? simAdress : '未授权位置信息 ! 点击授权' }}</text
          >
        </view>
      </template>
    </uni-nav-bar>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const getLocation = () => {
  console.log('left')
  uni.openSetting({
    success(res) {
      console.log(res.authSetting)
    }
  })
}
const isAuthorization = ref(false)
const simAdress = ref('')
onShow(() => {
  isGetLocation()
})

const getLocationInfo = () => {
  //2. 获取地理位置
  uni.getLocation({
    type: 'wgs84',
    success(res) {
      console.log('你当前经纬度是：')
      console.log(res)
      let latitude, longitude
      latitude = res.latitude.toString()
      longitude = res.longitude.toString()
      uni.request({
        header: {
          'Content-Type': 'application/text'
        },
        url:
          'http://apis.map.qq.com/ws/geocoder/v1/?location=' +
          latitude +
          ',' +
          longitude +
          '&key=MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6',
        success(re) {
          console.log('中文位置')
          console.log(re)
          userStore.location = re
          simAdress.value =
            userStore.location.data.result.address_reference.landmark_l2.title
          console.log('sim', simAdress.value)

          if (re.statusCode === 200) {
            console.log('获取中文街道地理位置成功')
          } else {
            console.log('获取信息失败，请重试！')
          }
        }
      })
    }
  })
}
function getAuthorizeInfo(a = 'scope.userLocation') {
  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
  uni.authorize({
    scope: a,
    success() {
      //1.1 允许授权
      isAuthorization.value = true
      getLocationInfo()
    },
    fail() {
      //1.2 拒绝授权
      isAuthorization.value = false
      console.log('你拒绝了授权，无法获得周边信息')
    }
  })
}
function isGetLocation(a = 'scope.userLocation') {
  // 3. 检查当前是否已经授权访问scope属性，参考下截图
  uni.getSetting({
    success(res) {
      if (!res.authSetting[a]) {
        //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
        getAuthorizeInfo()
      } else {
        getLocationInfo()
      }
    }
  })
}
</script>

<style lang="scss">
.uni-navbar__header-btns-left {
  width: 440rpx !important;
}
.address {
  width: 100%;
  display: flex;
  align-items: center;
  & > .icon-weizhi-copy-copy {
    margin: 10rpx;
    font-size: 60rpx;
    font-weight: 500;
    color: rgba(140, 97, 255, 1);
  }
  & > .address_des {
    font-size: 30rpx;
    font-weight: 600;
    color: rgba(140, 97, 255, 1);
  }
  & > .danger {
    color: #808080;
  }
}
</style>
