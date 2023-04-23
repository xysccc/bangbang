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
            <div class="taskName">全部分类</div>
            <div class="search">
              <uni-search-bar
                :focus="true"
                v-model="iptVal"
                cancelButton="none"
              ></uni-search-bar>
            </div>
          </div>
          <div v-if="current === 0" class="taskMain">
            <div
              class="taskItem"
              v-for="(item, index) in 18"
              @click="
                goTo(`/pages/index/bang-hall/bang-taskDetail?id=${'123'}`)
              "
            >
              <div class="taskItemTop">
                <div class="type">王者荣耀代练</div>
                <div class="rg">
                  <div class="time">
                    <i
                      class="iconfont icon-shizhong"
                      style="font-size: 24rpx"
                    ></i>
                    3天
                  </div>
                  <div class="arrow">
                    <img
                      src="http://qjpqjp.top:9000/bang/photo/箭头进入.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="des">
                <div class="tx">
                  <img
                    src="http://qjpqjp.top:9000/bang/photo/default.png"
                    alt=""
                  />
                </div>
                <div class="content">
                  钻石段位，找一个可以代练到王者段位的人，全英雄，全皮肤...
                </div>
              </div>
              <div class="bottom">
                <div class="location">
                  <i class="iconfont icon-weizhi-copy-copy"></i>
                  <div class="locText">青岛工学院-3号教学楼sadada</div>
                </div>
                <div class="collect">
                  <i class="iconfont icon-shoucang"></i>
                </div>
              </div>
            </div>
          </div>
          <div v-if="current === 1" class="taskMain">456</div>
          <div v-if="current === 2" class="taskMain">789</div>
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
const current = ref(0)
const iptVal = ref('')
const onClichangeCurrentckItem = (e: number) => {
  current.value = e
  console.log(current.value)
  taskClass.map((item: Itask, index: number, arr: Itask[]) => {
    item.active = false
    e >= 1 && (arr[e - 1].active = true)
  })
}
const taskStore = useTaskStore()
// 分类数据

taskStore.getTaskClass()
let taskClass = taskStore.taskClass
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
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
        padding-bottom: 140rpx;
        overflow-y: scroll;
        margin-top: 4rpx;
        height: 1120rpx;
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
            margin-top: 12rpx;
            display: flex;
            justify-content: space-between;
            & > .location {
              display: flex;
              font-size: 24rpx;
              color: rgba(166, 166, 166, 1);

              & .locText {
                width: 300rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; /*第几行出现省略号*/
                -webkit-box-orient: vertical;
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
