<template>
  <bangAudit v-if="useUtils().isExamine" />
  <div class="my-release" v-else>
    <div class="bang-nav"></div>
    <BangNav title="我的发布" />
    <div class="container">
      <div class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="button"
          active-color="rgba(24, 123, 237, 1)"
          @clickItem="onClickItem"
        />
      </div>
      <div class="content">
        <template v-for="(item, index) in 7" :key="index">
          <scroll-view
            class="contentItem"
            scroll-y="true"
            lower-threshold="5"
            @scrolltolower="handleScroll"
            v-if="current === index"
          >
            <template v-for="(item, index) in pushArr" :key="index">
              <div
                class="bang_card"
                @click="
                  goTo(`/pages/index/bang-hall/bang-taskDetail?id=${item.id}`)
                "
              >
                <div class="top">
                  <div class="lf">
                    <div class="type">[{{ item?.type }}类]</div>
                    <div class="title">{{ item?.title }}</div>
                  </div>
                  <div class="rg">
                    <div class="collect">
                      <i
                        class="iconfont icon-shoucang"
                        @click="collect(item.id)"
                        v-if="item?.isCollect === 0"
                      ></i>
                      <i
                        class="iconfont icon-shoucang1"
                        style="color: #2a82e4"
                        v-else
                        @click="collect(item)"
                      ></i>
                    </div>
                    <!-- <div class="collect">
                      <i class="iconfont icon-shoucang"></i>
                    </div> -->
                  </div>
                </div>
                <div class="des">
                  <div class="tx">
                    <img :src="item?.head" alt="" />
                  </div>
                  <div class="content">
                    {{ item?.details }}
                  </div>
                </div>
                <div class="bottom">
                  <div class="location">
                    <i class="iconfont icon-weizhi-copy-copy btIcon"></i>
                    <div class="locText">{{ item?.location }}</div>
                  </div>
                  <div
                    class="time"
                    v-if="changeDate(item.limitTime).dayDiff > 0"
                  >
                    剩余时间：{{ changeDate(item?.limitTime).dayDiff }}天{{
                      changeDate(item?.limitTime).hourDiff
                    }}小时
                  </div>
                  <div v-else class="time expire">已过期</div>
                  <div class="money">赏金：￥{{ item?.money }}</div>
                </div>
                <div class="status" :class="changeStatusColor(item?.state)">
                  {{ changeStatusText(item?.state) }}
                </div>
              </div>
            </template>
            <uni-load-more
              :status="status"
              v-if="pushArr.length >= 5"
            ></uni-load-more>
            <BangNoData v-show="pushArr.length === 0" />
          </scroll-view>
        </template>
      </div>
      <BangButton
        title="发布新帮忙"
        top="20rpx"
        @btn-click="goTo(`/pages/add/bang-add`)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { changeDate } from '@/utils/date'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useUserStore } from '@/stores/user'
import taskService from '@/api/task'
import BangNoData from '@/components/bangNoData.vue'
import { useUtils } from '@/stores/utils'
import bangAudit from '@/components/bangAudit.vue'
const current = ref(0)
const items = ['全部', '审核中', '待接单', '已接单', '已完成', '已过期']
type cI = {
  currentIndex: number
}
const myRelease = computed(() => userStore.myRelease)
let pushArr: any = reactive([])
const userStore = useUserStore()
const onClickItem = async (e: cI) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
  pageOptions = {
    page: 1,
    pageSize: 5
  }
  pushArr = reactive([])
  await getList()
  pushArr.push(...myRelease.value.records)
}
let pageOptions = {
  page: 1,
  pageSize: 5
}

const getList = () => {
  return userStore.getMyRelease({
    ...pageOptions,
    ...(current.value >= 1 && { status: current.value - 1 })
  })
}
onMounted(async () => {
  await userStore.getMyRelease(pageOptions)
  pushArr.push(...myRelease.value.records)
})

const handleScroll = async () => {
  if (myRelease.value.total >= pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    pushArr.push(...myRelease.value.records)
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}
const collect = async (item) => {
  item.isCollect === 0 ? (item.isCollect = 1) : (item.isCollect = 0)
  await taskService.TaskCollection({ taskId: item.id })
  await getList()
}
const status = ref('more')
const changeStatusText = computed(() => (status: number) => {
  switch (status) {
    case 0:
      return '审核中'
    case 1:
      return '待接单'
    case 2:
      return '已接单'
    case 3:
      return '已完成'
    case 4:
      return '已过期'
  }
})
const changeStatusColor = computed(() => (status: number) => {
  switch (status) {
    case 0:
      return 'yellow'
    case 1:
      return 'gray'
    case 2:
      return 'blue'
    case 3:
      return 'green'
    case 4:
      return 'red'
  }
})
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.container {
  & > .tab {
    padding: 16rpx 16rpx;
    background-color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & ::v-deep uni-segmented-control {
      width: 100%;
    }
    & ::v-deep .segmented-control__item--button {
      border: none;
    }
    & ::v-deep .segmented-control__item--button text {
      color: #000 !important;
      font-size: 28rpx;
      line-height: 50rpx;
    }
    & ::v-deep .segmented-control__item--button--active text {
      color: #fff !important;
    }
    & ::v-deep .segmented-control__item--button {
      border-radius: 10rpx;
    }
    & ::v-deep .segmented-control {
      height: 60rpx;
    }
  }
  & > .content {
    padding: 20rpx 0rpx;
    & .bang_card:not(:first-child) {
      margin-top: 20rpx;
    }
    & .bang_card {
      overflow: hidden;
      position: relative;
      padding: 0 40rpx;
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
            margin-left: 80rpx;
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
        margin-top: 12rpx;

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
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        & > .location {
          display: flex;
          font-size: 24rpx;
          color: rgba(166, 166, 166, 1);

          & .locText {
            font-size: 24rpx;
            width: 170rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            // white-space: nowrap;
            -webkit-line-clamp: 1; /*第几行出现省略号*/
            -webkit-box-orient: vertical;
          }
          & > .btIcon {
            border-right: none;
          }
        }
        & > .time {
          width: 240rpx;
          white-space: nowrap;
          text-align: center;
          color: rgba(166, 166, 166, 1);
          padding: 0 10rpx 0 3rpx;
          font-size: 24rpx;
        }
        & > .money {
          font-size: 24rpx;
          color: rgba(166, 166, 166, 1);
        }
        & view:not(:last-child) {
          border-right: 2rpx solid #ccc;
        }
      }
      & > .status {
        position: absolute;
        top: -4rpx;
        left: -74rpx;
        width: 260rpx;
        height: 0;
        border-bottom: 66rpx solid rgba(128, 128, 128, 1);
        border-left: 60rpx solid transparent;
        border-right: 60rpx solid transparent;
        transform: rotate(-40deg);
        color: #fff;
        font-size: 30rpx;
        font-weight: 500;
        line-height: 70rpx;
        padding-left: 10rpx;
      }
      & .red {
        border-bottom-color: rgba(212, 48, 48, 1);
      }
      & .yellow {
        border-bottom-color: rgba(255, 235, 59, 1);
      }
      & .blue {
        border-bottom-color: rgba(24, 123, 237, 1);
      }
      & .green {
        border-bottom-color: rgba(67, 207, 124, 1);
      }
      & .gray {
        border-bottom-color: rgba(128, 128, 128, 1);
      }
    }
    & > .contentItem {
      height: 1045rpx;
      overflow-y: scroll;
    }
  }
}
</style>
