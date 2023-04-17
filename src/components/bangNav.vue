<template>
  <uni-nav-bar
    left-icon="left"
    :title="title"
    @clickLeft="click"
    background-color="transparent"
    :border="false"
    class="bang_nav"
  >
  </uni-nav-bar>
</template>
<script setup lang="ts">
const click = () => {
  props.arrowBack && uni.navigateBack()
  emit('back')
}
const props = defineProps({
  title: {
    type: String,
    default: 'bangbang'
  },
  arrowBack: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['back'])
</script>
<script lang="ts">
export default {
  options: {
    // 微信小程序中 options 选项

    multipleSlots: true, // 在组件定义时的选项中启动多slot支持，默认启用

    styleIsolation: 'shared', // 启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式

    addGlobalClass: true, // 表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared

    virtualHost: true // 将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  }
}
</script>
<style scoped lang="scss">
::v-deep .uni-nav-bar-text {
  font-size: 17px;
  font-weight: 600;
  color: rgba(56, 56, 56, 1);
}
</style>
