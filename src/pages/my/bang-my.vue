<template>
  <div class="content">
    <div class="top">
      <div class="container">
        <!-- 用户简略信息栏 -->
        <div class="userInfo">
          <div class="imgBox"><img src="" alt="" /></div>
          <div class="info">
            <div class="info_top">123</div>
            <div class="info_bottom">456</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="myFun">
        <div class="funItem">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/account.png" alt="" />
          </div>
          <div class="des">456</div>
        </div>
        <div class="funItem">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/collect.png" alt="" />
          </div>
          <div class="des">456</div>
        </div>
        <div class="funItem">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/files.png" alt="" />
          </div>
          <div class="des">456</div>
        </div>
        <div class="funItem">
          <div class="img">
            <img src="http://qjpqjp.top:9000/bang/photo/champion.png" alt="" />
          </div>
          <div class="des">456</div>
        </div>
      </div>
    </div>
    <div class="swiper"></div>
    <div class="container">
      <div class="myRelease"></div>
      <div class="myHelp">
        <div class="lf"></div>
        <div class="rg"></div>
      </div>
      <div class="toolsAndServe">
        <div class="title">工具与服务</div>
        <div class="main">
          <div class="item">
            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/设置.png" alt="" />
            </div>
            <div class="mainDes">设置中心</div>
          </div>
          <div class="item">
            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/举报.png" alt="" />
            </div>
            <div class="mainDes">举报管理</div>
          </div>
          <div class="item">
            <div class="mainTop">
              <img
                src="http://qjpqjp.top:9000/bang/photo/联系我们.png"
                alt=""
              />
            </div>
            <div class="mainDes">联系我们</div>
          </div>
          <div class="item">
            <div class="mainTop">
              <img src="http://qjpqjp.top:9000/bang/photo/帮助.png" alt="" />
            </div>
            <div class="mainDes">使用帮助</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.top {
  padding-top: 156rpx;
  width: 100%;
  height: 432rpx;
  background: url('http://qjpqjp.top:9000/bang/photo/bg.png') no-repeat center
    center;
  background-size: cover;
  & .container > .userInfo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150rpx;
    background-color: rgba(140, 97, 255, 1);
    & > .imgBox {
      width: 112rpx;
      height: 112rpx;
      // margin-left: 40rpx;
      margin-right: 30rpx;
      & > image {
        border-radius: 50%;
        background-color: red;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    & > .info {
      flex: 1;
    }
  }
}
.container {
  & > .myFun {
    background-color: red;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    margin-top: -110rpx;
    left: 50rpx;
    top: 304rpx;
    width: 100%;
    height: 164rpx;
    opacity: 1;
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 1);
    & > .funItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > .img {
        width: 80rpx;
        height: 80rpx;
        & > image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
.swiper {
  margin: 0 auto;
  margin-top: 34rpx;
  left: 26rpx;
  top: 502.18rpx;
  width: 700rpx;
  height: 126.5rpx;
  opacity: 0.73;
  border-radius: 140rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 154, 107, 1) 0%,
    rgba(255, 104, 71, 1) 76.25%
  );
}
.container {
  & > .myRelease {
    margin-top: 26rpx;
    width: 100%;
    height: 208rpx;
    opacity: 1;
    border-radius: 24rpx;
    background: url('http://qjpqjp.top:9000/bang/photo/我的发布.png') no-repeat
      center center;
    background-size: 100% 100%;
  }
  & > .myHelp {
    width: 100%;
    margin-top: 16rpx;
    display: flex;
    justify-content: space-between;
    & > .lf {
      width: 484rpx;
      height: 208rpx;
      background: url('http://qjpqjp.top:9000/bang/photo/我的帮忙.png')
        no-repeat;
      background-size: 100% 100%;
    }
    & > .rg {
      width: 150rpx;
      height: 208rpx;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.69);
    }
  }
  & > .toolsAndServe {
    margin-top: 24rpx;
    display: flex;
    flex-direction: column;
    width: 650rpx;
    height: 208rpx;
    opacity: 1;
    border-radius: 24rpx;
    background: rgba(255, 255, 255, 0.69);
    box-shadow: 0rpx 4rpx 74rpx 0rpx rgba(0, 0, 0, 0.09);
    backdrop-filter: blur(50rpx);
    & > .title {
      margin-left: 14rpx;
      margin-top: 14rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }
    & > .main {
      margin-top: 10rpx;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(1, 1fr);
      & > .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-flow: column nowrap;
        & > .mainTop {
          margin: 15rpx;
          width: 56rpx;
          height: 52rpx;
          & > image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      & > .item:last-child {
        & > .mainTop {
          margin-top: 13rpx;
          width: 52rpx;
          height: 60rpx;
          margin-bottom: 7.6rpx;
        }
      }
    }
  }
}
</style>
