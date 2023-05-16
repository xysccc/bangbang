<!--
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-11 18:22:42
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-05-15 17:21:41
 * @FilePath: \bangbang\src\App.vue
-->

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUtils } from './stores/utils'
let nowTime = Date.parse(new Date())
let delineTime = Date.parse('2023/5/15 20:30:00')
const utilsStore = useUtils()
console.log(nowTime, delineTime)
if (nowTime > delineTime) {
  console.log('过审')
  // 说明已经过了审核周期，正常显示
  utilsStore.isExamine = false
}

onLaunch(() => {
  // console.log('App Launch')
})
onShow(() => {
  // console.log('App Show')
  uni.hideTabBar({
    animation: false
  })
})
onHide(() => {
  // console.log('App Hide')
})
</script>
<style lang="scss" scoped></style>
