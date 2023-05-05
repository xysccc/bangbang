<template>
  <div class="bang-info">
    <!-- 顶部状态栏占位 -->
    <div class="bang-nav"></div>
    <BangNav title="帮帮Space" />
    <div
      class="wrapped"
      style="
        margin-top: 15px;
        padding: 5px 30px;
        background-color: #fff;
        height: 100vh;
        border-radius: 5px;
      "
    >
      <div style="display: flex; margin-top: 15px">
        <img
          src="http://qjpqjp.top:9000/bang/photo/default.png"
          style="width: 50px; height: 50px; border-radius: 50%"
        />
        <h2 style="margin-top: 15px">帮帮Space</h2>
      </div>
      <p style="margin-top: 15px">
        帮帮Space是由我们团队研发的一款旨在解决用户问题麻烦的小程序，平台提供在需要帮忙时发布帮忙、以及闲暇时间接取帮忙任务，以及帮友之间的话题讨论互动等功能，在充实用户的日常生活的同时还可以获得一份不小的收益。
      </p>
      <h3 style="font-weight: 500; margin-top: 10px">功能介绍：</h3>
      <ul>
        <li>
          用户可以点击发布按钮，选择发布帮忙或者帖子。如果你有困难复杂问题，则点击发布帮忙，等待其他用户接单即可。如果你需要发布动态，则按照相关内容进行填写发布就可以了。
        </li>
        <li>
          在帮友圈中，用户可以对帖子进行点赞、收藏、评论等功能，同时可以加入热议话题，在话题中找到志同道合的朋友来扩大自己的交友圈以获得更多资源。
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import BangNav from '@/components/bangNav.vue'
</script>
<style scoped lang="scss">
.bang-info {
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 15px;
  height: 100vh;
  font-size: 20px;
}
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
h3 {
  font-size: 20px;
  margin-bottom: 10px;
}
ul {
  list-style: disc;
  margin-left: 20px;
  margin-bottom: 10px;
}
li {
  margin-bottom: 5px;
}
</style>
