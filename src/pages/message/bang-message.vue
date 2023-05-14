<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-13 09:48:29
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-11 14:33:54
 * @FilePath: \bangbang\src\pages\message\bang-message.vue
-->
<template>
  <div v-if="useUtils().isExamine">
    <div class="container">
      <div style="height: 100px"></div>
      <header class="header"></header>
      <main class="main">
        <img
          class="image"
          src="https://picsum.photos/400/600"
          alt="随机图片"
          style="width: 100px; height: 100px; border-radius: 50%"
        />
        <div class="divider"></div>
        <ul class="list">
          <li class="item">
            <h2 class="item-title">标题1</h2>
            <p class="item-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </li>
          <!-- <li class="item">
            <h2 class="item-title">标题2</h2>
            <p class="item-content">内容2</p>
          </li>
          <li class="item">
            <h2 class="item-title">标题3</h2>
            <p class="item-content">内容3</p>
          </li> -->
        </ul>
      </main>
    </div>
    <BangNoData />
  </div>
  <div class="bang-message" v-else>
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <div class="lab">
      <div class="label">消息</div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tongzhi"></use>
      </svg>
    </div>
    <div class="search_wrapped">
      <uni-search-bar cancelButton="none" placeholder="Search"></uni-search-bar>
    </div>

    <!-- <div class="noMessage" v-if="isShow && chatList.length === 0"></div> -->
    <div class="messageList container">
      <div
        class="message-item"
        v-for="(item, index) in chatList"
        @click="goTo(`/pages/message/message-details?id=${item.id}`)"
      >
        <div class="lf">
          <img :src="item.head" alt="" />
        </div>
        <div class="rg">
          <div class="lab_time">
            <div class="label">{{ item.name }}</div>
            <div class="time">{{ getTime2(item.sendTime) }}</div>
          </div>
          <div class="mes_badge">
            <div class="message">{{ item.lastMsg }}</div>
            <uni-badge
              class="uni-badge-left-margin"
              :text="item.unread"
              v-if="item.unread > 0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <BangTab :selected="3"></BangTab>
</template>

<script lang="ts" setup>
import userService from '@/api/user'
import BangTab from '@/components/bangTab.vue'
import { useUtils } from '@/stores/utils'
import { getTime2 } from '@/utils/date'
const chatList = ref([])
onShow(async () => {
  const { data } = await userService.getChatList()
  if (data.code !== 1) return
  chatList.value = data.result
})
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.bang-message {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  .lab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 58rpx;
    height: 80rpx;
    .label {
      font-size: 50rpx;
      color: #222222;
    }
    svg {
      font-size: 40rpx;
    }
  }
  .search_wrapped {
    width: 654rpx;
    height: 72rpx;
    margin-left: 50%;
    margin-top: 32rpx;
    transform: translateX(-50%);
  }
  :deep(.mui-search.mui-active:before) {
    top: 36rpx;
  }
  .messageList {
    overflow: scroll;
    height: 1155rpx;
    margin-top: 32rpx;
    .message-item {
      margin-left: 28rpx;
      margin-top: 32rpx;
      width: 654rpx;
      height: 136rpx;
      display: flex;
      align-items: flex-start;
      border-bottom: 2rpx solid rgba(237, 237, 237, 1);
      .lf {
        width: 96rpx;
        height: 96rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
      .rg {
        margin-left: 32rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        .lab_time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .label {
            font-size: 32rpx;
            color: rgba(15, 24, 40, 1);
          }
          .time {
            font-size: 30rpx;
            color: #b8b9ba;
          }
        }
        .mes_badge {
          padding-right: 20rpx;
          margin-top: 10rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .message {
            max-width: 400rpx;
            display: -webkit-box !important;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            font-size: 28rpx;
            color: rgba(173, 181, 189, 1);
          }
          .badge {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30rpx;
            height: 30rpx;
            border-radius: 100%;
            background-color: #ee0a24;
            color: #fff;
            font-weight: 600;
          }
        }
      }
    }
    :deep(.van-badge--dot) {
      top: 80rpx;
      right: 20rpx;
      width: 26rpx;
      height: 26rpx;
    }
  }
  .noMessage {
    margin-top: 270rpx;
    width: 100%;
    height: 800rpx;
    background: url('https://s1.ax1x.com/2022/11/23/z8XTud.png') no-repeat;
    background-size: cover;
  }
}
</style>
