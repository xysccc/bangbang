<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div class="bang-taskDetail" v-else>
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="任务详情" />
    <div class="container">
      <div class="bang_card">
        <div class="top">
          <div class="lf">
            <div class="type">[{{ task?.type }}类]</div>
            <div class="title">{{ task?.title }}</div>
          </div>

          <div class="rg" style="display: flex; align-items: center">
            <div
              class="urgent"
              v-if="task?.urgent === 1"
              style="margin-right: 14rpx; font-size: 36rpx"
            >
              <i class="iconfont icon-VIP" style="color: #99a4b3"></i>
            </div>
            <div class="collect">
              <i
                class="iconfont icon-shoucang"
                @click="collect"
                v-if="task?.isCollect === 0"
                style="font-size: 36rpx"
              ></i>
              <i
                class="iconfont icon-shoucang1"
                style="color: #2a82e4; font-size: 36rpx"
                v-else
                @click="collect"
              ></i>
            </div>
          </div>
        </div>
        <div class="des">
          <div class="tx">
            <img :src="task?.fromHead" alt="" />
          </div>
          <div class="content">
            {{ task?.details }}
          </div>
        </div>
        <div class="bottom">
          <div class="location">
            <i
              class="iconfont icon-weizhi-copy-copy"
              style="border-right: none"
            ></i>
            <div class="locText">{{ task?.location }}</div>
          </div>
          <div class="time">
            剩余时间： {{ changeDate(task?.limitTime).dayDiff }}天{{
              changeDate(task?.limitTime).hourDiff
            }}小时
          </div>
          <div class="money">赏金：¥{{ task?.money }}</div>
        </div>
      </div>
      <div class="release_person">
        <label class="lab">发布人</label>
        <div class="release_person_box">
          <div class="lf">
            <img :src="task?.fromHead" alt="" />
            <div class="name">{{ task?.fromName }}</div>
          </div>
          <i
            class="message iconfont icon-xinxi"
            @click="goTo(`/pages/message/message-details?id=${task.fromId}`)"
          ></i>
        </div>
      </div>
      <div class="task_detail">
        <label class="lab">任务详情</label>
        <div class="detail">
          {{ task?.details }}
        </div>
      </div>
      <div class="task_loc">
        <label class="lab">发布地点</label>
        <div class="location">
          <i class="loc iconfont icon-weizhi-copy-copy"></i>
          <span>{{ task?.location }}</span>
        </div>
      </div>
      <div
        class="task_complate"
        v-if="JSON.parse(task?.fromUrls[0] || '[]').length"
      >
        <label class="lab">图片说明</label>
        <div
          class="complate"
          v-for="(item, index) in JSON.parse(task?.fromUrls[0] || '[]')"
          :key="item.id"
        >
          <image
            :src="item.imgUrl"
            alt=""
            mode="aspectFill"
            @click.stop="preview(item, index, task.fromUrls[0])"
          />
        </div>
      </div>
      <div v-else style="height: 50px"></div>
      <div class="task_complate" v-if="task?.state === 3">
        <label class="lab">完成图片说明</label>
        <div
          class="complate"
          v-for="(item, index) in JSON.parse(task?.toUrls[0])"
          :key="item.id"
        >
          <image
            :src="item.imgUrl"
            mode="aspectFill"
            @click.stop="preview(item, index, task.toUrls[0])"
          />
        </div>
      </div>
      <div class="task_upload" v-if="task?.state === 2">
        <label class="lab">完成任务上传</label>
        <div class="addFiles_wrapped">
          <div
            class="preImg"
            v-for="(item, index) in fileValue"
            :key="index"
            @click.stop="preview(item, index)"
          >
            <image :src="item.imgUrl" alt="" mode="aspectFill" />
            <div class="del" @click="delFiles(index)">✖</div>
          </div>

          <div class="add" @click="addFiles" v-if="fileValue.length < 3">+</div>
        </div>
      </div>

      <div class="bottom">
        {{}}
        <BangButton
          title="报名帮忙"
          top="50rpx"
          @btn-click="bang"
          v-if="task?.state === 1"
        />
        <BangButton
          title="完成任务"
          top="50rpx"
          @btn-click="complate"
          v-if="task?.state === 2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { changeDate } from '@/utils/date'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useTaskStore } from '@/stores/task'
