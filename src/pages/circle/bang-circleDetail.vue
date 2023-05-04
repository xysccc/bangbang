<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-30 18:15:32
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-04 21:25:54
 * @FilePath: \bangbang\src\pages\circle\bang-circleDetail.vue
-->
<template>
  <div class="bang-circleDetails">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="评论" />
    <div class="container circleMainDetail">
      <div class="circle_card">
        <div class="top">
          <div class="lf">
            <img
              :src="post?.head"
              alt=""
              @click="goTo(`/pages/my/my-space/my-space?id=${post.userId}`)"
            />
            <div class="topDes">
              <div class="name">{{ post?.username }}</div>
              <div class="time">{{ post?.releaseTime }}发布</div>
            </div>
          </div>
          <!-- <div class="rg" style="font-size: 40rpx">🥶</div> -->
        </div>
        <div class="des">
          <div class="details">
            {{ post?.text }}
          </div>
          <div class="imgList">
            <template
              v-for="(item, index) in JSON.parse(post?.urls || '{}')"
              :key="index"
            >
              <image
                :src="item.imgUrl"
                alt=""
                mode="aspectFill"
                @click.stop="preview(item, index)"
              />
            </template>
          </div>
        </div>
        <div class="bottom">
          <div class="lf">
            <div class="topic">
              <i class="iconfont icon-huati" style="font-size: 35rpx"></i>
              {{ post?.topicName
              }}<uni-icons
                type="forward"
                size="14"
                color="rgba(42, 130, 228, 1)"
              ></uni-icons>
            </div>
            <div class="location">
              <i
                class="iconfont icon-weizhi"
                style="font-size: 30rpx; margin-right: 4rpx"
              ></i>
              {{ post?.location }}
            </div>
          </div>
          <div class="rg">
            <div
              class="like"
              @click="like(post)"
              :class="{ isLike: post?.like }"
            >
              <i
                class="iconfont icon-dianzan"
                style="font-size: 32rpx"
                :class="{ isLike: post?.like }"
              ></i>
              {{ post?.likeNum }}
            </div>
            <div class="collect" @click="collect(post)">
              <i
                class="iconfont icon-shoucang"
                style="font-size: 35rpx"
                v-if="!post?.collect"
              ></i>
              <i
                class="iconfont icon-shoucang1"
                style="font-size: 35rpx; color: #f4ea2a"
                v-else
              ></i>
            </div>
            <div class="comment" @click="comment">
              <i class="iconfont icon-pinglun" style="font-size: 35rpx"></i>评论
            </div>
            <div class="browse">
              <i class="iconfont icon-liulan" style="font-size: 35rpx"></i>
              {{ post?.browse }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 普通弹窗 -->
  <uni-popup
    ref="popup"
    background-color="#fff"
    mask-background-color="transparent"
  >
    <div class="pop">
      <div class="popTop">
        <div class="topline"></div>
        <div class="title">{{ postComment?.total }}评论</div>
        <scroll-view
          class="commentPop"
          scroll-y="true"
          lower-threshold="5"
          @scrolltolower="handleScroll"
        >
          <div class="commentItemWrapped">
            <div
              class="commentItem"
              v-for="(item, index) in pushArr"
              :key="index"
            >
              <div class="lf">
                <div class="commentImg">
                  <image mode="aspectFill" :src="item.head" />
                </div>
                <div class="commentInfo">
                  <div class="username">{{ item.username }}</div>
                  <div class="des">
                    {{ item.text }}
                  </div>
                  <div class="time">{{ item.commentTime }}</div>
                </div>
              </div>
              <div class="rg">
                <div
                  class="like"
                  @click="commentLike(item)"
                  :class="{ isLike: item?.like }"
                >
                  <i
                    class="iconfont icon-dianzan"
                    style="font-size: 32rpx; margin-right: 10rpx"
                    :class="{ isLike: item?.like }"
                  ></i>
                  {{ item.likeNum }}
                </div>
              </div>
            </div>
          </div>
          <uni-load-more
            :status="status"
            v-if="postComment?.records.length >= 6"
          ></uni-load-more>
        </scroll-view>
      </div>
      <div class="commentMain">
        <div class="iptWrapped">
          <input
            type="text"
            class="commentIpt"
            placeholder="善语结善缘，恶言伤人心"
            v-model="iptVal"
          />
        </div>
        <div class="send" :class="{ haveSend: iptVal }" @click="sendComment">
          <uni-icons
            type="arrow-up"
            size="30"
            color="rgba(255, 255, 255, 1)"
          ></uni-icons>
        </div>
      </div>
    </div>
  </uni-popup>
</template>
<script lang="ts" setup>
import postService from '@/api/post'
import BangNav from '@/components/bangNav.vue'
import { usePostStore } from '@/stores/post'
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
const postStore = usePostStore()
const postId = ref('')
const post = computed(() => postStore.post)
const postComment = computed(() => postStore.postComment)
const popup = ref()
let pageOptions = {
  page: 1,
  pageSize: 6
}
let pushArr = reactive<any>([])
onLoad(async (option: any) => {
  postId.value = option.id
  console.log(option.id)
  await postStore.getPostOne({ postId: postId.value })
  await postStore.getPostComment({ postId: postId.value, ...pageOptions })
  pushArr.push(...postComment.value.records)
})
onMounted(() => {
  popup.value?.open('bottom')
})

const preview = (item: ImediaList, index: number) => {
  // const urls = post.value?.urls
  // const files = urls ? JSON.parse(urls) : []
  const files = JSON.parse(post.value?.urls)
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

const comment = () => {
  popup.value.open('bottom')
}
const sendComment = async () => {
  pageOptions.page = 1
  if (!iptVal.value) return
  const { data } = await postService.postComment({
    postId: postId.value,
    text: iptVal.value
  })
  iptVal.value = ''
  pushArr.length = 0
  await postStore.getPostComment({ postId: postId.value, ...pageOptions })
  pushArr.push(...postComment.value.records)
}
const status = ref('more')
const iptVal = ref('')
const getList = () => {
  return postStore.getPostComment({
    postId: postId.value,
    ...pageOptions
  })
}
const handleScroll = async (e: any) => {
  if (postComment.value.total > pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    pushArr.push(...postComment.value.records)
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
const commentLike = async (item: any) => {
  item.like = !item.like
  item.like ? item.likeNum++ : item.likeNum--
  await postService.postCommentLike({ postCommentId: item.id })
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
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.circleMainDetail {
  margin-top: 24rpx;
  height: 1220rpx;
  // background-color: red;
  overflow-y: auto;
  & .scroll_wrapped {
    padding-bottom: 100rpx;
  }
  & .circle_card {
    padding: 30rpx 20rpx 30rpx 20rpx;
    width: 100%;
    border-radius: 20rpx;

    & > .top {
      display: flex;
      justify-content: space-between;
      & > .lf {
        // margin-left: 20rpx;
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
        // padding: 0 0 0 30rpx;
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
      // display: flex;
      // justify-content: space-between;
      & > .lf {
        margin: 20rpx 0;
        display: flex;
        & > .topic,
        .location {
          padding: 2rpx 18rpx;
          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 40rpx;
          background-color: #fff;
          font-size: 30rpx;
          font-weight: 500;
          color: rgba(42, 130, 228, 1);
        }
        & > .location {
          margin-left: 20rpx;
        }
      }
      & > .rg {
        // margin-top: 20rpx;
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

        & > .comment,
        .like,
        .browse {
          display: flex;
          font-size: 28rpx;
          color: rgb(166, 166, 166);
        }
        & > .browse {
          margin-left: 40rpx;
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
  }
  & .isLike {
    color: rgba(42, 130, 228, 1) !important;
  }
}
.pop {
  // height: 580rpx;
  // padding: 32rpx 52rpx 0 52rpx;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  & > .popTop {
    padding: 32rpx 52rpx 0 52rpx;
    & > .topline {
      width: 100rpx;
      height: 8rpx;
      opacity: 1;
      border-radius: 40rpx;
      background: rgba(204, 204, 204, 1);
      margin: 0 auto;
    }
    & > .title {
      margin-top: 20rpx;
      font-size: 36rpx;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    & > .commentPop {
      height: 650rpx;
      overflow-y: auto;
      & .commentItemWrapped {
        padding-bottom: 5px;
        & > .commentItem {
          padding: 10rpx 15rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > .lf {
            display: flex;
            & > .commentImg {
              width: 64rpx;
              height: 64rpx;
              & > image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            & > .commentInfo {
              margin-left: 20rpx;
              width: 480rpx;
              & > .username {
                font-size: 30rpx;
                font-weight: 500;

                color: rgba(128, 128, 128, 1);
              }
              & > .des {
                margin: 6rpx 0;
                font-size: 26rpx;
                color: rgba(35, 42, 53, 1);
              }
              & > .time {
                font-size: 24rpx;
                font-weight: 500;
                color: rgba(166, 166, 166, 1);
              }
            }
          }
          & > .rg {
            & > .like {
              display: flex;
              align-items: center;
            }
          }
          &:not(:first-child) {
            margin-top: 30rpx;
          }
        }
      }
    }
  }
  & > .commentMain {
    padding: 0 40rpx 0 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-top-left-radius: 0 !important;
    // border-top-right-radius: 0 !important;
    position: relative;
    bottom: 0;
    height: 120rpx;
    background-color: #fff;
    box-shadow: 0rpx -32rpx 32rpx -32rpx rgba(42, 130, 228, 1);
    backdrop-filter: blur(8rpx);
    & > .iptWrapped {
      flex: 1;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      & > .commentIpt {
        padding-left: 40rpx;
        border-radius: 40rpx;
        width: 90%;
        height: 90%;
        background-color: rgba(229, 229, 229, 1);
      }
    }
    & > .send {
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
  & .isLike {
    color: rgba(42, 130, 228, 1) !important;
  }
}

::v-deep .uni-popup.bottom view {
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
}
</style>
