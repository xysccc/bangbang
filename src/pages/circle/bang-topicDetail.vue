<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-03 00:38:02
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-05 18:48:17
 * @FilePath: \bangbang\src\pages\circle\bang-topicDetail.vue
-->
<template>
  <scroll-view
    class="bang-topicDetail"
    scroll-y="true"
    lower-threshold="5"
    @scrolltolower="handleScroll"
  >
    <div class="TopicDetailtop">
      <image class="blur" :src="topicOne?.bc"></image>
      <!-- 顶部状态栏占位 -->
      <div class="bang-nav"></div>
      <BangNav />
      <div class="container">
        <div class="topicTop">
          <div class="lf">
            <image mode="aspectFill" :src="topicOne?.head" />
          </div>
          <div class="rg">
            <div class="title">{{ topicOne?.name }}</div>
            <div class="personNum">{{ topicOne.joinNum }} 个圈友</div>
            <div class="postNum">{{ topicOne?.num }}条帖子</div>
          </div>
        </div>
        <div class="topicDes">{{ topicOne?.tags }}</div>
      </div>
    </div>
    <div class="infoTop">
      <div class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="rgba(0, 0, 0, 1)"
          @clickItem="onClickItem"
        />
      </div>
      <div class="postMain">
        <div
          class="circle_card"
          v-for="(item, index) in pushArr"
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
                <i class="iconfont icon-pinglun" style="font-size: 35rpx"></i>
              </div>
            </div>
          </div>
        </div>
        <uni-load-more
          :status="status"
          v-if="pushArr.length >= 3"
        ></uni-load-more>
        <BangNoData v-show="pushArr.length === 0" />
      </div>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
import postService from '@/api/post'
import BangNav from '@/components/bangNav.vue'
import { usePostStore } from '@/stores/post'
import BangNoData from '@/components/bangNoData.vue'
type cI = {
  currentIndex: number
}
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
const items = ['新帖', '热门']
const current = ref(0)
const status = ref('more')
const postStore = usePostStore()
postStore.postList = []
let pushArr = reactive<any>([])
let postList = computed(() => postStore.postList)

const topicId = ref('')
let pageOptions = {
  page: 1,
  pageSize: 3
}
let topicOne = ref({})
onLoad(async (option: any) => {
  topicId.value = option.id
  await postStore.getTopicNew({ ...pageOptions, topicId: topicId.value })
  pushArr.push(...postList.value.records)
  await postStore.getTopicList()
  topicOne.value = postStore.topicList.find((item) => item.id === topicId.value)
})
const onClickItem = async (e: cI) => {
  pageOptions.page = 1
  pushArr = reactive([])
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  await getList()
  pushArr.push(...postList.value.records)
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
const getList = () => {
  switch (current.value) {
    case 0:
      return postStore.getTopicNew({ ...pageOptions, topicId: topicId.value })
      break
    case 1:
      return postStore.getTopicHot({ ...pageOptions, topicId: topicId.value })
      break
    default:
      break
  }
}
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const preview = (item: ImediaList, index: number) => {
  const files = computed(() => JSON.parse(postList.value.records[index].urls))
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
const like = async (item: any) => {
  item.like = !item.like
  item.like ? item.likeNum++ : item.likeNum--
  await postService.postLike({ postId: item.id })
}
const collect = async (item: any) => {
  item.collect = !item.collect
  await postService.postCollect({ postId: item.id })
}
</script>

<style scoped lang="scss">
.bang-topicDetail {
  height: 100vh;
  & .TopicDetailtop {
    // padding-top: 156rpx;
    width: 100%;
    height: 432rpx;
    position: relative;
    & > .blur {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 432rpx;
      filter: blur(7rpx);
    }
    & > .container {
      & > .topicTop {
        margin-top: 35rpx;
        display: flex;
        & > .lf {
          width: 142rpx;
          height: 142rpx;
          & image {
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
          }
        }
        & > .rg {
          margin-left: 48rpx;
          & > .title {
            font-size: 40rpx;
            font-weight: 500;
            letter-spacing: 0rpx;
            line-height: 40rpx;
            color: rgba(255, 255, 255, 1);
            text-align: left;
            vertical-align: top;
          }
          & > .personNum {
            margin-top: 10rpx;
            font-size: 24rpx;
            font-weight: 500;

            color: rgba(255, 255, 255, 1);
          }
          & > .postNum {
            font-size: 24rpx;
            font-weight: 500;

            color: rgba(255, 255, 255, 1);
          }
        }
      }
      & > .topicDes {
        margin: 16rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}

.infoTop {
  position: relative;
  padding: 0 50rpx;
  margin-top: -30rpx;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  & > .tab {
    width: 55%;
    &::v-deep .segmented-control__text {
      color: rgba(128, 128, 128, 1) !important;
      font-size: 15px !important;
      font-weight: 500;
    }
    &::v-deep .segmented-control__item--text {
      color: rgba(0, 0, 0, 1) !important;
    }
  }
  & > .postMain {
    margin-top: 10px;
    & > .circle_card {
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
        left: -28px;
        width: 120%;
        height: 8rpx;
      }
    }
  }
}
</style>
