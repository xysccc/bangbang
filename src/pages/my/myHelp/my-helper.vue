<template>
  <div class="my-help">
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
        <div v-if="current === 0" class="contentItem">
          <div class="bang_card">
            <div class="top">
              <div class="lf">
                <div class="type">[游戏辅助类]</div>
                <div class="title">王者荣耀代练</div>
              </div>
              <div class="rg">
                <div class="collect">
                  <i class="iconfont icon-shoucang"></i>
                </div>
                <div class="collect">
                  <i class="iconfont icon-shoucang"></i>
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
                <i class="iconfont icon-weizhi-copy-copy btIcon"></i>
                <div class="locText">青岛工学院-3号教学楼sadada</div>
              </div>
              <div class="time">剩余时间：3天15小时</div>
              <div class="money">赏金：¥10</div>
            </div>
            <div class="status">已结单</div>
          </div>
        </div>
        <div v-if="current === 1" class="contentItem"></div>
        <div v-if="current === 2" class="contentItem"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
const current = ref(0)
const items = ['全部', '待完成', '已提交', '未完成']
type cI = {
  currentIndex: number
}
const onClickItem = (e: cI) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
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
          margin-left: 4rpx;
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
          & > .btIcon {
            border-right: none;
          }
        }
        & > .time {
          color: rgba(166, 166, 166, 1);
          padding: 0 10rpx 0 4rpx;
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
        line-height: 68rpx;
      }
    }
    & > .contentItem {
      height: 1140rpx;
      overflow: auto;
    }
  }
}
</style>
