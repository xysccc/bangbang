<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-05 01:35:54
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-09 14:54:52
 * @FilePath: \bangbang\src\pages\my\my-follow\my-follow.vue
-->
<template>
  <div class="my-fans">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="我的关注" />
    <div class="list">
      <div class="itemWrapped">
        <div class="item" v-for="(item, index) in follow" :key="item.id">
          <div class="lf">
            <image
              :src="item.head"
              @click="goTo(`/pages/my/my-space/my-space?id=${item.id}`)"
            />
            <div class="name">{{ item.username }}</div>
          </div>
          <div
            class="rg"
            :class="{ noFollow: !item.follow }"
            @click="toggleFollow(item)"
          >
            {{ item.follow ? '取关' : '关注' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userService from '@/api/user'
import BangNav from '@/components/bangNav.vue'
const follow: any = ref([])
const toggleFollow = (item) => {
  item.follow = !item.follow
  userService.follow({ toId: item.id })
}
onMounted(async () => {
  const { data } = await userService.getFollow()
  if (data.code !== 1) return
  follow.value = data.result
})
const goTo = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.list {
  margin-top: 24rpx;
  overflow-y: auto;
  height: 1300rpx;
  // background-color: red;
  & > .itemWrapped {
    padding: 30rpx 40rpx;
    padding-right: 60rpx;
    & > .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .lf {
        display: flex;
        align-items: center;
        & image {
          width: 88rpx;
          height: 88rpx;
          border-radius: 50%;
          margin-right: 30rpx;
        }
      }
      & > .rg {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border-radius: 40rpx;
        background-color: rgba(166, 166, 166, 0.53);
        padding: 10rpx 40rpx;
      }
      & > .noFollow {
        background-color: rgba(42, 130, 228, 1);
      }
      &:not(:first-child) {
        margin-top: 40rpx;
      }
    }
  }
}
</style>
