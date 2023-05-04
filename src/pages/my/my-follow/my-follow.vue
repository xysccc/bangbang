<template>
  <div class="my-follow">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="我关注的人" />
    <div class="list">
      <div class="itemWrapped">
        <div class="item" v-for="(item, index) in 7">
          <div class="lf">
            <image
              src="https://img.js.design/assets/smartFill/img313164da746310.jpg"
            />
            <div class="name">阿斯顿</div>
          </div>
          <div class="rg noFollow">已关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BangNav from '@/components/bangNav.vue'
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
        font-size: 20rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border-radius: 40rpx;
        background-color: rgba(166, 166, 166, 0.53);
        padding: 10rpx 25rpx;
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
