<template>
  <main class="home">
    <div class="home-content">
      <Intro />
      <div class="posts">
        <PostItem
          v-for="(blog, index) in currentPosts"
          :key="index"
          :item="blog"
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
import { usePageFrontmatter } from '@vuepress/client'
import Intro from './Intro.vue';
import PostItem from './PostItem.vue'
import Pagination from './Pagination.vue'
// import { pages } from '@temp/vuepress_blog/pages'
import { paginationsPages, pageSize, total } from '@temp/vuepress_blog/paginations'
// import Posts from './Posts.vue';

const currentPage = ref(1)
const currentPosts = computed(() => paginationsPages[currentPage.value - 1])
</script>