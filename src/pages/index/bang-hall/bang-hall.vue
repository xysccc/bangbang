<template>
  <div class="bang-hall">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="悬赏大厅" />
    <div class="main">
      <div class="lf">
        <div
          class="navItem navItemIndex"
          :class="{ navItemActive: current === 0 }"
          @click="onClichangeCurrentckItem(0)"
        >
          <img
            src="http://qjpqjp.top:9000/bang/photo/Frame 1.png"
            alt=""
            class="indexImg"
          />
        </div>
        <div
          class="navItem"
          v-for="(item, index) in taskClass"
          :key="index"
          :class="{ navItemActive: item.active }"
          @click="onClichangeCurrentckItem(index + 1)"
        >
          <img :src="item.onImg" alt="" v-if="item.active" />
          <img :src="item.offImg" alt="" v-else />
        </div>
      </div>
      <div class="rg">
        <div class="container">
          <div class="top">
            <div class="taskName">
              {{ current === 0 ? '全部分类' : taskClass[current + 1]?.name }}
            </div>
            <div class="search">
              <uni-search-bar
                v-model="iptVal"
                @input="iptChange"
                cancelButton="none"
              ></uni-search-bar>
            </div>
          </div>
          <template v-for="(item, index) in 6" :key="index">
            <scroll-view
              scroll-y="true"
              v-if="current === index"
              class="taskMain"
              lower-threshold="5"
              @scrolltolower="handleScroll"
            >
              <template
                v-for="(item, index) in taskList.records"
                :key="item.id"
              >
                <div
                  class="taskItem"
                  v-if="changeDate(item.limitTime).dayDiff > 0"
                >
                  <div class="taskItemTop">
                    <div class="type">{{ item.title }}</div>
                    <div class="rg">
                      <div class="time">
                        <i
                          class="iconfont icon-shizhong"
                          style="font-size: 24rpx"
                        ></i>
                        {{ changeDate(item.limitTime).dayDiff }}天
                      </div>
                      <div
                        class="arrow"
                        @click="
                          goTo(
                            `/pages/index/bang-hall/bang-taskDetail?id=${item.id}`
                          )
                        "
                      >
                        <img
                          src="http://qjpqjp.top:9000/bang/photo/箭头进入.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div class="des">
                    <div class="tx">
                      <img :src="item.head" alt="" />
                    </div>
                    <div class="content">
                      {{ item.details }}
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="location">
                      <i class="iconfont icon-weizhi-copy-copy"></i>
                      <div class="locText">{{ item.location }}</div>
                    </div>
                    <div class="bottom_rg">
                      <div class="collect">
                        <i
                          class="iconfont icon-shoucang"
                          @click="collect(item.id)"
                          v-if="item.isCollect === 0"
                        ></i>
                        <i
                          class="iconfont icon-shoucang1"
                          style="color: #2a82e4"
                          v-else
                          @click="collect(item.id)"
                        ></i>
                      </div>
                      <div class="money">￥{{ item.money }}</div>
                    </div>
                  </div>
                </div>
              </template>
              <uni-load-more
                :status="status"
                v-if="taskList.records.length >= 6"
              ></uni-load-more>
            </scroll-view>
          </template>

          <div class="bottom">
            <BangButton title="发布新任务" top="20rpx" icon="plus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BangNav from '@/components/bangNav.vue'
import taskService from '@/api/task'
import type { IGetTaskClassData } from '@/api/task/task.model'
import BangButton from '@/components/bangButton.vue'
import { useTaskStore } from '@/stores/task'
import { changeDate } from '@/utils/date'
interface Itask {
  name: string
  offImg: string
  onImg: string
  id: string
  active?: boolean
}
interface ImapTask extends Itask {
  value: string
}

