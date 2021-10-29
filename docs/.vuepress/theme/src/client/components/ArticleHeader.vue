<template>
  <header class="article-header">
    <h1 class="title">{{ title }}</h1>
    <div class="meta">
      <template v-if="author">
        <span class="author">{{ author }}</span>
        <span>&nbsp;发布于&nbsp;</span>
      </template>
      <span class="date">{{ timeFromNow(page.frontmatter.date || 0) }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { usePageData } from '@vuepress/client'
import { timeFromNow } from '../../utils'
import { useThemeLocaleData } from '../composables'

const page = usePageData() as unknown as Ref<{
  title: string,
  author: string,
  frontmatter: {
    title: string,
    date: string | number,
    author: string,
  },
}>

const themeLocale = useThemeLocaleData()

const title = computed(() => page.value.title || page.value.frontmatter.title)
const author = computed(() => page.value.frontmatter?.author || themeLocale.value.author)
</script>
