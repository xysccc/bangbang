<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div class="content" v-else>
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="发布任务" :arrow-tab-back="true" />
    <div class="bang_add container">
      <!-- 选择任务类型栏 -->
      <div class="select" style="width: 100%">
        <img :src="selectImg" alt="" />
        <uni-data-select
          v-model="select"
          :localdata="selects"
          @change="selectChange"
        ></uni-data-select>
      </div>
      <!-- 表单区域 -->
      <div class="task_form">
        <div class="task_form_content">
          <uni-forms :modelValue="formData" label-position="top">
            <uni-forms-item label="任务名称" type="text" name="name" required>
              <uni-easyinput
                type="text"
                v-model="formData.name"
                placeholder="请输入您的任务名称"
              />
            </uni-forms-item>
            <uni-forms-item label="任务介绍" name="introduction">
              <uni-easyinput
                type="textarea"
                v-model="formData.des"
                placeholder="请输入任务介绍"
              />
            </uni-forms-item>
            <uni-forms-item label="帮忙地点" name="name" required>
              <uni-easyinput
                type="text"
                v-model="formData.location"
                placeholder="点击获取定位"
                @focus="goMap"
              />
            </uni-forms-item>
            <uni-forms-item label="日期时间" required>
              <uni-datetime-picker
                type="datetime"
                return-type="string"
                v-model="formData.datetimesingle"
                @change="dateChange"
              />
            </uni-forms-item>
            <uni-forms-item label="赏金" name="name">
              <uni-easyinput
                type="number"
                v-model="formData.money"
                placeholder="请输入赏金"
              />
            </uni-forms-item>
            <uni-forms-item label="是否加急" required>
              <uni-data-checkbox
                v-model="formData.urgent"
                :localdata="urgents"
              />
            </uni-forms-item>
            <uni-forms-item label="详细说明">
              <div class="addFiles_wrapped">
                <div
                  class="preImg"
                  v-for="(item, index) in fileValue"
                  :key="item.imgUrl"
                  @click="preview(item, index)"
                >
                  <img :src="item.imgUrl" alt="" mode="aspectFit" />
                  <div class="del" @click="delFiles(index)">✖</div>
                </div>

                <div class="add" @click="addFiles" v-if="fileValue.length < 3">
                  +
                </div>
              </div>
            </uni-forms-item>
            <BangButton title="发布任务" top="20rpx" @btn-click="add" />
            <div style="height: 100rpx"></div>
          </uni-forms>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import taskService from '@/api/task'
import type { IGetTaskClassData } from '@/api/task/task.model'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useTaskStore } from '@/stores/task'
import type * as TaskModel from '@/api/task/task.model'
import { addDaysToDate, getTime } from '@/utils/date'
import { useUtils } from '@/stores/utils'
import bangAudit from '@/components/bangAudit.vue'
interface Itask {
  name: string
  offImg: string
  onImg: string
  id: string
}
interface ImediaList {
  imgUrl: string
  videoUrl?: string
}
interface ImapTask extends Itask {
  value: string
}
const taskStore = useTaskStore()
// 分类数据

taskStore.getTaskClass()
let taskClass = taskStore.taskClass
const selects = taskClass.map((item: Itask) => ({
  value: item.id,
  text: item.name,
  onImg: item.onImg,
  offImg: item.offImg
}))
console.log('selects', selects)

// 默认选中的数据
const selectImg = ref(selects[0].offImg)
const select = ref(selects[0].value)
const selectChange = (e: string) => {
  formData.type = e
  select.value = e
  selectImg.value = selects.find((item: ImapTask) => item.value === e).offImg
}
// 表单数据
const formData = reactive({
  name: '',
  des: '',
  location: '',
  money: '',
  media: [],
  urgent: 0,
  datetimesingle: addDaysToDate(new Date(), 7),
  time: getTime(addDaysToDate(new Date(), 7)),
  type: ''
})
const urgents = [
  {
    text: '加急',
    value: 1
  },
  {
    text: '不加急',
    value: 0
  }
]
const dateChange = (e: string) => {
  formData.time = e
}
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
function getMapLocation() {
  uni.chooseLocation({
    success: (res) => {
      console.log(res)
      taskStore.taskLocation = res
      formData.location = res.name
      // this.getRegionFn(res);
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

const goMap = () => {
  getMapLocation()
}
const add = async () => {
  const data: any = await taskStore.addTask({
    details: formData.des,
    limitTime: formData.time,
    location: formData.location,
    money: parseInt(formData.money),
    title: formData.name,
    typeId: select.value,
    urgent: formData.urgent,
    urls: JSON.stringify(fileValue.value)
  })
  if (data.code !== 1) return
  await uni.showToast({
    icon: 'success',
    title: '发布成功'
  })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/index/bang-index' })
  }, 1000)
}
</script>

<style scoped lang="scss">
.bang_add {
  width: 680rpx;
  & > .select {
    padding: 0 30rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 166rpx;
    // background-color: red;
    & image {
      margin-right: 20rpx;
      width: 112rpx;
      height: 112rpx;
      object-fit: cover;
    }
    & ::v-deep uni-data-select {
      width: 508rpx;
      height: 72rpx;
      background-color: #fff;
      border-radius: 40rpx;
    }
    & ::v-deep .uni-select {
      border: none;
    }
    & ::v-deep .uni-stat__select {
      cursor: none;
    }
    & ::v-deep .uni-select__selector-item {
      cursor: none;
    }
  }
  & > .task_form {
    height: 1300rpx;
    border-radius: 24rpx 24rpx 0rpx 0rpx;

    overflow-y: auto;
    background-color: #fff;
    & > .task_form_content {
      padding: 40rpx;
      height: 1702rpx;
      // & ::v-deep .uni-forms-item {
      //   flex-direction: column;
      // }
    }
    .addFiles_wrapped {
      height: 200rpx;
      padding: 20rpx;
      width: 100%;
      display: flex;
      & > .preImg {
        position: relative;
        width: 200rpx;
        height: 100%;
        margin: 0 12rpx;
        & > image {
          width: 100%;
          height: 100%;
          object-fit: contain;
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
      }
      & > .add {
        margin-left: 8rpx;
        color: #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200rpx;
        height: 100%;
        background-color: #fff;
        font-size: 100rpx;
        border: 2rpx solid #eeeeee;
      }
    }
  }
}
</style>
