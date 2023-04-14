<template>
  <div class="content">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <!-- 导航栏 -->
    <uni-nav-bar
      background-color="transparent"
      :border="false"
      @clickLeft="getLocation"
    >
      <template v-slot:left>
        <div class="address">
          <i
            class="iconfont icon-weizhi-copy-copy"
            :class="{ danger: !simAdress }"
          ></i>
          <text class="address_des" :class="{ danger: !simAdress }">
            {{ simAdress ? simAdress : '未授权位置信息 点击授权! ' }}</text
          >
        </div>
      </template>
    </uni-nav-bar>
    <!-- 用户简略信息栏 -->
    <div class="userInfo">
      <div class="imgBox"><img src="" alt="" /></div>
      <div class="info">
        <div class="info_top">123</div>
        <div class="info_bottom">456</div>
      </div>
    </div>
    <!-- 轮播图区域 -->
    <div class="indexSwiper contentCenter"></div>
  </div>
  <!-- 首页主区域 -->
  <div class="indexMain contentCenter">
    <div class="boxMax box"></div>
    <div class="boxMin box"></div>
    <div class="boxMin box" style="margin-left: 14rpx"></div>
    <div class="boxMax box" style="margin-left: 14rpx"></div>
  </div>
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
const simAdress = ref('')
onShow(() => {
  isGetLocation()
})

const getLocationInfo = () => {
  //2. 获取地理位置
  uni.getLocation({
    type: 'wgs84',
    success(res) {
      // 获取经纬度
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
          //中文定位
          userStore.location = re
          simAdress.value =
            userStore.location.data.result.address_reference.landmark_l2.title

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
      getLocationInfo()
    },
    fail() {
      //1.2 拒绝授权
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
.userInfo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150rpx;
  background-color: rgba(140, 97, 255, 1);
  & > .imgBox {
    width: 56px;
    height: 56px;
    margin-left: 40rpx;
    margin-right: 30rpx;
    & > image {
      border-radius: 50%;
      background-color: red;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .info {
    flex: 1;
  }
}
.indexSwiper {
  width: 650rpx;
  height: 298rpx;
  margin-top: 48rpx;
  border-radius: 10px;
  background-color: #fff;
}
.indexMain {
  display: flex;
  flex-flow: column wrap;
  width: 650rpx;
  height: 522rpx;
  margin-top: 54rpx;
  // background-color: $uni-color-primary;
  & > .boxMax {
    width: 318rpx;
    height: 298rpx;
    background-color: rgba(244, 240, 230, 1);
    border-radius: 20rpx;
  }
  & > .boxMin {
    width: 318rpx;
    height: 210rpx;
    background-color: rgba(206, 239, 228, 1);
    border-radius: 20rpx;
  }
  & > .box:nth-child(2n) {
    margin-top: 14rpx;
  }
}
</style>
