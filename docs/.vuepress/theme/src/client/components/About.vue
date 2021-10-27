<template>
  <main class="about">
    <h2 class="column-title">{{ title }}</h2>
    <div class="theme-default-content">
      <Content />
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, Ref } from 'vue'
import { usePageData } from '@vuepress/client'
import ColumnTitle from './ColumnTitle.vue'

const page = usePageData() as unknown as Ref<{
  title: string
}>

const title = computed(() => page.value.title )
</script>