import taskService from '@/api/task'
import { useUserStore } from '@/stores/user'
import { useUtils } from '@/stores/utils'
import bangAudit from '@/components/bangAudit.vue'
interface Ioption {
  id: string
}
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
const userStore = useUserStore()
const taskId = ref('')
const task = ref()
const taskStore = useTaskStore()
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
const preview = (
  item: ImediaList,
  index: number,
  str = JSON.stringify(fileValue.value)
) => {
  console.log(str)
  const files = computed(() => JSON.parse(str))
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
onLoad(async (option: any) => {
  taskId.value = option.id
  await taskStore.getTaskOne({ taskId: option.id })
  task.value = taskStore.task
})
const collect = async () => {
  await taskService.TaskCollection({ taskId: taskId.value })
  await taskStore.getTaskOne({ taskId: taskId.value })
  task.value = taskStore.task
}
const bang = async () => {
  const { data } = await taskService.TaskAccept({ taskId: taskId.value })
  if (data.code !== 1) return
  uni.showToast({
    title: '接单成功',
    icon: 'success'
  })
  uni.navigateBack()
}
const complate = async () => {
  const { data } = await taskService.TaskComplete({
    taskId: taskId.value,
    urls: [JSON.stringify(fileValue.value)]
  })
  if (data.code !== 1) return
  uni.showToast({
    title: '完成任务',
    icon: 'success'
  })
  uni.navigateBack()
}

const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.container {
  padding-top: 40rpx;
  width: 650rpx;
  margin: 0 auto;
  & > .bang_card {
    padding: 0 30rpx;
    padding-top: 18rpx;
    border-radius: 20rpx;
    width: 100%;
    height: 246rpx;
    background-color: #fff;
    & > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .lf {
        display: flex;
        & > .type {
          font-size: 30rpx;
          font-weight: 400;
          color: rgba(166, 166, 166, 1);
        }
        & > .title {
          margin-left: 28rpx;
          font-size: 28rpx;
          display: flex;
          color: rgba(0, 0, 0, 1);
        }
      }
      & > .rg {
        display: flex;
      }
    }
    & > .des {
      display: flex;
      align-items: center;
      margin-top: 27rpx;

      & > .tx {
        width: 86rpx;
        height: 86rpx;
        & image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      & > .content {
        margin-left: 20rpx;
        flex: 1;
        font-size: 26rpx;
        color: rgba(0, 0, 0, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /*第几行出现省略号*/
        -webkit-box-orient: vertical;
      }
    }
    & > .bottom {
      height: 40rpx;
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      & > .location {
        display: flex;
        font-size: 24rpx;
        color: rgba(166, 166, 166, 1);

        & .locText {
          font-size: 24rpx;
          width: 180rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          // white-space: nowrap;
          -webkit-line-clamp: 1; /*第几行出现省略号*/
          -webkit-box-orient: vertical;
        }
      }
      & > .time {
        padding: 0 10rpx 0 4rpx;
        font-size: 24rpx;
        max-width: 288rpx;
        white-space: nowrap;
        overflow: hidden; //文本超出隐藏
        text-overflow: ellipsis; //文本超出省略号替
      }
      & > .money {
        font-size: 24rpx;
        color: rgba(166, 166, 166, 1);
      }
      & view:not(:last-child) {
        border-right: 2rpx solid #ccc;
      }
    }
  }
  & > .release_person {
    margin-top: 34rpx;
    display: flex;
    align-items: center;
    height: 130rpx;
    width: 100%;
    & > .release_person_box {
      margin-left: 34rpx;
      padding: 26rpx 34rpx;
      background-color: #fff;
      display: flex;
      border-radius: 20rpx;
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      height: 124rpx;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      & image {
        width: 76rpx;
        height: 76rpx;
        object-fit: cover;
        border-radius: 50%;
      }
      & > .lf {
        display: flex;
        align-items: center;
        & > .name {
          margin-left: 20rpx;
        }
      }
      & > .message {
        font-size: 40rpx;
      }
    }
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
  }
  & > .task_detail {
    display: flex;
    margin-top: 34rpx;
    & > .lab {
      width: 80rpx;
      color: rgba(0, 0, 0, 1);
    }
    & > .detail {
      margin-left: 30rpx;
      flex: 1;
      padding-top: 30rpx;
      padding-left: 30rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      height: 246rpx;
      opacity: 1;
      border-radius: 20rpx;
    }
  }
  & > .task_loc {
    margin-top: 34rpx;
    display: flex;
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
    & .location {
      justify-content: center;
      display: flex;
      align-items: center;
      margin-left: 30rpx;
      flex: 1;
      height: 124rpx;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      & > .loc {
        font-size: 50rpx;
      }
    }
  }
  & > .task_complate {
    margin-top: 36rpx;
    display: flex;
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
    & > .complate {
      margin-left: 30rpx;
      width: 150rpx;
      height: 150rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      & image {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
        object-fit: cover;
      }
    }
  }
  & > .task_upload {
    margin-top: 30rpx;
    display: flex;
    & > .lab {
      width: 70rpx;
      // white-space: nowrap;
      color: rgba(0, 0, 0, 1);
    }
    & .addFiles_wrapped {
      margin-left: 30rpx;
      flex: 1;
      height: 150rpx;

      display: flex;
      & > .preImg {
        background-color: #fff;
        border-radius: 20rpx;
        box-shadow: 0rpx 12rpx 36rpx 0rpx rgb(183, 221, 252);
        position: relative;
        width: 150rpx;
        height: 100%;
        margin: 0 12rpx;
        & > image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 20rpx;
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
          font-size: 30rpx;
          color: #f1f1f1;
        }
        &:nth-child(1) {
          margin-left: 0;
        }
      }
      & > .add {
        border-radius: 20rpx;
        color: #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150rpx;
        height: 100%;
        background-color: #fff;
        font-size: 100rpx;
      }
    }
  }
}
</style>
