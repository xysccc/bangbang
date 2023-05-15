<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-13 09:46:02
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-15 08:50:30
 * @FilePath: \bangbang\src\pages\circle\bang-circle.vue
-->
<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div class="bang-circle">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <!-- 导航栏 -->
    <uni-nav-bar background-color="transparent" :border="false">
      <div class="search">
        <uni-search-bar
          v-model="iptVal"
          @input="iptChange"
          cancelButton="none"
          placeholder="请输入标题搜索"
        ></uni-search-bar>
      </div>
      <template v-slot:left><div class="topTitle">帮友圈</div></template>
    </uni-nav-bar>
    <div class="content">
      <div class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="rgba(24, 123, 237, 1)"
          @clickItem="onClickItem"
        />
      </div>
      <scroll-view
        class="container circleMain"
        scroll-y="true"
        v-if="current === 0"
      >
        <div class="scroll_wrapped">
          <div
            class="topicItem"
            v-for="(item, index) in topic"
            :key="index"
            @click="
              goToTopicDetail(
                `/pages/circle/bang-topicDetail?id=${item.id}`,
                item
              )
            "
          >
            <div class="lf">
              <div class="topicImg">
                <image mode="aspectFill" :src="item.head"></image>
              </div>
              <div class="des">
                <div class="title">{{ item.name }}</div>
                <div class="num">{{ item.num }}条</div>
              </div>
            </div>
            <div class="rg">
              <div class="add" @click.stop="addTopic(item.id)">
                {{ item.join ? '已加入' : '+加入话题' }}
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
      <scroll-view
        class="container circleMain"
        scroll-y="true"
        lower-threshold="5"
        @scrolltolower="handleScroll"
        v-else
      >
        <div class="scroll_wrapped">
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
              <!-- <div class="rg" style="font-size: 40rpx">🥶</div> -->
            </div>
            <div class="des">
              <div class="details">
                {{ item.text }}
              </div>
              <div class="imgList" v-if="JSON.parse(item.urls).length">
                <image
                  :src="item1.imgUrl"
                  alt=""
                  mode="aspectFit"
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
                  @click.stop="
                    goTo(`/pages/circle/bang-topicDetail?id=${item.topicId}`)
                  "
                >
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
                    v-if="!item.collect"
                    style="font-size: 35rpx"
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
      </scroll-view>
    </div>
  </div>
  <BangTab :selected="1"></BangTab>
</template>

<script lang="ts" setup>
import postService from '@/api/post'
import BangTab from '@/components/bangTab.vue'
import { usePostStore } from '@/stores/post'
import MyInfoSet from '../my/myInfoSet/myInfoSet.vue'
import BangNoData from '@/components/bangNoData.vue'
import { useUtils } from '@/stores/utils'
import bangAudit from '@/components/bangAudit.vue'
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
type cI = {
  currentIndex: number
}
const postStore = usePostStore()
postStore.followParam = reactive({
  lastId: 0,
  offset: 0
})
let postList = computed(() => postStore.postList)
const lastId = postStore.followParam.lastId
const offset = postStore.followParam.offset
let topic = computed(() => postStore.topicList)

const iptVal = ref('')
const current = ref(2)
const items = ['🗨️话题', '关注', '推荐', '图文']
let pushArr = reactive<any>([])
const status = ref('more')
let pageOptions = {
  page: 1,
  pageSize: 3
}

onShow(async () => {
  pageOptions.page = 1
  pushArr.splice(0, pushArr.length)
  await postStore.getRecommendedList(pageOptions)

  pushArr.push(...postList.value.records)
  console.log(pushArr)
})
const iptChange = (e: string) => {
  iptVal.value = e
}

const onClickItem = async (e: cI) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  pushArr = reactive([])
  pageOptions = {
    page: 1,
    pageSize: 3
  }
  await getList()
  postList.value.records && pushArr.push(...postList.value.records)
}
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
      return postStore.getTopicList()
      break
    case 1:
      return postStore.getFollow({
        lastId: new Date().getTime(),
        ...(offset && { offset: offset }),
        pageSize: 3
      })
      break
    case 2:
      return postStore.getRecommendedList(pageOptions)
      break
    case 3:
      return postStore.getImgText(pageOptions)
      break

    default:
      break
  }
}

const handleScroll = async (e: any) => {
  if (postList.value.total >= pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    pushArr.push(...postList.value.records)
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const goToTopicDetail = (url: string, item: any) => {
  postStore.topicOne = item
  uni.navigateTo({
    url
  })
}
const addTopic = async (id: string) => {
  await postService.topicFollow({ topicId: id })
  await postStore.getTopicList()
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
.search {
  &::v-deep .uni-searchbar__box {
    width: 372rpx;
    height: 48rpx;
    background-color: #fff !important;
    border-radius: 40rpx !important;
  }
}
.topTitle {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38rpx;
  font-weight: 700;
  line-height: 55.02rpx;
  color: rgba(255, 255, 255, 1);
}
.content {
  & > .circleMain {
    margin-top: 24rpx;
    height: 1250rpx;
    // background-color: red;
    overflow-y: auto;
    & .scroll_wrapped {
      padding-bottom: 100rpx;
    }
    & .circle_card {
      padding: 30rpx 20rpx 30rpx 20rpx;
      width: 100%;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 1);
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
        margin: 25rpx 0;
        & > .details {
          padding: 0 0 0 30rpx;
          font-size: 26rpx;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        & > .imgList {
          margin-top: 30rpx;
          display: flex;
          & image {
            padding: 10px;
            flex: 1;
            width: 180rpx;
            // height: 250rpx;
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
            & .isCollect {
              color: #f4ea2a;
            }
          }
          & > .like {
            & .isLike {
              color: rgba(42, 130, 228, 1);
            }
          }
        }
      }
      &:not(:first-child) {
        margin-top: 20rpx;
      }
    }
    & .topicItem {
      padding: 10 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .lf {
        display: flex;
        .topicImg {
          width: 190rpx;
          height: 116rpx;
          & > image {
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
          }
        }
        .des {
          margin-left: 10rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          & > .title {
            font-size: 30rpx;
            color: rgba(0, 0, 0, 1);
          }
          & > .num {
            font-size: 30rpx;
            color: rgba(166, 166, 166, 1);
          }
        }
      }
      & > .rg {
        & > .add {
          padding: 6rpx 24rpx;
          border-radius: 40rpx;
          background-color: rgba(42, 130, 228, 1);
          font-size: 26rpx;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
      &:not(:first-child) {
        margin-top: 24px;
      }
      &:first-child {
        margin-top: 15px;
      }
    }
  }
}
</style>
