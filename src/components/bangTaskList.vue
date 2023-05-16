<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-16 10:30:09
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-16 10:51:18
 * @FilePath: \bangbang\src\components\bangTaskList.vue
-->
<template>
  <div class="taskList">
    <div class="content">
      <scroll-view
        class="contentItem"
        scroll-y="true"
        lower-threshold="5"
        @scrolltolower="handleScroll"
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
        <BangNoData v-show="pushArr.length === 0" />
      </scroll-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { changeDate } from '@/utils/date'
const props = defineProps({
  pushArr: {
    type: Number
  }
})
const status = ref('more')
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
const collect = async (item) => {
  item.isCollect === 0 ? (item.isCollect = 1) : (item.isCollect = 0)
  await taskService.TaskCollection({ taskId: item.id })
  await getList()
}
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>
