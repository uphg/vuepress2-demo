<template>
  <div class="posts">
    <BlogItem
      v-for="(blog, index) in posts"
      :key="index"
      :item="blog"
    />
  </div>
  <Pagination
    v-model:page="currentPage"
    :page-size="pageSize"
    :total="total"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  posts: {
    path: string,
    title: string,
    date: string | Date,
    tags: string[]
  }[]
}>()

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(999)
</script>