<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div class="content" v-else>
    <div class="top">
      <div class="container">
        <!-- 用户简略信息栏 -->
        <div class="userInfo">
          <div class="imgBox">
            <img
              :src="
                info.head
                  ? `${info.head}`
                  : 'http://qjpqjp.top:9000/bang/photo/default.png'
              "
            />
          </div>
          <div
            class="info"
            @click="
              goTo(`/pages/my/my-space/my-space?id=${userStore.userInfo.id}`)
            "
          >
            <div class="info_top">
              {{ info.username || '您还未登录！' }}
              <img src="http://qjpqjp.top:9000/bang/photo/箭头.png" alt="" />
            </div>

            <div class="info_bottom">
              <div class="login_btn" @click="login" v-if="!userStore.token">
                登录
              </div>
              <div v-else class="login_des">
                {{ userInfo.follow }}关注 &nbsp; {{ userInfo.fans }}粉丝
                &nbsp;{{ userInfo.nice }}获赞
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="myFun">
        <div class="funItem" @click="goMoney">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/account.png" alt="" />
          </div>
          <div class="des">账户</div>
        </div>
        <div class="funItem" @click="goTo(`/pages/my/my-tab/my-collection`)">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/collect.png" alt="" />
          </div>
          <div class="des">收藏</div>
        </div>
        <div class="funItem" @click="goTo(`/pages/my/my-tab/my-history`)">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/files.png" alt="" />
          </div>
          <div class="des">历史</div>
        </div>
        <div class="funItem" @click="goActivity">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/champion.png" alt="" />
          </div>
          <div class="des">活动</div>
        </div>
      </div>
    </div>
    <div class="swiper"></div>
    <div class="container">
      <div
        class="myRelease"
        @click="goTo(`/pages/my/myRelease/my-release`)"
      ></div>
      <div class="myHelp">
        <div class="lf" @click="goTo(`/pages/my/myHelp/my-helper`)"></div>
        <div class="rg">
          <button data-name="shareBtn" open-type="share" class="kfBtn">
            分享
          </button>
        </div>
      </div>
      <div class="toolsAndServe">
        <div class="title">工具与服务</div>
        <div class="main">
          <!-- <div class="item">
            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/设置.png" alt="" />
            </div>
            <div class="mainDes">设置中心</div>
          </div> -->
          <div class="item">
            <button open-type="feedback" class="kfBtn">实时反馈</button>

            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/举报.png" alt="" />
            </div>
            <div class="mainDes">实时反馈</div>
          </div>
          <div class="item">
            <button
              open-type="contact"
              show-message-card
              session-from
              send-message-path
              send-message-title
              class="kfBtn"
            >
              在线客服
            </button>
            <div class="mainTop">
              <img
                src="http://qjpqjp.top:9000/bang/photo/联系我们.png"
                alt=""
              />
            </div>
            <div class="mainDes">联系我们</div>
          </div>
          <div class="item" @click="goTo(`/pages/info/bang-info`)">
            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/帮助.png" alt="" />
            </div>
            <div class="mainDes">使用帮助</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BangTab :selected="4"></BangTab>
</template>

<script setup lang="ts">
import userService from '@/api/user'
import { useUserStore } from '@/stores/user'
import prequest from '@/utils/requst'
import BangTab from '@/components/bangTab.vue'
import { useUtils } from '@/stores/utils'
import bangAudit from '@/components/bangAudit.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
let info = ref({ head: null, username: null })
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
const getInfo = async () => {
  const { data } = await userService.GetUserInfo()
  info.value = data.result as any
  userStore.userInfo = data.result
}
onShow(() => {
  getInfo()
})
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const goActivity = () => {
  uni.showModal({
    title: '正在开发,敬请期待'
  })
}
const goMoney = () => {
  uni.showModal({
    title: '正在开发,敬请期待'
  })
}
</script>

<style scoped lang="scss">
.top {
  padding-top: 156rpx;
  width: 100%;
  height: 432rpx;
  background: url('http://qjpqjp.top:9000/bang/photo/bg.png') no-repeat center
    center;
  background-size: cover;
  & .container > .userInfo {
    margin-top: -20rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150rpx;
    & > .imgBox {
      width: 142rpx;
      height: 142rpx;
      // margin-left: 40rpx;
      margin-right: 28rpx;
      & > image {
        border-radius: 50%;
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
        font-size: 34rpx;
        font-weight: 600;
        color: #ffffff;
        margin-top: 10rpx;
        display: flex;
        justify-content: space-between;
        & > image {
          transform: translateY(27rpx);
          width: 50rpx;
          height: 50rpx;
          object-fit: cover;
        }
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
          margin-top: 24rpx;
          font-size: 28rpx;
          font-weight: 400;
          letter-spacing: 0rpx;
          line-height: 0rpx;
          color: #ffffff;
          text-align: left;
          vertical-align: top;
        }
      }
    }
  }
}
.container {
  & > .myFun {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    margin-top: -110rpx;
    left: 50rpx;
    top: 304rpx;
    width: 100%;
    height: 164rpx;
    opacity: 1;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 1);
    & > .funItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > .img {
        width: 80rpx;
        height: 80rpx;
        & > image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
.swiper {
  margin: 0 auto;
  // margin-top: 34rpx;
  left: 26rpx;
  top: 502.18rpx;
  width: 700rpx;
  height: 186.5rpx;
  opacity: 0.73;
  border-radius: 140rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 154, 107, 1) 0%,
    rgba(255, 104, 71, 1) 76.25%
  );

  background: url('http://qjpqjp.top:9000/bang/photo/banner.png') no-repeat;
  background-size: cover;
}
.container {
  width: 660rpx;
  & > .myRelease {
    margin-top: 26rpx;
    width: 100%;
    height: 208rpx;
    opacity: 1;
    border-radius: 24rpx;
    background: url('http://qjpqjp.top:9000/bang/photo/我的发布.png') no-repeat
      center center;
    background-size: 100% 100%;
  }
  & > .myHelp {
    width: 100%;
    margin-top: 16rpx;
    display: flex;
    // justify-content: space-between;
    & > .lf {
      width: 460rpx;
      height: 208rpx;
      // flex: 1;
      background: url('http://qjpqjp.top:9000/bang/photo/我的帮忙.png')
        no-repeat;
      background-size: 100% 100%;
    }
    & > .rg {
      position: relative;
      margin-left: 20rpx;
      width: 176rpx;
      height: 208rpx;
      border-radius: 24rpx;
      background: rgba(255, 255, 255, 0.69);
      background: url('http://qjpqjp.top:9000/bang/photo/分享一下.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
  & > .toolsAndServe {
    margin-top: 24rpx;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 208rpx;
    opacity: 1;
    border-radius: 24rpx;
    background: rgb(231, 242, 254, 0.8);
    box-shadow: 0rpx 4rpx 74rpx 0rpx rgba(0, 0, 0, 0.09);
    backdrop-filter: blur(50rpx);
    & > .title {
      margin-left: 16rpx;
      margin-top: 14rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    & > .main {
      margin-top: 10rpx;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(1, 1fr);

      & > .item {
        position: relative;
        font-size: 24rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-flow: column nowrap;
        & > .mainTop {
          margin: 15rpx;
          width: 56rpx;
          height: 52rpx;
          & > image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      & > .item:last-child {
        & > .mainTop {
          margin-top: 13rpx;
          width: 52rpx;
          height: 60rpx;
          margin-bottom: 7.6rpx;
        }
      }
    }
  }
  .kfBtn {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
