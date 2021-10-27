<template>
  <main class="home">
    <div class="home-content">
      <Intro />
      <div class="posts">
        <PostItem
          v-for="(post, index) in currentPosts"
          :key="index"
          :item="post"
        />
      </div>
      <Pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :total="total"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Intro from './Intro.vue';
import PostItem from './PostItem.vue'
import Pagination from './Pagination.vue'
import {
  postPaginations,
  postPageSize as pageSize,
  postTotal as total
} from '@temp/vuepress_blog/post-pagination'

const currentPage = ref(1)
const currentPosts = computed(() => postPaginations[currentPage.value - 1])
</script>