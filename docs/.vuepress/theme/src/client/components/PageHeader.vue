<script setup lang="ts">
import { computed } from 'vue'
import { usePageData, useSiteData, withBase } from '@vuepress/client'
import { displayTime } from '../utils'

const { title, author, frontmatter } = usePageData()
const site = useSiteData()
console.log('site.value')
console.log({...site.value})

const getAuthor = computed(() => frontmatter.value.author || author.value) 
</script>

<template>
  <div class="page-header">
    <h2 class="page-title">{{ title }}</h2>
    <div class="meta">
      <span class="author">{{ getAuthor }}</span>
      <span>&nbsp;发布于&nbsp;</span>
      <span class="date">{{ displayTime(frontmatter.date || 0) }}</span>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  /* text-align: center; */
  padding: 2em 0;
}

.page-title {
  margin: 1em 0 0;
  font-size: 2em;
}
.page-header .meta {
  padding-top: 1em;
  color: #909090;
  font-size: 14px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.author {
  color: var(--c-text);
}
</style>