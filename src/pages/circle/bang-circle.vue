<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-13 09:46:02
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-01 01:13:46
 * @FilePath: \bangbang\src\pages\circle\bang-circle.vue
-->
<template>
  <div class="bang-circle">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <!-- 导航栏 -->
    <uni-nav-bar background-color="transparent" :border="false">
      <div class="search">
        <uni-search-bar
          v-model="iptVal"
          @input="iptChange"
          cancelButton="none"
          placeholder="请输入标题搜索"
        ></uni-search-bar>
      </div>
      <template v-slot:left><div class="topTitle">帮友圈</div></template>
    </uni-nav-bar>
    <div class="content">
      <div class="tab">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="rgba(24, 123, 237, 1)"
          @clickItem="onClickItem"
        />
      </div>
      <scroll-view class="container circleMain">
        <div class="circle_card">
          <div class="top">
            <div class="lf">
              <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
              <div class="topDes">
                <div class="name">苏克开飞机</div>
                <div class="time">一个小时前发布</div>
              </div>
            </div>
            <div class="rg">123</div>
          </div>
          <div class="des">
            <div class="details">
              挑战24小时按字母顺序生活！你试过用灯泡擦屁屁吗?加萨空了就拉卡深刻理解斯科拉傻得可怜就撒开了大家坷拉记得啦科技大厦啊大师金克拉就死定了大师金克拉的
            </div>
            <div class="imgList">
              <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
              <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
              <img src="http://qjpqjp.top:9000/bang/photo/default.png" alt="" />
            </div>
          </div>
          <div class="bottom">
            <div class="lf">
              <div class="topic">
                <i class="iconfont icon-huati" style="font-size: 35rpx"></i>
                日常<uni-icons
                  type="forward"
                  size="14"
                  color="rgba(42, 130, 228, 1)"
                ></uni-icons>
              </div>
            </div>
            <div class="rg">
              <div class="like">
                <i class="iconfont icon-dianzan" style="font-size: 32rpx"
                  >123</i
                >
              </div>
              <div class="collect">
                <i class="iconfont icon-shoucang" style="font-size: 35rpx"></i>
              </div>
              <div class="comment">
                <i class="iconfont icon-pinglun" style="font-size: 35rpx"></i>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
  <BangTab :selected="1"></BangTab>
</template>

<script lang="ts" setup>
import BangTab from '@/components/bangTab.vue'
import userService from '@/api/user'
userService.GetUserInfo()
const iptVal = ref('')
const iptChange = (e: string) => {
  iptVal.value = e
}
const current = ref(0)
const items = ['🗨️话题', '关注', '推荐', '图文']
type cI = {
  currentIndex: number
}
const onClickItem = async (e: cI) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
</script>
<style scoped lang="scss">
.search {
  &::v-deep .uni-searchbar__box {
    width: 372rpx;
    height: 48rpx;
    background-color: #fff !important;
    border-radius: 40rpx !important;
  }
}
.topTitle {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38rpx;
  font-weight: 700;
  line-height: 55.02rpx;
  color: rgba(255, 255, 255, 1);
}
.content {
  & > .circleMain {
    margin-top: 24rpx;
    height: 1240rpx;
    // background-color: red;
    overflow-y: auto;
    & .circle_card {
      padding: 30rpx 20rpx 30rpx 20rpx;
      width: 100%;
      // height: 450rpx;
      // opacity: 0.85;
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 0.85);
      & > .top {
        display: flex;
        justify-content: space-between;
        & > .lf {
          margin-left: 20rpx;
          display: flex;
          align-items: center;
          & > image {
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
          }
          & > .topDes {
            margin-left: 12rpx;
            & > .name {
              font-size: 26rpx;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
            }
            & > .time {
              line-height: 40rpx;
              height: 40rpx;
              font-size: 22rpx;
              font-weight: 500;
              color: rgba(166, 166, 166, 1);
            }
          }
        }
      }
      & > .des {
        margin-top: 16rpx;
        & > .details {
          padding: 0 0 0 30rpx;
          font-size: 26rpx;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        & > .imgList {
          margin-top: 16rpx;
          display: flex;
          & image {
            width: 180rpx;
            height: 180rpx;
            &:not(:first-child) {
              margin-left: 20rpx;
            }
          }
        }
      }
      & > .bottom {
        margin-top: 16rpx;
        display: flex;
        justify-content: space-between;
        & > .lf {
          & > .topic {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120rpx;
            border-radius: 40rpx;
            background-color: #fff;
            font-size: 30rpx;
            font-weight: 500;
            color: rgba(42, 130, 228, 1);
          }
        }
        & > .rg {
          display: flex;
          align-items: center;
          & .iconfont {
            color: rgba(166, 166, 166, 1);
          }
          & > .collect {
            & > .icon-shoucang {
              margin: 0 40rpx;
            }
          }
        }
      }
    }
  }
}
</style>
