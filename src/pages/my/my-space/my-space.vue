<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-02 18:00:20
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-15 09:00:53
 * @FilePath: \bangbang\src\pages\my\my-space\my-space.vue
-->
<template>
  <scroll-view
    class="my-space"
    scroll-y="true"
    lower-threshold="5"
    @scrolltolower="handleScroll"
  >
    <div class="topBg">
      <!-- 顶部状态栏占位 -->
      <div class="bang-nav"></div>
      <BangNav />
    </div>

    <div class="main">
      <div class="infoTop">
        <div class="userTop">
          <div class="lf">
            <image mode="aspectFill" :src="info?.head" />
          </div>
          <div class="rg">
            <div
              class="edit"
              v-show="isOwn"
              @click="goTo(`/pages/my/myInfoSet/myInfoSet`)"
            >
              编辑资料
            </div>
            <div
              class="message"
              v-show="!isOwn"
              @click="goTo(`/pages/message/message-details?id=${info.id}`)"
            >
              私信
            </div>
            <div
              class="follow"
              v-show="!isOwn"
              @click="toggleFollow(info)"
              :class="[info.isFollow ? '' : 'noFollow']"
            >
              {{ info.isFollow ? '取消关注' : '关注' }}
            </div>
          </div>
        </div>
        <div class="username">
          {{ info?.username }}
          <i
            class="iconfont icon-nan"
            style="font-size: 35rpx; color: #2563eb; margin-left: 5rpx"
            v-if="info.sex === 1"
          ></i>
          <i
            class="iconfont icon-nv"
            style="font-size: 35rpx; color: #ff4d94; margin-left: 5rpx"
            v-else
          ></i>
        </div>
        <div class="signature">
          {{ info?.signature }}
        </div>
        <div class="userBottom">
          <div class="nice">{{ info?.nice }}&nbsp;获赞</div>
          <div class="follow" @click="goTo(`/pages/my/my-follow/my-follow`)">
            {{ info?.follow }}&nbsp;关注
          </div>
          <div class="fans" @click="goTo(`/pages/my/my-fans/my-fans`)">
            {{ info?.fans }}&nbsp;粉丝
          </div>
        </div>
      </div>
      <div class="content">
        <div class="container">
          <div class="tab">
            <uni-segmented-control
              :current="current"
              :values="items"
              style-type="text"
              active-color="rgba(24, 123, 237, 1)"
              @clickItem="onClickItem"
            />
          </div>
          <div class="topicList">
            <div class="title">话题&nbsp;{{ personalTopic?.followNum }}</div>
            <scroll-view class="topicListWrapped" scroll-x="true">
              <div class="topicItemWrapped">
                <div
                  class="topicItem"
                  v-for="(item, index) in personalTopic?.res"
                  :key="index"
                  @click="goTo(`/pages/circle/bang-topicDetail?id=${item.id}`)"
                >
                  <image :src="item.head" mode="aspectFill" />
                  {{ item.name }}
                </div>
              </div>
            </scroll-view>
          </div>
          <div class="postMain">
            <template v-for="(item, index) in pushArr" :key="index">
              <div v-if="current === 1" class="comment_card">
                <div class="top">
                  <image :src="item.head" mode="aspectFill" />
                  <div class="info">
                    <div class="name">{{ item.username }}</div>
                    <div class="time">{{ item.commentTime }}</div>
                  </div>
                </div>
                <div class="commentDes">{{ item.commentText }}</div>
                <div class="comment">
                  <div class="postDes">
                    {{ item.toUsername }}：[{{ fileType(item.fileType) }}]
                    {{ item.postText }}
                  </div>
                </div>
              </div>
            </template>
            <template v-for="(item, index) in pushArr" :key="index">
              <div
                class="circle_card"
                v-if="current !== 1"
                @click="goTo(`/pages/circle/bang-circleDetail?id=${item.id}`)"
              >
                <div class="top">
                  <div class="lf">
                    <img :src="item.head" alt="" />
                    <div class="topDes">
                      <div class="name">{{ item.username }}</div>
                      <div class="time">{{ item.releaseTime }}发布</div>
                    </div>
                  </div>
                  <div class="rg" style="font-size: 40rpx">🥶</div>
                </div>
                <div class="des">
                  <div class="details">
                    {{ item.text }}
                  </div>
                  <div class="imgList">
                    <image
                      :src="item1.imgUrl"
                      alt=""
                      mode="aspectFill"
                      v-for="(item1, index) in JSON.parse(item.urls)"
                      :key="index"
                      @click.stop="preview(item, index)"
                    />
                  </div>
                </div>
                <div class="bottom">
                  <div class="lf">
                    <div
                      class="topic"
                      @click="
                        goTo(
                          `/pages/circle/bang-topicDetail?id=${item.topicId}`
                        )
                      "
                    >
                      <i
                        class="iconfont icon-huati"
                        style="font-size: 35rpx"
                      ></i>
                      {{ item.topicName
                      }}<uni-icons
                        type="forward"
                        size="14"
                        color="rgba(42, 130, 228, 1)"
                      ></uni-icons>
                    </div>
                  </div>
                  <div class="rg">
                    <div class="like" @click.stop="like(item)">
                      <i
                        class="iconfont icon-dianzan"
                        style="font-size: 32rpx"
                        :class="{ isLike: item.like }"
                        >{{ item.likeNum }}</i
                      >
                    </div>
                    <div class="collect" @click.stop="collect(item)">
                      <i
                        class="iconfont icon-shoucang"
                        style="font-size: 35rpx"
                        v-if="!item.collect"
                      ></i>
                      <i
                        class="iconfont icon-shoucang1"
                        style="font-size: 35rpx; color: #f4ea2a"
                        v-else
                      ></i>
                    </div>
                    <div class="comment">
                      <i
                        class="iconfont icon-pinglun"
                        style="font-size: 35rpx"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <uni-load-more
              :status="status"
              v-if="pushArr.length >= 3"
            ></uni-load-more>
            <BangNoData v-show="pushArr.length === 0" />
          </div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
