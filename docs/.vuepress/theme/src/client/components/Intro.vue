<script setup lang="ts">
import { computed } from 'vue'
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase
} from '@vuepress/client'

const site = useSiteLocaleData()
const frontmatter = usePageFrontmatter()
const avatar = frontmatter.value.avatar as string

const description = computed(() => site.value?.description || frontmatter.value?.description)
</script>

<template>
  <div class="intro">
    <div class="avatar" v-if="avatar">
      <a class="avatar-link" href="">
        <img class="avatar-img" :src="withBase(avatar)" alt="个人头像">
      </a>
    </div>
    <p class="description" v-if="description">{{ description }}</p>
  </div>
</template>
