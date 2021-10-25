<template>
  <a
    class="post-item"
    :href="withBase(item.path)"
  >
    <h2 class="title">
      <span :title="item.title">{{ item.title }}</span>
    </h2>
    <div class="meta">
      <template v-if="item.date">
        <span class="date">{{ displayTime(item.date || 0) }}</span>
        <span v-if="item.tags && item.tags.length > 0" class="divider"></span>
      </template>
      <template v-for="(tag, index) in item.tags" :key="index">
        <span v-if="index !== 0" class="divider"></span>
        <span class="tag-item">{{ tag }}</span>
      </template>
    </div>
  </a>
</template>

<script setup lang="ts">
import { withBase } from '@vuepress/client'
import { displayTime } from '../utils'
import { PostType } from '../../shared'


defineProps<{
  item: PostType
}>()
</script>

<style>
.post-item {
  color: inherit;
  text-decoration: inherit;
}
.post-item .divider {
  display: flex;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  background-color: var(--c-divider);
}
</style>