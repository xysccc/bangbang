<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-18 22:06:35
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-01 11:43:06
 * @FilePath: \bangbang\src\components\bangButton.vue
-->
<template>
  <button class="bang_button" @click="btnClick">
    <uni-icons
      :type="props.icon"
      :size="props.iconSize"
      :color="props.iconColor"
      v-if="props.icon"
    ></uni-icons>
    <div class="content">{{ props.title }}</div>
  </button>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'bangbang'
  },
  top: {
    type: String,
    default: '0rpx'
  },
  icon: {
    type: String
  },
  iconSize: {
    type: Number,
    default: 25
  },
  iconColor: {
    type: String,
    default: '#ffffff'
  },
  width: {
    type: String,
    default: '444rpx'
  },
  height: {
    type: String,
    default: '112rpx'
  }
})
const btnClick = () => {
  emit('btnClick')
}
const emit = defineEmits(['btnClick'])
</script>
<style scoped lang="scss">
.bang_button {
  margin-top: v-bind(top);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  appearance: none;
  outline: none;
  width: v-bind(width);
  height: v-bind(height);
  opacity: 1;
  background: rgba(42, 130, 228, 1);
  box-shadow: 0rpx 12rpx 36rpx 0rpx rgba(42, 130, 228, 0.3);
  border-radius: 24rpx;
  & > .content {
    font-size: 32rpx;
    font-weight: 400;
    letter-spacing: 0rpx;
    line-height: 48rpx;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
