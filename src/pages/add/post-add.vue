<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-01 01:25:42
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-11 09:09:13
 * @FilePath: \bangbang\src\pages\add\post-add.vue
-->
<template>
  <div v-if="useUtils().isExamine">
    <BangNoData />
  </div>
  <div class="content" v-else>
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <!-- 导航栏 -->
    <uni-nav-bar
      background-color="transparent"
      :border="false"
      @clickLeft="back"
    >
      <template v-slot:left style="font-size: 44rpx; margin-left: 28rpx">
        ✖️
      </template>
    </uni-nav-bar>
    <div class="container post_add">
      <div class="title">动态内容</div>
      <div class="des">
        <uni-easyinput
          type="textarea"
          autoHeight
          v-model="iptVal"
          :maxlength="200"
          placeholder="这里太空了,说点什么吧"
          placeholderStyle="color:#999999;font-size:28rpx;"
        >
        </uni-easyinput>
        <div class="addFiles_wrapped">
          <div class="imgList">
            <div
              class="preImg"
              v-for="(item, index) in fileValue"
              :key="item.imgUrl"
              @click="preview(item, index)"
            >
              <image :src="item.imgUrl" alt="" mode="aspectFill" />
              <div class="del" @click="delFiles(index)">
                <uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
              </div>
            </div>
          </div>

          <div class="add" @click="addFiles" v-if="fileValue.length < 3">
            <div class="img">
              <image
                src="http://qjpqjp.top:9000/bang/photo/图片@2x.png"
                alt=""
                mode="aspectFit"
              />
            </div>
            <div class="video">
              <image
                src="http://qjpqjp.top:9000/bang/photo/视频@2x.png"
                alt=""
                mode="aspectFit"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="select">
        <div class="topic" @click="showBottomPop">
          <i
            class="iconfont icon-huati"
            style="font-size: 30rpx; margin-right: 4rpx"
          ></i
          >{{ topicName }}
        </div>

        <div class="location" @click="goMap">
          <i
            class="iconfont icon-weizhi"
            style="font-size: 30rpx; margin-right: 4rpx"
          ></i
          >{{
            userStore.location.address_reference?.landmark_l2.title ||
            userStore.location.name
          }}
        </div>
      </div>
      <div class="tips">
        帮帮友情提示:善语结善缘，恶言伤人心，请勿发布广告、引战、诋毁、盗用他人照片等违规内容，违规内容将会被封禁，严重违规者将会永久封禁账号。
      </div>
      <div class="bottom">
        <BangButton
          title="发布"
          top="50rpx"
          width="494rpx"
          height="64rpx"
          @btn-click="release"
        />
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
      <div class="topline"></div>
      <div class="title">选择话题</div>
      <div class="topic">
        <div
          class="topicItem"
          :style="randomStyle(index)"
          v-for="(item, index) in topicList"
          :key="index"
          @click="selectTopic(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </uni-popup>
</template>
<script lang="ts" setup>
import BangNav from '@/components/bangNav.vue'
import BangButton from '@/components/bangButton.vue'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'
import postService from '@/api/post'
import { useUtils } from '@/stores/utils'
interface ITopic {
  bc: string
  head: string
  id: string
  name: string
  tags: string
}
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
const userStore = useUserStore()
const postStore = usePostStore()
// 获取话题列表
const topicName = ref('日常')
postStore.getTopicList()
const topicList = computed(() => postStore.topicList)
const selectTopic = (item: ITopic) => {
  console.log(item.id)
  popup.value.close()
  topicName.value = item.name
  formData.topicId = item.id
}
const back = () => {
  uni.switchTab({ url: '/pages/index/bang-index' })
}
const iptVal = ref('')
// 图片回显列表

