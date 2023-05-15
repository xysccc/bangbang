<template>
  <div class="container">
    <div style="height: 100px"></div>
    <header class="header"></header>
    <main class="main">
      <img
        class="image"
        src="https://picsum.photos/400/600"
        alt="随机图片"
        style="width: 100px; height: 100px; border-radius: 50%"
      />
      <div class="divider"></div>
      <ul class="list">
        <li class="item">
          <h2 class="item-title">标题1</h2>
          <p class="item-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </li>
      </ul>
    </main>
  </div>
  <BangNoData />
</template>
<script setup lang="ts">
import BangNoData from '@/components/bangNoData.vue'
</script>
