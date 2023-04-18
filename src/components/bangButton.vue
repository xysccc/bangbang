<template>
  <button class="bang_button" @click="btnClick">
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
    default: '0px'
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
  width: 222px;
  height: 56px;
  opacity: 1;
  background: rgba(42, 130, 228, 1);
  box-shadow: 0px 6px 18px 0px rgba(42, 130, 228, 0.3);
  border-radius: 12px;
  & > .content {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