import postService from '@/api/post'
import userService from '@/api/user'
import BangNav from '@/components/bangNav.vue'
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import BangNoData from '@/components/bangNoData.vue'
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
const postStore = usePostStore()
type cI = {
  currentIndex: number
}
const userStore = useUserStore()
let info = ref()
let pushArr = reactive<any>([])
const isOwn = ref(false)
const id = ref('')
let postList = computed(() => postStore.postList)
const current = ref(0)
const items = ['动态', '评论', '收藏']
const status = ref('more')
const personalTopic = computed(() => postStore.personalTopic)

let pageOptions = {
  page: 1,
  pageSize: 3
}
const getOwnInfo = async () => {
  const { data } = await userService.GetUserInfo()
  userStore.userInfo = data.result
  info.value = data.result
}
const getOtherInfo = async (oherId: string) => {
  const { data } = await userService.GetOtherInfo({
    toOpenid: oherId
  })
  info.value = data.result
}
onLoad(async (option: any) => {
  id.value = option.id
})
onShow(async () => {
  if (id.value === userStore.userInfo.id) {
    isOwn.value = true
    await getOwnInfo()
  } else {
    isOwn.value = false
    await getOtherInfo(id.value)
  }
  await postStore.getPersonalTopic({
    ...(!isOwn.value && { openid: id.value })
  })
  await postStore.getPersonalOwn({
    ...pageOptions,
    ...(!isOwn.value && { openid: id.value })
  })
  pushArr.splice(pushArr.length)
  pushArr.push(...postList.value.records)
})

const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}