const status = ref('more')
const pageOptions = {
  page: 1,
  pageSize: 6
}
const handleScroll = async (e: any) => {
  if (taskList.total >= pageOptions.pageSize + 6) {
    pageOptions.pageSize = pageOptions.pageSize + 6
    status.value = 'loading'
    await taskStore.getTaskList({
      ...pageOptions,
      ...(current.value >= 1 && { typeId: taskClass[current.value - 1].id }),
      ...(iptVal.value && { search: iptVal.value })
    })
    taskList.records = taskStore.taskList.records
    taskList = taskStore.taskList
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
const taskStore = useTaskStore()
// 分类数据
taskStore.getTaskClass()
taskStore.getTaskList(pageOptions)
let taskList = taskStore.taskList
let taskClass = taskStore.taskClass
console.log('TA', taskList)

const current = ref(0)
const iptVal = ref('')
const typeId = ref('')
const onClichangeCurrentckItem = async (e: number) => {
  current.value = e
  console.log(current.value)
  taskClass.map((item: Itask, index: number, arr: Itask[]) => {
    item.active = false
    e >= 1 && (arr[e - 1].active = true)
  })
  // taskStore.getTaskList({
  //   page: 1,
  //   pageSize: 6,
  //   typeId: e >= 1 && taskClass[current.value - 1].id,
  //   ...(iptVal.value && { search: iptVal.value })
  // })
  await taskStore.getTaskList({
    ...pageOptions,
    ...(e >= 1 && { typeId: taskClass[current.value - 1].id }),
    ...(iptVal.value && { search: iptVal.value })
  })
  taskList.records = taskStore.taskList.records
  taskList = taskStore.taskList
}
const iptChange = async (e: string) => {
  iptVal.value = e
  await taskStore.getTaskList({
    ...pageOptions,
    ...(current.value >= 1 && { typeId: taskClass[current.value - 1].id }),
    ...(iptVal.value && { search: iptVal.value })
  })
  taskList.records = taskStore.taskList.records
  taskList = taskStore.taskList
}

const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
const collect = async (id: string) => {
  await taskService.TaskCollection({ taskId: id })
  await taskStore.getTaskList({
    ...pageOptions,
    ...(current.value >= 1 && { typeId: taskClass[current.value - 1].id }),
    ...(iptVal.value && { search: iptVal.value })
  })
  taskList.records = taskStore.taskList.records
  taskList = taskStore.taskList
}
</script>

<style scoped lang="scss">
.main {
  margin-top: 54rpx;
  display: flex;
  height: 1620rpx;
  overflow: hidden;
  & > .lf {
    overflow: auto;
    width: 184rpx;
    & > .navItem {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 144rpx;
      & > .indexImg {
        width: 68rpx;
        height: 68rpx;
      }
      & image {
        width: 88rpx;
        height: 88rpx;
        object-fit: cover;
      }
    }
    & .navItemActive {
      background-color: #fff;
    }
  }
  & > .rg {
    flex: 1;
    background-color: #fff;
    & .container {
      width: 530rpx;
      margin: 0 auto;
      & > .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .taskName {
          height: 46rpx;
          width: 142rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10rpx;
          background: rgba(42, 130, 228, 1);
          box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
          font-size: 24rpx;
          color: rgba(255, 255, 255, 1);
        }
        & .search {
          &::v-deep .uni-searchbar__box {
            width: 312rpx;
            height: 48rpx;
            background-color: rgba(229, 229, 229, 1) !important;
            border-radius: 40rpx !important;
          }
        }
      }
      & > .taskMain {
        padding-top: 24rpx;
        width: 100%;
        // padding-bottom: 140rpx;
        overflow-y: scroll;
        margin-top: 4rpx;
        height: 1110rpx;
        & .taskItem {
          padding-top: 24rpx;
          padding-left: 24rpx;
          padding-right: 24rpx;
          width: 90%;
          margin: 20rpx auto;
          margin-top: 36rpx;
          height: 188rpx;
          border-radius: 20rpx;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
          & > .taskItemTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > .type {
              font-size: 25rpx;
              color: rgba(166, 166, 166, 1);
            }
            & > .rg {
              display: flex;
              align-items: center;
              & > .time {
                margin-right: 16rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(50, 63, 75, 1);
                border-radius: 40rpx;
                color: rgba(255, 255, 255, 1);
                font-size: 22rpx;
                width: 90rpx;
              }
              & > .arrow {
                width: 36rpx;
                height: 36rpx;
                & image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
          }
          & > .des {
            display: flex;
            align-items: center;
            margin-top: 12rpx;
            & > .tx {
              width: 66rpx;
              height: 66rpx;
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
            width: 100%;
            margin-top: 12rpx;
            display: flex;
            justify-content: space-between;
            & > .location {
              display: flex;
              font-size: 24rpx;
              color: rgba(166, 166, 166, 1);

              & .locText {
                width: 260rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; /*第几行出现省略号*/
                -webkit-box-orient: vertical;
              }
            }
            & > .bottom_rg {
              margin-left: 20rpx;
              flex: 1;
              align-items: center;
              justify-content: space-between;
              display: flex;
              & > .money {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 90rpx;
                // height: 22rpx;
                opacity: 1;
                border-radius: 4rpx 0rpx, 0rpx, 4rpx;
                background: linear-gradient(
                  180deg,
                  rgba(255, 8, 68, 1) 0%,
                  rgba(255, 177, 153, 1) 100%
                );
                font-size: 24rpx;
                color: rgba(255, 255, 255, 1);
                margin-left: 20rpx;
              }
            }
          }
          &:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
