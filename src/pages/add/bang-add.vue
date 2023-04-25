<template>
  <div class="content">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="发布任务" :arrow-back="false" />
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
            <uni-forms-item label="姓名" type="text" name="name" required>
              <uni-easyinput
                type="text"
                v-model="formData.name"
                placeholder="请输入姓名"
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
                  :key="index"
                >
                  <img :src="item" alt="" />
                  <div class="del" @click="delFiles(item)">✖</div>
                </div>

                <div class="add" @click="addFiles" v-if="fileValue.length < 3">
                  +
                </div>
              </div>
            </uni-forms-item>
            <BangButton title="发布任务" top="20rpx" @btn-click="add" />
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
interface Itask {
  name: string
  offImg: string
  onImg: string
  id: string
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
// 默认选中的数据
const selectImg = ref('http://qjpqjp.top:9000/bang/photo/Frame 11.png')
const select = ref('1648611816487608322')
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
  datetimesingle: new Date(),
  time: '',
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
let fileValue = ref<string[]>([])
const delFiles = (item: string) => {
  fileValue.value = fileValue.value.filter((file) => file !== item)
  // fileValue=computed(()=>fileValue.filter((file) => file !== item))
  console.log(fileValue)
}
const addFiles = () => {
  uni.chooseMedia({
    count: 3,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      uni.showLoading({
        title: '正在上传'
      })
      res.tempFiles.map((item) => {
        uni.uploadFile({
          url: 'http://114.116.95.152:2001/mo/upload',
          filePath: item.tempFilePath,
          // files: res.tempFiles.map((item) => ({ uri: item.tempFilePath })),
          name: 'file',
          success: (uploadFileRes: any) => {
            // // 上传qjp服务器成功
            // if (res.tempFiles.length !== 3) {
            //   res.tempFiles.length + fileValue.value.length === 3 &&
            //     uni.hideLoading()
            // } else {
            //   fileValue.value.length === 2 && uni.hideLoading()
            // }
            uni.hideLoading()
            fileValue.value.push(JSON.parse(uploadFileRes.data).result.url)
            // res.tempFiles.length === fileValue.value.length && uni.hideLoading()

            // fileValue.push(uploadFileRes.data)
            // console.log(fileValue);
          },
          fail: (e) => {
            console.log(e)
          }
        })
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

const goMap = () => {
  getMapLocation()
}
const add = async () => {
  const data = await taskStore.addTask({
    details: formData.des,
    limitTime: formData.time,
    location: formData.location,
    money: parseInt(formData.money),
    title: formData.name,
    typeId: select.value,
    urgent: formData.urgent,
    urls: fileValue.value
  })
  console.log('da', data)
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
    height: 1155rpx;
    border-radius: 24rpx 24rpx 0px 0px;

    overflow-y: auto;
    background-color: #fff;
    & > .task_form_content {
      padding: 40rpx;
      height: 1802rpx;
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
