<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-25 10:59:50
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-05 01:11:00
 * @FilePath: \bangbang\src\pages\my\my-tab\my-collection.vue
-->
<template>
  <div class="my-collection">
    <div class="bang-nav"></div>
    <BangNav title="我的收藏" />
    <div class="content">
      <scroll-view
        class="contentItem"
        scroll-y="true"
        lower-threshold="5"
        @scrolltolower="handleScroll"
      >
        <template v-for="(item, index) in pushArr">
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
                    @click="collect(item.id)"
                  ></i>
                </div>
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
              <div class="time" v-if="changeDate(item.limitTime).dayDiff > 0">
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
      </scroll-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { changeDate } from '@/utils/date'
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
import { useUserStore } from '@/stores/user'
import taskService from '@/api/task'
const current = ref(0)
let pushArr = reactive<any>([])
const items = ['全部', '审核中', '待接单', '已接单', '已完成', '已过期']
type cI = {
  currentIndex: number
}
let pageOptions = {
  page: 1,
  pageSize: 5
}
let myCollet = computed(() => userStore.myCollet)
const userStore = useUserStore()
const getList = () => {
  return userStore.getMyCollet({
    ...pageOptions
  })
}
onMounted(async () => {
  await userStore.getMyCollet(pageOptions)
  pushArr.push(...myCollet.value.records)
})

const handleScroll = async () => {
  if (myCollet.value.total > pageOptions.page * pageOptions.pageSize) {
    pageOptions.page++
    status.value = 'loading'
    await getList()
    pushArr.push(...myCollet.value.records)
    status.value = 'more'
  } else {
    status.value = 'no-more'
  }
}

const collect = async (id: string) => {
  const { page, pageSize } = pageOptions
  await taskService.TaskCollection({ taskId: id })
  pushArr.splice((page - 1) * pageSize, pageSize, pageSize)
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
.content {
  margin-top: 20px;
  padding: 20rpx 40rpx;
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
</style>
