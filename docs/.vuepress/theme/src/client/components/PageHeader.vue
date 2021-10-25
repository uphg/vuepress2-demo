<template>
  <div class="page-header">
    <h2 class="page-title">{{ title }}</h2>
    <div class="meta">
      <span class="date">{{ displayTime(page.frontmatter.date || 0) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { usePageData, useSiteData, withBase } from '@vuepress/client'
import { displayTime } from '../utils'

const page = usePageData() as unknown as Ref<{
  title: string,
  frontmatter: {
    title: string,
    date: string | number
  },
}>

const title = computed(() => page.value.title || page.value.frontmatter.title)
</script>

<style lang="scss">
@import '../styles/_wrapper';
@import '../styles/mixins';
.page-header {
  @extend %wrapper;
}

.page-title {
  margin: 1em 0 0;
  font-size: 2em;
  padding-bottom: 0;
  border: none;
  // @include text-ellipsis;
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