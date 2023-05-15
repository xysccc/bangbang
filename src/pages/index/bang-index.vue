<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div v-else>
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
      <div class="container">
        <div class="userInfo">
          <div
            class="imgBox"
            @click="
              goTo(`/pages/my/my-space/my-space?id=${userStore.userInfo.id}`)
            "
          >
            <img
              :src="
                info.head
                  ? `${info.head}`
                  : 'http://qjpqjp.top:9000/bang/photo/default.png'
              "
            />
          </div>
          <div class="info">
            <div class="info_top">{{ info.username || '您还未登录！' }}</div>
            <div class="info_bottom">
              <div class="login_btn" @click="login" v-if="!userStore.token">
                登录
              </div>
              <div v-else class="login_des">
                <text @click="goTo(`/pages/my/my-follow/my-follow`)"
                  >关注:{{ userInfo.follow }}</text
                >
                &nbsp;
                <text @click="goTo(`/pages/my/my-fans/my-fans`)"
                  >粉丝:{{ userInfo.fans }}</text
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 轮播图区域 -->
      <div class="indexSwiper container">
        <swiper
          class="swiper"
          circular
          :indicator-dots="true"
          :autoplay="true"
          :interval="2500"
          :duration="800"
        >
          <swiper-item>
            <view class="swiper-item"
              ><img
                src="http://qjpqjp.top:9000/bang/photo/chart1.png"
                class="swiperImg"
                alt=""
            /></view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item"
              ><img
                src="http://qjpqjp.top:9000/bang/photo/chart2.png"
                class="swiperImg"
                alt=""
            /></view>
          </swiper-item>
          <swiper-item>
            <view class="swiper-item"
              ><img
                src="http://qjpqjp.top:9000/bang/photo/chart3.png"
                class="swiperImg"
                alt=""
            /></view>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <!-- 首页主区域 -->
    <div class="indexMain container">
      <div class="boxMax box">
        <img
          src="http://qjpqjp.top:9000/bang/photo/悬赏大厅.png"
          alt=""
          @click="goTo('/pages/index/bang-hall/bang-hall')"
        />
      </div>
      <div class="boxMin box" @click="goRandomPost">
        <img src="http://qjpqjp.top:9000/bang/photo/时间规划.png" alt="" />
      </div>
      <div class="boxMin box" style="margin-left: 14rpx" @click="goRandomTask">
        <img src="http://qjpqjp.top:9000/bang/photo/活动中心.png" alt="" />
      </div>
      <div
        class="boxMax box"
        style="margin-left: 14rpx"
        @click="goToTab(`/pages/circle/bang-circle`)"
      >
        <img src="http://qjpqjp.top:9000/bang/photo/帮帮友圈.png" alt="" />
      </div>
    </div>
    <BangTab></BangTab>
  </div>
</template>

<script setup lang="ts">
import userService from '@/api/user'
import postService from '@/api/post'
import { useUserStore } from '@/stores/user'
import prequest from '@/utils/requst'
import BangTab from '@/components/bangTab.vue'
import taskService from '@/api/task'
import { useUtils } from '@/stores/utils'
import BangNoData from '@/components/bangNoData.vue'
import bangAudit from '@/components/bangAudit.vue'

// import BangButton from '@/components/bangButton.vue'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const simAdress = ref('')
const goTo = (url: string) => {
  uni.navigateTo({ url })
}
// interface IUserInfo {
//   background?: string | null
//   birthday?: string | null
//   email?: string | null
//   head: string | null
//   id?: string
//   phone?: string | null
//   sex?: number
//   signature?: string
//   username?: string
// }
let info = ref({ head: null, username: null })
const getInfo = async () => {
  const { data } = await userService.GetUserInfo()
  info.value = data.result as any
  userStore.userInfo = data.result
}

onShow(() => {
  getInfo()
  isGetLocation()
})
const getLocation = () => {
  uni.openSetting({
    success(res) {
      console.log(res.authSetting)
    }
  })
}
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
          'https://apis.map.qq.com/ws/geocoder/v1/?location=' +
          latitude +
          ',' +
          longitude +
          '&key=MJMBZ-5IHYW-4PSRZ-RX732-E3K67-GYFZ6',
        success(re: any) {
          //中文定位
          userStore.location = re.data.result
          simAdress.value =
            userStore.location.address_reference.landmark_l2.title

          if (re.statusCode === 200) {
            // console.log('获取中文街道地理位置成功')
          } else {
            // console.log('获取信息失败，请重试！')
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
      uni.showModal({
        icon: 'none',
        title: '请检查手机定位权限是否开启',
        showCancel: false
      })
    }
  })
}
function isGetLocation(a = 'scope.userLocation') {
  // 3. 检查当前是否已经授权访问scope属性，参考下截图
  uni.getSetting({
    success(res: any) {
      if (!res.authSetting[a]) {
        //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
        getAuthorizeInfo()
      } else {
        getLocationInfo()
      }
    }
  })
}
const login = () => {
  uni.login({
    async success(res) {
      if (res.code) {
        console.log('res.code', res.code)
        // 登录获取token接口
        prequest('/user/login', {
          method: 'post',
          skipTokenCheck: true,
          data: { code: res.code }
        }).then((res1) => (userStore.token = res1.data.result.token)) // 注意这里根据后台返回的token结构取值
      }
    }
  })
}
const goToTab = (url: string) => {
  uni.switchTab({ url })
}
const goRandomTask = async () => {
  const { data } = await taskService.randomTask()
  if (data.code !== 1) return
  uni.navigateTo({
    url: `/pages/index/bang-hall/bang-taskDetail?id=${data.message}`
  })
}
const goRandomPost = async () => {
  const { data } = await postService.randomPost()
  if (data.code !== 1) return
  uni.navigateTo({ url: `/pages/circle/bang-circleDetail?id=${data.message}` })
}
</script>

<style lang="scss" scoped>
::v-deep .uni-navbar__header-btns-left {
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
.container .userInfo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150rpx;
  & > .imgBox {
    width: 112rpx;
    height: 112rpx;
    margin-left: 10rpx;
    margin-right: 30rpx;
    & > image {
      border-radius: 50%;
      border: 2px soild #fff;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .info {
    display: flex;
    width: 100%;
    height: 122rpx;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    & > .info_top {
      height: 46rpx;
      opacity: 0.8;
      /** 文本1 */
      font-size: 30rpx;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 20rpx;
    }
    & > .info_bottom {
      flex: 1;
      & > .login_btn {
        margin-top: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 116rpx;
        height: 42rpx;
        opacity: 1;
        border-radius: 40rpx;
        background: rgba(255, 255, 255, 1);
        font-size: 20rpx;
        font-weight: 400;
        color: rgba(42, 130, 228, 1);
      }
      & > .login_des {
        font-size: 14px;
        font-weight: 400;

        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
.indexSwiper {
  width: 650rpx;
  height: 298rpx;
  margin-top: 48rpx;
  border-radius: 20rpx;
  & > .swiper {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
    & .swiper-item {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
      & .swiperImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20rpx;
      }
    }
  }
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
    & > image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .boxMin {
    width: 318rpx;
    height: 210rpx;
    background-color: rgba(206, 239, 228, 1);
    border-radius: 20rpx;
    & > image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .box:nth-child(2n) {
    margin-top: 14rpx;
  }
}
</style>
