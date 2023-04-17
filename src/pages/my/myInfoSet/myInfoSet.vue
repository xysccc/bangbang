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
              ? formInfo.src.substring(1, formInfo.src.length - 1)
              : 'http://qjpqjp.top:9000/bang/photo/default.png'
          "
        />
        <button
          open-type="chooseAvatar"
          @chooseavatar="decryptPhoneNumber"
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
          />
        </div>
        <div class="form_item">
          <view class="title"
            >签&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</view
          >
          <input
            class="input"
            maxlength="13"
            placeholder="这个人很懒，什么也没有写"
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
                :class="[Info.sex === 1 ? 'btnGroupsBlue' : '']"
                @click="changeSex(1)"
              >
                男
              </div>
              <div
                :class="[Info.sex === 0 ? 'btnGroupsBlue' : '']"
                @click="changeSex(0)"
              >
                女
              </div>
            </div>
          </div>
        </div>
        <div class="form_item" style="margin-top: 10px">
          <view class="title">电话号码</view>
          <input class="input" maxlength="11" placeholder="请输入电话号码" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BangNav from '@/components/bangNav.vue'
import { useUserStore } from '@/stores/user'
const Info = useUserStore().userInfo
const imageValue = ref('')
const formInfo = reactive({
  src: ''
})
const decryptPhoneNumber = (e: any) => {
  uni.uploadFile({
    url: 'http://114.116.95.152:2001/mo/upload',
    filePath: e.detail.avatarUrl,
    name: 'file',
    success: (uploadFileRes) => {
      // 上传qjp服务器成功
      formInfo.src = uploadFileRes.data
    }
  })
}
//修改性别
const sex = ref('1')
const changeSex = (i: any) => {
  sex.value = i
  Info.sex = i
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
          margin-top: 30px;
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
