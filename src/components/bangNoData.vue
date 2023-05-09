<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-05-05 13:49:15
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-09 14:27:30
 * @FilePath: \bangbang\src\components\bangNoData.vue
-->
<template>
  <div class="no_data">
    <div class="no_data_wrapped">
      <img :src="imgSrc" alt="" />
      <text class="des">{{ text }} </text>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  imgSrc: {
    type: String,
    default: () => 'https://s1.ax1x.com/2022/11/23/z8XTud.png'
  },
  text: {
    type: String,
    default: () => '暂无数据~'
  },
  height: {
    type: String,
    default: () => '100%'
  }
})
</script>
<style lang="scss">
.no_data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: v-bind('height');
  background-color: transparent;
  & > .no_data_wrapped {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 1150rpx;
    & > image {
      width: 100%;
      //   height: 50%;
      //   background-color: red;
    }
    & > .des {
      color: rgba(180, 182, 186, 1);
      font-size: 30rpx;
    }
  }
}
</style>
