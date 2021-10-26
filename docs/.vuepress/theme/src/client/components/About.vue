<template>
  <main class="about">
    <div class="theme-default-content">
      <h2 class="title">{{ title }}</h2>
      <Content />
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, Ref } from 'vue'
import { usePageData } from '@vuepress/client'

const page = usePageData() as unknown as Ref<{
  title: string
  frontmatter: {
    title: string
  },
}>

const title = computed(() => page.value.title || page.value.frontmatter.title)
</script>