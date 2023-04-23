<template>
  <div class="bang-taskDetail">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="任务详情" />
    <div class="container">
      <div class="bang_card">
        <div class="top">
          <div class="lf">
            <div class="type">[游戏辅助类]</div>
            <div class="title">王者荣耀代练</div>
          </div>
          <div class="rg">
            <div class="collect"><i class="iconfont icon-shoucang"></i></div>
            <div class="collect"><i class="iconfont icon-shoucang"></i></div>
          </div>
        </div>
        <div class="des">
          <div class="tx">
            <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
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
          <div class="time">剩余时间：3天15小时</div>
          <div class="money">赏金：¥10</div>
        </div>
      </div>
      <div class="release_person">
        <label class="lab">发布人</label>
        <div class="release_person_box">
          <div class="lf">
            <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
            <div class="name">舒克开飞机</div>
          </div>
          <i class="message iconfont icon-shoucang"></i>
        </div>
      </div>
      <div class="task_detail">
        <label class="lab">任务详情</label>
        <div class="detail">
          钻石段位，找一个可以代练到王者段位的人，全英雄，全皮肤，共计三天时间，感兴趣的快快报名哦！
        </div>
      </div>
      <div class="task_loc">
        <label class="lab">发布地点</label>
        <div class="location">
          <i class="loc iconfont icon-shoucang"></i>
          <span>青岛工学院-3号宿舍楼3N326</span>
        </div>
      </div>
      <div class="task_complate">
        <label class="lab">完成上传</label>
        <div class="complate"></div>
      </div>
      <div class="bottom">
        <BangButton title="报名帮忙" top="50rpx" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BangButton from '@/components/bangButton.vue'
import BangNav from '@/components/bangNav.vue'
onLoad((option) => {
  console.log(option)
})
</script>

<style scoped lang="scss">
.container {
  padding-top: 40rpx;
  width: 650rpx;
  margin: 0 auto;
  & > .bang_card {
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
          -webkit-line-clamp: 1; /*第几行出现省略号*/
          -webkit-box-orient: vertical;
        }
      }
      & > .time {
        font-size: 24rpx;
      }
      & > .money {
        font-size: 24rpx;
        color: rgba(166, 166, 166, 1);
      }
    }
  }
  & > .release_person {
    margin-top: 34rpx;
    display: flex;
    align-items: center;
    height: 130rpx;
    width: 100%;
    & > .release_person_box {
      margin-left: 34rpx;
      padding: 26rpx 34rpx;
      background-color: #fff;
      display: flex;
      border-radius: 20rpx;
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      height: 124rpx;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      & image {
        width: 76rpx;
        height: 76rpx;
        object-fit: cover;
        border-radius: 50%;
      }
      & > .lf {
        display: flex;
        align-items: center;
        & > .name {
          margin-left: 20rpx;
        }
      }
      & > .message {
        font-size: 40rpx;
      }
    }
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
  }
  & > .task_detail {
    display: flex;
    margin-top: 34rpx;
    & > .lab {
      width: 80rpx;
      color: rgba(0, 0, 0, 1);
    }
    & > .detail {
      margin-left: 30rpx;
      flex: 1;
      padding-top: 30rpx;
      padding-left: 30rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      height: 246rpx;
      opacity: 1;
      border-radius: 20rpx;
    }
  }
  & > .task_loc {
    margin-top: 34rpx;
    display: flex;
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
    & .location {
      justify-content: center;
      display: flex;
      align-items: center;
      margin-left: 30rpx;
      flex: 1;
      height: 124rpx;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
      & > .loc {
        font-size: 50rpx;
      }
    }
  }
  & > .task_complate {
    margin-top: 36rpx;
    display: flex;
    & > .lab {
      width: 70rpx;
      color: rgba(0, 0, 0, 1);
    }
    & > .complate {
      margin-left: 30rpx;
      width: 238rpx;
      height: 238rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(183, 221, 252, 1);
    }
  }
}
</style>
