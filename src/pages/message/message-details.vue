<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-04 00:49:28
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-15 09:10:54
 * @FilePath: \bangbang\src\pages\message\message-details.vue
-->
<template>
  <div class="message-details">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav :title="otherInfo.username" />
    <div class="topWrapped">
      <div class="container">
        <div class="topCard">
          <div class="top">
            <div class="sex">
              <div class="title">性别</div>
              <div class="des">
                <i
                  class="iconfont icon-nan"
                  style="font-size: 35rpx; color: #2563eb"
                  v-if="otherInfo.sex === 1"
                ></i>
                <i
                  class="iconfont icon-nv"
                  style="font-size: 35rpx; color: #ff4d94"
                  v-else
                ></i>
              </div>
            </div>
            <div class="signature">
              <div class="title">签名</div>
              <div class="des">{{ otherInfo.signature }}</div>
            </div>
            <div class="fans">
              <div class="title">粉丝</div>
              <div class="des">{{ otherInfo.fans }}</div>
            </div>
            <div class="praise">
              <div class="title">获赞量</div>
              <div class="des">{{ otherInfo.nice }}</div>
            </div>
          </div>
          <div class="bottom">
            <div class="follow" @click="toggleFollow(otherInfo)">
              {{ otherInfo.isFollow ? '取消关注' : '关注ta' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatList" ref="chatListRef">
      <div class="chatListWrapped">
        <div
          class="chatItem"
          v-for="(item, index) in chatList"
          :key="item.id"
          :class="[item.fromId === userInfo.id ? 'chatItem_rg' : 'chatItem_lf']"
        >
          <div class="message">{{ item.lastContext }}</div>
          <img
            :src="[
              item.fromId === userInfo.id
                ? `${userInfo.head}`
                : `${otherInfo.head}`
            ]"
            @click="
              goTo(
                `/pages/my/my-space/my-space?id=${
                  item.fromId === userInfo.id ? userInfo.id : otherInfo.id
                }`
              )
            "
          />
        </div>
        <!-- <div class="chatItem chatItem_lf" v-for="(item, index) in 7">
          <div class="message">啊嘻嘻</div>
          <img src="http://qjpqjp.top:9000/bang/photo/default.png" />
        </div> -->
      </div>
    </div>
    <div class="chat_footer">
      <div class="chatInput">
        <input type="text" placeholder="说点什么吧" v-model="inputVal" />
        <div class="send" :class="{ haveSend: inputVal }" @click="sendMessage">
          <uni-icons
            type="arrow-up"
            size="30"
            color="rgba(255, 255, 255, 1)"
          ></uni-icons>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BangNav from '@/components/bangNav.vue'
import userService from '@/api/user'
import WS from '@/utils/webSocket'
import { useUserStore } from '@/stores/user'
interface IchatItem {
  fromId: string
  id?: string
  isRead: number
  lastContext: string
  sendTime: string
  toId: string
}
const id = ref('')
const otherInfo: any = ref({})
const chatList = ref<IchatItem[]>([])
// 进入聊天页面初始化
let ws: any = null
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
onLoad((option: any) => {
  console.log(option.id)
  id.value = option.id
  ws = new WS({
    // 连接websocket所需参数
    data: { userId: userInfo.value.id },
    // 首次连接成功之后，断线重新连接后也会触发（防止断线期间对方发送消息未接收到）
    onConnected: () => {
      // toDo
      // 一般用于请求历史消息列表 getHistoryList()
      console.log('请求历史记录zhong~~~')
      getHistoryList()
    },
    // 监听接收到服务器消息
    onMessage: (data: any) => {
      // toDo
      // 一般用于将最新的一条消息展示在页面上
      console.log('newMessage', data)
      userStore.myMessage++
      chatList.value.push({
        fromId: otherInfo.value.id,
        lastContext: data.result.contentText,
        sendTime: '123',
        isRead: 1,
        toId: userInfo.value.id
      })
    }
  })
})
const sendMessage = () => {
  if (!inputVal.value) return
  ws.socketTask.send({
    data:
      '[{"toUserId":"' + id.value + '","contentText":"' + inputVal.value + '"}]'
  })
  chatList.value.push({
    fromId: userInfo.value.id,
    lastContext: inputVal.value,
    sendTime: '123',
    isRead: 1,
    toId: otherInfo.id
  })
  inputVal.value = ''
}
onMounted(async () => {
  const { data } = await userService.GetOtherInfo({ toOpenid: id.value })
  if (data.code !== 1) return
  otherInfo.value = data.result
})
const getHistoryList = async () => {
  const { data } = await userService.getChat({ toId: id.value })
  console.log('ltjl', data.result)
  if (data.code !== 1) return
  chatList.value = data.result
}
const toggleFollow = (item: any) => {
  console.log(item)

  item.isFollow = !item.isFollow
  userService.follow({ toId: item.id })
}
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const inputVal = ref('')
// 页面销毁，断开websocket
onUnload(() => {
  // 主动关闭websocket
  ws.close()
})
</script>

<style scoped lang="scss">
.message-details {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  & > .topWrapped {
    margin-top: 20rpx;
    padding: 40rpx 0;
    border-bottom: 2rpx solid rgba(234, 236, 239, 1);
    & > .container {
      & > .topCard {
        padding: 40rpx 40rpx;
        height: 290rpx;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0rpx 20rpx 80rpx 0rpx rgba(26, 77, 160, 0.16);
        border-radius: 20rpx;
        & .sex,
        .signature,
        .fans,
        .praise,
        .follow {
          width: 190rpx;
          display: flex;
          justify-content: center;
          flex-direction: column;
          & > .title {
            /** 文本1 */
            font-size: 28rpx;
            font-weight: 400;
            letter-spacing: 5rpx;
            color: rgba(0, 0, 0, 1);
          }
          & > .des {
            font-size: 26rpx;
            font-weight: 400;
            letter-spacing: 0rpx;
            color: rgba(166, 166, 166, 1);
          }
        }
        .signature {
          margin-left: 50rpx;
          position: relative;
          width: 200rpx;
          & > .des {
            // width: 100%;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden; //文本超出隐藏
            text-overflow: ellipsis; //文本超出省略号替代
          }
          &::after {
            content: '';
            position: absolute;
            right: 0rpx;
            bottom: 4rpx;
            width: 2rpx;
            height: 42rpx;
            background-color: rgba(169, 182, 193, 1);
          }
          &::before {
            content: '';
            position: absolute;
            left: -30rpx;
            bottom: 4rpx;
            width: 2rpx;
            height: 42rpx;
            background-color: rgba(169, 182, 193, 1);
          }
        }
        .fans {
          margin-left: 60rpx;
          width: 100rpx;
        }
        .sex {
          width: 160rpx;
          position: relative;
          .isMen {
            color: rgba(42, 130, 228, 1);
            margin-left: 10rpx;
          }
          .isWomen {
            color: #e12929;
            margin-left: 10rpx;
          }
        }
        .praise {
          margin-top: 26rpx;
        }
        & > .top {
          display: flex;
          flex-wrap: wrap;
        }
        & > .bottom {
          .follow {
            display: flex;
            align-items: center;
            justify-content: center;
            // padding: 15rpx 40rpx;
            width: 200rpx;
            height: 50rpx;
            float: right;
            background-color: rgba(37, 99, 235, 1);
            border-radius: 20rpx;
            color: rgba(255, 255, 255, 1);
            font-size: 24rpx;
          }
        }
      }
    }
  }
  .chatList {
    // border-top: 2rpx solid rgba(234, 236, 239, 1);
    // padding: 74rpx 40rpx 30rpx;
    // margin-top: 40rpx;
    width: 100vw;
    height: 900rpx;
    overflow-y: auto;
    overflow-x: hidden;
    & > .chatListWrapped {
      padding: 40rpx 60rpx;
    }
    .chatItem {
      margin-top: 30rpx;
    }
    .chatItem_rg {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      image {
        width: 72rpx;
        height: 72rpx;
        border-radius: 100%;
      }
      .message {
        letter-spacing: 1.2rpx;
        padding: 15rpx 30rpx;
        margin-right: 36rpx;
        max-width: 522rpx;
        min-height: 60rpx;
        background: rgba(255, 231, 174, 1);
        border-radius: 20rpx;
        font-size: 30rpx;
        color: rgba(63, 72, 112, 1);
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
      }
    }
    .chatItem_lf {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-start;
      justify-content: flex-end;
      image {
        width: 72rpx;
        height: 72rpx;
        border-radius: 100%;
      }
      .message {
        padding: 15rpx 30rpx;
        letter-spacing: 1.2rpx;
        margin-left: 36rpx;
        max-width: 522rpx;
        min-height: 60rpx;
        height: auto;
        background: rgba(236, 243, 254, 1);
        border-radius: 20rpx;
        font-size: 30rpx;
        color: rgba(63, 72, 112, 1);
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
      }
    }
  }
  .chat_footer {
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: 40rpx;
    padding-bottom: 60rpx;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    // height: 176rpx;
    overflow: hidden;
    background-color: rgba(249, 249, 249, 1);
    .chatInput {
      display: flex;
      width: 100%;
      align-items: center;
      input {
        flex: 0.9;
        padding-left: 60rpx;
        margin-left: 60rpx;
        height: 76rpx;
        font-size: 28rpx;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        border: 2rpx solid rgba(243, 243, 243, 1);
        border-radius: 38rpx;
        &::placeholder {
          font-size: 28rpx;
          color: rgba(83, 88, 110, 0.6);
        }
      }
      .xx {
        font-size: 50rpx;
        margin-left: 30rpx;
      }
      .fs {
        font-size: 50rpx;
        margin-left: 40rpx;
      }
      & > .send {
        margin-left: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        background-color: #e5e5e5;
        transition: 0.5s;
      }
      & > .haveSend {
        background-color: rgba(42, 130, 228, 1);
      }
    }
  }
}
</style>
