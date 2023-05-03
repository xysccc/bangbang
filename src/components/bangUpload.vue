<!-- <template>
  <div class="addFiles_wrapped">
    <div class="imgList">
      <div class="preImg" v-for="(item, index) in files" :key="item.imgUrl">
        <image :src="item.imgUrl" alt="" mode="aspectFit" />
        <div class="del" @click="delFiles(index)">✖</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface IFiles {
  imgUrl: string
  videoUrl?: string
}
const props = defineProps({
  files: {
    type: Array as () => IFiles[],
    default: () => []
  }
})
const delFiles = (index: number) => {
  props.files.splice(index, 1)
}
</script>
<style lang="scss"></style> -->
