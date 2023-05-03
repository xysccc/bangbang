<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-02 18:00:20
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-03 00:51:30
 * @FilePath: \bangbang\src\pages\my\my-space\my-space.vue
-->
<template>
  <scroll-view
    class="my-space"
    scroll-y="true"
    lower-threshold="5"
    @scrolltolower="handleScroll"
  >
    <div class="top">
      <!-- 顶部状态栏占位 -->
      <div class="bang-nav"></div>
      <BangNav />
    </div>

    <div class="main">
      <div class="infoTop">
        <div class="userTop">
          <div class="lf">
            <image mode="aspectFill" :src="info.head" />
          </div>
          <div class="rg">
            <div class="message">私信</div>
            <div class="follow">关注</div>
          </div>
        </div>
        <div class="username">
          {{ info.username }}
          <i class="iconfont icon-nan" style="font-size: 35rpx"></i>
        </div>
        <div class="signature">
          {{ info.signature }}
        </div>
        <div class="userBottom">
          <div class="nice">{{ info.nice }}&nbsp;获赞</div>
          <div class="follow">{{ info.follow }}&nbsp;关注</div>
          <div class="fans">{{ info.fans }}&nbsp;粉丝</div>
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
            <div class="title">话题5</div>
            <scroll-view class="topicListWrapped" scroll-x="true">
              <div class="topicItemWrapped">
                <div class="topicItem" v-for="(item, index) in 7" :key="index">
                  <image
                    src="https://img.js.design/assets/smartFill/img402164da755928.jpg"
                    mode="aspectFill"
                  />
                  美食
                </div>
              </div>
            </scroll-view>
          </div>
          <div class="postMain">
            <!-- <div
              class="circle_card"
              v-for="(item, index) in postList.records"
              :key="index"
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
                <div class="imgList" v-if="JSON.parse(item.urls).length">
                  <image
                    :src="item1.imgUrl"
                    alt=""
                    mode="aspectFill"
                    v-for="(item1, index) in JSON.parse(item.urls)"
                    @click.stop="preview(item, index)"
                  />
                </div>
              </div>
              <div class="bottom">
                <div class="lf">
                  <div class="topic">
                    <i class="iconfont icon-huati" style="font-size: 35rpx"></i>
                    {{ item.topicName
                    }}<uni-icons
                      type="forward"
                      size="14"
                      color="rgba(42, 130, 228, 1)"
                    ></uni-icons>
                  </div>
                </div>
                <div class="rg">
                  <div class="like">
                    <i
                      class="iconfont icon-dianzan"
                      style="font-size: 32rpx"
                      :class="{ isLike: item.like }"
                      >{{ item.likeNum }}</i
                    >
                  </div>
                  <div class="collect">
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
            </div> -->
            <uni-load-more
              :status="status"
              v-if="postList.records.length >= 3"
            ></uni-load-more>
          </div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
import userService from '@/api/user'
import BangNav from '@/components/bangNav.vue'
import { usePostStore } from '@/stores/post'
import { useUserStore } from '@/stores/user'
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

const isOwn = ref(false)
const id = ref('')
let postList = postStore.postList
onLoad(async (option: any) => {
  id.value = option.id
  if (option.id === userStore.userInfo.id) {
    isOwn.value = true
    await getOwnInfo()
    await postStore.getOwn(pageOptions)
  } else {
    isOwn.value = false
    await getOtherInfo(option.id)
    await postStore.getOwn({ ...pageOptions, openid: option.id })
  }
})
let pageOptions = {
  page: 1,
  pageSize: 3
}

const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const items = ['动态', '评论', '收藏']
const current = ref(0)
const onClickItem = async (e: cI) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
const preview = (item: ImediaList, index: number) => {
  const files = computed(() => JSON.parse(postList.records[index].urls))
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
const status = ref('more')
const getList = () => {
  switch (current.value) {
    case 0:
      if (isOwn.value) {
        return postStore.getOwn(pageOptions)
      } else {
        return postStore.getOwn({ ...pageOptions, openid: id.value })
      }
      break
    case 1:
      break
    case 2:
      return postStore.getRecommendedTopicList(pageOptions)
      break

    default:
      break
  }
}
const handleScroll = async (e: any) => {
  if (postList.total >= pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    postList.records.push(...toRaw(postStore.postList.records))
    postList.total = postStore.postList.total
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
</script>

<style scoped lang="scss">
.my-space {
  height: 100vh;
}
.top {
  // padding-top: 156rpx;
  width: 100%;
  height: 432rpx;
  background: url('http://qjpqjp.top:9000/bang/photo/bg.png') no-repeat center
    center;
  background-size: cover;
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
        .follow {
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
        & > .noFollow {
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
      & > .icon-nan {
        color: rgba(42, 130, 228, 1);
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
        border-radius: 12px;
        background: rgba(229, 229, 229, 0);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        & > .title {
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
        & .circle_card {
          padding: 30rpx 20rpx 30rpx 20rpx;
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
              & > .islike {
                color: rgba(42, 130, 228, 1);
              }
            }
          }
          &:not(:first-child) {
            margin-top: 20rpx;
          }
        }
      }
    }
  }
}
</style>
