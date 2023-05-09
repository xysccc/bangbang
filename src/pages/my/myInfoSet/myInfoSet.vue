<template>
  <div class="myInfoSet">
    <div class="bang-nav"></div>
    <BangNav title="个人信息" />

    <div class="imgWrapped container">
      <!-- 头像 -->
      <div class="imgChange">
        <img
          :src="
            formInfo?.src
              ? formInfo.src
              : 'http://qjpqjp.top:9000/bang/photo/default.png'
          "
        />
        <button
          open-type="chooseAvatar"
          @chooseavatar="changImg"
          class="changeImg"
        ></button>
      </div>
    </div>
    <div class="formWrapped container">
      <!--表单区域  -->
      <div class="bang_form">
        <div class="form_item">
          <view class="title"
            >昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</view
          >
          <input
            class="input"
            maxlength="5"
            placeholder="请输入昵称"
            type="nickname"
            v-model="formInfo.username"
          />
        </div>
        <div class="form_item">
          <view class="title"
            >签&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</view
          >
          <input
            class="input"
            maxlength="18"
            placeholder="这个人很懒，什么也没有写"
            v-model="formInfo.signature"
          />
        </div>
        <div class="form_item" style="height: 80px; margin-top: 40px">
          <!--        性别-->
          <div class="xb">
            <div class="title">
              性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
            </div>
            <div class="btnGroups">
              <div
                :class="[userInfo.sex === 1 ? 'btnGroupsBlue' : '']"
                @click="changeSex(1)"
              >
                男
              </div>
              <div
                :class="[userInfo.sex === 0 ? 'btnGroupsBlue' : '']"
                @click="changeSex(0)"
              >
                女
              </div>
            </div>
          </div>
        </div>
        <div class="form_item">
          <view class="title"
            >邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</view
          >
          <input
            class="input"
            maxlength="18"
            placeholder="请输入邮箱"
            v-model="formInfo.email"
          />
        </div>
        <div class="form_item" style="margin-top: 10px">
          <view class="title">电话号码</view>
          <input
            class="input"
            maxlength="11"
            placeholder="请输入电话号码"
            type="tel"
            v-model="formInfo.phone"
            @click="goTo('/pages/my/toolsAndServe/set-page')"
          />
        </div>
        <BangButton title="保存" top="80px" @btn-click="SetUserInfo" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import userService from '@/api/user'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
userStore.getUserInfo()
const formInfo = computed(() => {
  return {
    src: userInfo.value.head || '',
    username: userInfo.value.username || '',
    email: userInfo.value.email || '',
    phone: userInfo.value.phone || '',
    signature: userInfo.value.signature || ''
  }
})
// onShow(async () => {
//   await userStore.getUserInfo()
// })
const changImg = (e: any) => {
  uni.uploadFile({
    url: 'https://www.qjpqjp.top/bang/mo/upload',
    filePath: e.detail.avatarUrl,
    name: 'file',
    success: (uploadFileRes) => {
      // 上传qjp服务器成功
      formInfo.value.src = JSON.parse(uploadFileRes.data).result.url
    }
  })
}

//修改性别
let sex = userInfo.value.sex
const changeSex = (i: any) => {
  sex = i
  userInfo.value.sex = i
}
const SetUserInfo = async () => {
  const { data } = await userService.SetUserInfo({
    username: formInfo.value.username,
    email: formInfo.value.email,
    phone: formInfo.value.phone,
    sex: sex.value,
    signature: formInfo.value.signature,
    head: formInfo.value.src
  })
  if (data.code !== 1) return
  await uni.showToast({
    title: '修改成功',
    icon: 'success'
  })
  // await uni.navigateBack()
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
const goTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.imgWrapped {
  margin-top: 98rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .imgChange {
    position: relative;
    width: 168rpx;
    height: 168rpx;
    // background-color: red;
    & > image {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 36rpx;
    }
  }
  & .changeImg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
.formWrapped {
  padding-left: 50rpx;
  & > .bang_form {
    width: 100%;
    margin-top: 112rpx;
    // & .form_item:nth-child(1) ~ .form_item {
    //   margin-top: 20px;
    // }
    & .form_item {
      margin-top: 30px;
      width: 100%;
      height: 80rpx;
      display: flex;
      align-items: center;

      &:nth-child(1) {
        margin-top: 0;
      }
      & .title {
        font-size: 36rpx;
        font-weight: 400;
        letter-spacing: 0rpx;
        line-height: 0rpx;
        color: rgba(128, 128, 128, 1);
        text-align: left;
        vertical-align: top;
      }
      & > .input {
        padding-left: 54rpx;
        flex: 1;
      }
      .xb {
        height: 100%;

        .btnGroups {
          margin-top: 40px;
          display: flex;
          justify-content: flex-start;
          font-size: 15px;

          .btnGroupsBlue {
            background-color: rgba(37, 99, 235, 1);
            color: #fff;
          }

          view {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: none;
            width: 87px;
            height: 34px;
            border-radius: 6px;
            margin-right: 6px;
            border: 1px solid #d7d7d7;
            background-color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>
