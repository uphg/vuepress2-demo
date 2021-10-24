<template>
  <main class="home">
    <div class="home-content">
      <Intro />
      <!-- <Posts :posts="" /> -->
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from '@vuepress/client'
import Intro from './Intro.vue';
import { posts } from '@temp/vuepress_blog/posts'
// import Posts from './Posts.vue';

console.log('posts')
console.log(posts)

const frontmatter = usePageFrontmatter()
</script>