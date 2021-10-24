<template>
  <div class="posts">
    <div class="post-item">
      <div class="title"><span>{{}}</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  posts: {
    path: string,
    title: string,
    date: string | Date,
    tags: string[]
  }[]
}>()
</script>