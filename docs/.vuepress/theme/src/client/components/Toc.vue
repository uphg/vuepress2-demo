<template>
  <div class="vuepress-toc">
    <div
      v-for="(item, index) in headerFlats"
      :key="index"
      :class="[
        `vuepress-toc-h${item.level}`,
        { active: activeIndex === index },
      ]"
    >
      <a :href="`#${item.slug}`" :title="item.title">{{ item.title }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageData } from '@vuepress/client'
import { useHeaderFlats } from '../utils/header-flat'

const page = usePageData()
const headerFlats = useHeaderFlats(page.value.headers)
const activeIndex = ref(0)
console.log('headerFlats')
console.log(headerFlats)
</script>