let fileValue = ref<ImediaList[]>([])
const delFiles = (index: number) => {
  fileValue.value.splice(index, 1)
}
const addFiles = () => {
  uni.chooseMedia({
    count: 3,
    mediaType: ['mix'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      uni.showLoading({
        title: '正在上传'
      })
      res.tempFiles.map((item) => {
        if (item.fileType === 'video') {
          const videoObj = {
            imgUrl: '',
            videoUrl: ''
          }
          formData.isVideo = 1
          uni.uploadFile({
            url: 'https://www.qjpqjp.top/bang/mo/upload',
            filePath: item.thumbTempFilePath,
            name: 'file',
            success: (uploadFileRes: any) => {
              uni.hideLoading()
              videoObj.imgUrl = JSON.parse(uploadFileRes.data).result.url
              uni.uploadFile({
                url: 'https://www.qjpqjp.top/bang/mo/upload',
                filePath: item.tempFilePath,
                name: 'file',
                success: (uploadFileRes: any) => {
                  uni.hideLoading()
                  //   fileValue.value.push(JSON.parse(uploadFileRes.data).result.url)
                  videoObj.videoUrl = JSON.parse(uploadFileRes.data).result.url
                  fileValue.value.push(videoObj)
                },
                fail: (e) => {
                  console.log(e)
                }
              })
            },
            fail: (e) => {
              console.log(e)
            }
          })
        } else {
          uni.uploadFile({
            url: 'https://www.qjpqjp.top/bang/mo/upload',
            filePath: item.tempFilePath,
            name: 'file',
            success: (uploadFileRes: any) => {
              uni.hideLoading()
              //   console.log(JSON.parse(uploadFileRes.data))
              fileValue.value.push({
                imgUrl: JSON.parse(uploadFileRes.data).result.url
              })
            },
            fail: (e) => {
              console.log(e)
            }
          })
        }
      })
    }
  })
}
const preview = (item: ImediaList, index: number) => {
  uni.previewMedia({
    current: index,
    // url: item.videoUrl || item.imgUrl, // 当前显示图片的 http 链接
    sources: fileValue.value.map((item) => {
      if (item.videoUrl) {
        return { url: item.videoUrl, type: 'video', poster: item.imgUrl }
      } else {
        return { url: item.imgUrl, type: 'image' }
      }
    }) // 需要预览的图片 http 链接列表
  })
}
const formData = reactive({
  isVideo: 0,
  location:
    userStore.location.address_reference?.landmark_l2.title ||
    userStore.location.name,
  topicId: '1653749793849102337'
})
function getMapLocation() {
  uni.chooseLocation({
    success: (res) => {
      console.log(res)
      userStore.location = res
      formData.location = res.name
    },
    fail: () => {
      // 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
      uni.getSetting({
        success: (res) => {
          console.log(res)
          var status = res.authSetting
          if (!status['scope.userLocation']) {
            // 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
            uni.showModal({
              title: '是否授权当前位置',
              content:
                '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
              success: (tip) => {
                if (tip.confirm) {
                  // 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
                  uni.openSetting({
                    success: (data) => {
                      // 如果用户授权了地理信息在，则提示授权成功
                      if (data.authSetting['scope.userLocation'] === true) {
                        uni.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        // 授权成功后，然后再次chooseLocation获取信息
                        uni.chooseLocation({
                          success: (res) => {
                            console.log('详细地址', res)
                            // this.getRegionFn(res);
                          }
                        })
                      } else {
                        uni.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: (res) => {
          uni.showToast({
            title: '调用授权窗口失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  })
}
const goMap = () => {
  getMapLocation()
}
const popup = ref()
const showBottomPop = () => {
  popup.value.open('bottom')
}
const release = async () => {
  if (!iptVal.value) return
  const { data } = await postService.addPost({
    isVideo: formData.isVideo,
    location: formData.location,
    text: iptVal.value,
    topicId: formData.topicId,
    urls: JSON.stringify(fileValue.value)
  })
  if (data.code !== 1) return
  await uni.showToast({
    icon: 'success',
    title: '发布成功'
  })
  setTimeout(() => {
    back()
  }, 1000)
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function getRandomColor() {
  const red = getRandomInt(160, 255)
  const green = getRandomInt(220, 255)
  const blue = getRandomInt(210, 255)
  return `rgb(${red},${green},${blue})`
}
const randomStyle = computed(() => (index: number) => {
  const rand = getRandomInt(60, 93)
  return {
    width: `${rand}px`,
    height: `${rand}px`,
    backgroundColor: getRandomColor(),
    margin: `${getRandomInt(2, 5)}px ${getRandomInt(3, 8)}px`
  }
})
</script>
<style lang="scss">
.container {
  & > .title {
    margin-top: 38rpx;
    font-size: 33rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  & > .des {
    margin-top: 16rpx;
    & ::v-deep textarea {
      height: 360rpx !important;
      font-size: 30rpx;
    }
    & > .addFiles_wrapped {
      margin-top: 40rpx;
      //   padding: 20rpx;
      width: 100%;
      //   display: flex;
      & .preImg {
        position: relative;
        width: 200rpx;
        height: 200rpx;
        margin: 0 12rpx;
        & > image {
          width: 100%;
          height: 100%;
        }
        & > .del {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          right: -20rpx;
          top: -20rpx;
          background-color: #2979ff;
          border-radius: 50%;
          color: #f1f1f1;
        }
      }
      & > .add {
        display: flex;
        margin-top: 24rpx;
        .img,
        .video {
          width: 64rpx;
          height: 64rpx;
          background-color: rgba(42, 130, 228, 1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          & > image {
            width: 40rpx;
            height: 40rpx;
          }
        }
        .video {
          margin-left: 12rpx;
        }
      }
      .imgList {
        display: flex;
      }
    }
  }
  & > .select {
    margin-top: 30rpx;
    display: flex;
    .topic,
    .location {
      align-items: center;
      font-size: 28rpx;
      color: #fff;
      padding: 6rpx 30rpx;
      border-radius: 40rpx;
      display: flex;
      background-color: rgba(42, 130, 228, 1);
    }
    & > .location {
      margin-left: 36rpx;
    }
  }
  & > .tips {
    margin-top: 32rpx;
    font-size: 26rpx;
    letter-spacing: 2rpx;
    color: rgba(128, 128, 128, 1);
  }
}
.pop {
  // height: 580rpx;
  padding: 32rpx 52rpx 0 52rpx;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  & > .topline {
    width: 100rpx;
    height: 8rpx;
    opacity: 1;
    border-radius: 40rpx;
    background: rgba(204, 204, 204, 1);
    margin: 0 auto;
  }
  & > .title {
    margin-top: 6rpx;
    font-size: 30rpx;
    color: rgba(0, 0, 0, 1);
  }
  & > .topic {
    padding: 50rpx 50rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    & > .topicItem {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 30rpx;
      color: rgba(0, 0, 0, 1);
    }
  }
}
.uni-popup.bottom view {
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
}
</style>
