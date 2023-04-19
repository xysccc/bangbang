<template>
  <div class="setPage">
    <div class="bang-nav"></div>
    <BangNav title="设置中心" />
    <div class="container">
      <div class="phoneBind">
        <div
          class="form-item"
          style="
            border-bottom: 2rpx solid rgba(166, 166, 166, 1);
            margin-top: 10rpx;
          "
        >
          <label class="title">手机号码</label>
          <input
            maxlength="11"
            placeholder="请输入电话号码"
            type="tel"
            style="padding-left: 14px"
            v-model="phone"
          />
        </div>
        <div class="form-item" style="margin-top: 19rpx">
          <label class="title">验证码</label>
          <input
            maxlength="4"
            placeholder="请输入验证码"
            type="tel"
            style="padding-left: 50rpx"
            v-model="code"
          />
          <!--    重新发送验证码-->
          <div class="repeatSendCode">
            <span class="kfs" v-show="timerInfo.isActive" @click="getCode"
              >发送验证码</span
            >
            <span class="bxfs" v-show="!timerInfo.isActive"
              >{{ timerInfo.count }}s后重新发送</span
            >
          </div>
        </div>
      </div>
    </div>
    <BangButton title="确定" top="550px" @btnClick="checkCode" />
  </div>
</template>

<script lang="ts" setup>
import userService from '@/api/user'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useUtils } from '@/stores/utils'
const phone = ref('')
const code = ref('')
//在pinia中拿到定时器相关的值
const timerInfo: any = useUtils().timeInfo
//60s倒计时函数
const countDown = () => {
  const storeTimeInfo = useUtils().timeInfo
  console.log('调用了倒计时函数')
  if (!timerInfo.timer) {
    storeTimeInfo.count = storeTimeInfo.time_count
    storeTimeInfo.isActive = false
    storeTimeInfo.timer = setInterval(() => {
      if (
        storeTimeInfo.count > 0 &&
        storeTimeInfo.count <= storeTimeInfo.time_count
      ) {
        storeTimeInfo.count--
      } else {
        clearInterval(storeTimeInfo.timer!)
        storeTimeInfo.isActive = true
        storeTimeInfo.timer = null
      }
    }, 1000)
  }
}
const checkCode = async () => {
  const { data } = await userService.SetCode({
    phone: phone.value,
    code: code.value
  })
  if (data.code !== 1) {
    uni.showToast({
      title: '绑定失败',
      icon: 'none'
    })
  } else {
    await uni.showToast({
      title: '绑定成功',
      icon: 'success'
    })
    await uni.navigateBack()
  }
}
const getCode = () => {
  if (phone.value.length !== 11) {
    uni.showToast({
      title: '请输入完整手机号',
      icon: 'none'
    })
    return
  } else {
    userService.SendCode({
      phone: phone.value
    })
    countDown()
  }
}
</script>

<style lang="scss" scoped>
.setPage {
  & > .container {
    margin-top: 74rpx;
    display: flex;
    justify-content: center;
    & > .phoneBind {
      padding: 20rpx;
      padding-top: 20rpx;
      padding-bottom: 0;
      width: 622rpx;
      height: 180rpx;
      background-color: #fff;
      border-radius: 20rpx;
      & .form-item {
        display: flex;
        height: 65rpx;
        & > .title {
          margin-left: 40rpx;
          font-size: 17 px;
          font-weight: 400;
          letter-spacing: 0rpx;
          color: rgba(0, 0, 0, 1);
        }
        & > input {
          font-size: 17 px;
          // margin-left: 20rpx;
          // padding-left: 20rpx;
          flex: 1;
          font-weight: 400;
          letter-spacing: 0rpx;
          color: rgba(0, 0, 0, 1);
        }
        & > .repeatSendCode {
          margin: 2px 0 0 15px;
          .kfs {
            font-size: 14px;
            font-weight: 400;
            color: rgba(37, 99, 235, 1);
            text-align: left;
            vertical-align: top;
          }
          .bxfs {
            color: #64748b;
          }
        }
      }
    }
  }
}
</style>