const onClickItem = async (e: cI) => {
  pageOptions.page = 1
  pushArr = reactive([])
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  await getList()
  if (current.value === 1) {
    console.log(postList.value)
    pushArr.push(...postList.value)
  }
  pushArr.push(...postList.value.records)
}
// const preview = (item: ImediaList, index: number) => {
//   const files = computed(() => JSON.parse(postList.value.records[index].urls))
//   uni.previewMedia({
//     current: index,
//     // url: item.videoUrl || item.imgUrl, // 当前显示图片的 http 链接
//     sources: files.value.map((item: ImediaList) => {
//       if (item.videoUrl) {
//         return { url: item.videoUrl, type: 'video', poster: item.imgUrl }
//       } else {
//         return { url: item.imgUrl, type: 'image' }
//       }
//     }) // 需要预览的图片 http 链接列表
//   })
// }
const preview = (item: any, index: number) => {
  const files = computed(() => JSON.parse(item.urls))
  uni.previewMedia({
    current: index,
    // url: item.videoUrl || item.imgUrl, // 当前显示图片的 http 链接
    sources: files.value.map((item: ImediaList) => {
      if (item.videoUrl) {
        return { url: item.videoUrl, type: 'video', poster: item.imgUrl }
      } else {
        return { url: item.imgUrl, type: 'image' }
      }
    }) // 需要预览的图片 http 链接列表
  })
}
const getList = () => {
  switch (current.value) {
    case 0:
      return postStore.getPersonalOwn({
        ...pageOptions,
        ...(!isOwn.value && { openid: id.value })
      })
      break
    case 1:
      return postStore.getPersonalComment({
        ...pageOptions,
        ...(!isOwn.value && { openid: id.value })
      })
      break
    case 2:
      return postStore.getPersonalCollect({
        ...pageOptions,
        ...(!isOwn.value && { openid: id.value })
      })
      break
    default:
      break
  }
}
const handleScroll = async (e: any) => {
  if (postList.value.total > pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    pushArr.push(...postList.value.records)
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
const fileType = computed(() => (typeNum: number) => {
  switch (typeNum) {
    case 0:
      return ''
      break
    case 1:
      return '图片'
      break
    case 2:
      return '视频'
      break
    default:
      break
  }
})
const like = async (item: any) => {
  item.like = !item.like
  item.like ? item.likeNum++ : item.likeNum--
  await postService.postLike({ postId: item.id })
}
const collect = async (item: any) => {
  item.collect = !item.collect
  await postService.postCollect({ postId: item.id })
}
const toggleFollow = (item: any) => {
  item.isFollow = !item.isFollow
  userService.follow({ toId: item.id })
}
</script>

<style scoped lang="scss">
.my-space {
  height: 100vh;
  & .topBg {
    // padding-top: 156rpx;
    width: 100%;
    height: 432rpx;
    background: url('http://qjpqjp.top:9000/bang/photo/bg.png') no-repeat center
      center;
    background-size: cover;
  }
}

.main {
  & .infoTop {
    position: relative;
    padding: 0 50rpx;
    margin-top: -70rpx;
    height: 256rpx;
    background-color: #fff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    & > .userTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > .lf {
        margin-top: -100rpx;
        & image {
          width: 190rpx;
          height: 190rpx;
          border-radius: 50%;
        }
      }
      & > .rg {
        display: flex;
        & > .message,
        .follow,
        .edit {
          font-size: 30rpx;
          padding: 2rpx 30rpx;
          border-radius: 40rpx;
          background-color: rgba(255, 255, 255, 1);
          color: rgba(42, 130, 228, 1);
          border: 2rpx solid rgba(42, 130, 228, 1);
        }
        & > .follow {
          margin-left: 20rpx;
        }
        & > .noFollow,
        .edit {
          background-color: rgba(42, 130, 228, 1);
          color: #fff;
        }
      }
    }
    & > .username {
      display: flex;
      font-size: 34rpx;
      font-weight: 500;
      line-height: 49.24rpx;
      color: rgba(0, 0, 0, 1);

      & > .isMen {
        color: rgba(42, 130, 228, 1);
        margin-left: 10rpx;
      }
      & > .isWomen {
        color: #e12929;
        margin-left: 10rpx;
      }
    }
    & > .signature {
      margin: 10rpx 0;
      font-size: 26rpx;
      letter-spacing: 0rpx;
      line-height: 28.96rpx;
      color: rgba(166, 166, 166, 1);
    }
    & > .userBottom {
      margin-top: 4rpx;
      display: flex;
      & > .nice,
      .follow,
      .fans {
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
      }
      & > .follow {
        margin: 0 16rpx;
      }
    }
    &::after {
      content: '';
      position: absolute;
      background-color: rgba(204, 204, 204, 1);
      bottom: 0;
      left: 0;
      width: 100%;
      height: 8rpx;
    }
  }
  & > .content {
    background-color: #fff;
    & > .container {
      & > .tab {
        width: 60%;
      }
      & > .topicList {
        padding: 20rpx 20rpx;
        margin-top: 30rpx;
        border-radius: 24rpx;
        background: rgba(229, 229, 229, 0);
        box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
        & > .title {
          margin: 12rpx 0;
          font-size: 26rpx;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        & > .topicListWrapped {
          margin-top: 8rpx;
          display: flex;
          flex-flow: row nowrap;
          width: 100%;
          & .topicItemWrapped {
            display: flex;

            .topicItem {
              width: fit-content;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 24rpx;
              color: rgba(128, 128, 128, 1);
              & > image {
                width: 100rpx;
                height: 85rpx;
                border-radius: 10rpx;
              }
              &:not(:first-child) {
                margin-left: 30rpx;
              }
            }
          }
        }
      }
      & > .postMain {
        margin-top: 20rpx;
        height: 800rpx;
        overflow: auto;
        & .comment_card {
          padding: 30rpx 40rpx;
          & > .top {
            display: flex;
            image {
              width: 64rpx;
              height: 64rpx;
              border-radius: 50%;
            }
            & > .info {
              margin-left: 12rpx;
              & > .name {
                font-size: 28rpx;
                color: rgba(128, 128, 128, 1);
              }
              & > .time {
                font-size: 22rpx;
                font-weight: 400;
                letter-spacing: 0rpx;
                color: rgba(128, 128, 128, 1);
              }
            }
          }
          & > .commentDes {
            padding-left: 6rpx;
            margin: 10rpx 0;
            font-size: 30rpx;
            color: rgba(0, 0, 0, 1);
          }
          & > .comment {
            width: 100%;
            padding: 30rpx 0;
            border-radius: 10rpx;
            background: rgba(229, 229, 229, 1);
            & > .postDes {
              padding-left: 30rpx;
              margin-top: 4rpx;
              // text-align: center;
              font-size: 22rpx;
              color: rgba(166, 166, 166, 1);
              max-width: 100%;
              white-space: nowrap;
              overflow: hidden; //文本超出隐藏
              text-overflow: ellipsis; //文本超出省略号替
            }
          }
        }
        & .circle_card {
          position: relative;
          padding: 40rpx 20rpx 40rpx 20rpx;
          width: 100%;
          border-radius: 20rpx;
          background: rgba(255, 255, 255, 0.85);
          & > .top {
            display: flex;
            justify-content: space-between;
            & > .lf {
              margin-left: 20rpx;
              display: flex;
              align-items: center;
              & > image {
                width: 70rpx;
                height: 70rpx;
                border-radius: 50%;
              }
              & > .topDes {
                margin-left: 12rpx;
                & > .name {
                  font-size: 26rpx;
                  font-weight: 500;
                  color: rgba(0, 0, 0, 1);
                }
                & > .time {
                  line-height: 40rpx;
                  height: 40rpx;
                  font-size: 22rpx;
                  font-weight: 500;
                  color: rgba(166, 166, 166, 1);
                }
              }
            }
          }
          & > .des {
            margin-top: 16rpx;
            & > .details {
              padding: 0 0 0 30rpx;
              font-size: 26rpx;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
            }
            & > .imgList {
              margin-top: 16rpx;
              display: flex;
              & image {
                width: 180rpx;
                height: 180rpx;
                &:not(:first-child) {
                  margin-left: 20rpx;
                }
              }
            }
          }
          & > .bottom {
            margin-top: 16rpx;
            display: flex;
            justify-content: space-between;
            & > .lf {
              & > .topic {
                padding: 2rpx 16rpx;
                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 40rpx;
                background-color: #fff;
                font-size: 30rpx;
                font-weight: 500;
                color: rgba(42, 130, 228, 1);
              }
            }
            & > .rg {
              display: flex;
              align-items: center;
              & .iconfont {
                color: rgba(166, 166, 166, 1);
              }
              & > .collect {
                & > .icon-shoucang,
                .icon-shoucang1 {
                  margin: 0 40rpx;
                }
              }
              & .isLike {
                color: rgba(42, 130, 228, 1);
              }
            }
          }
          &:not(:first-child) {
            margin-top: 20rpx;
          }
          &::after {
            content: '';
            position: absolute;
            background-color: rgba(204, 204, 204, 1);
            bottom: 0;
            left: -56rpx;
            width: 120%;
            height: 8rpx;
          }
        }
      }
    }
  }
}
</style>
