<template>
  <a
    class="post-item"
    :href="withBase(item.path)"
  >
    <h2 class="title">
      <span :title="item.title">{{ item.title }}</span>
    </h2>
    <p class="description" v-if="item.description">{{item.description}}</p>
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

<style lang="scss">
.post-item {
  color: inherit;
  text-decoration: inherit;
  display: block;
  padding: 1em 0;
  // margin-bottom: 1em;
  &:not(:last-child) {
    border-bottom: 1px solid var(--c-border);
  }
  .title {
    margin: 0;
    border: none;
    font-size: 18px;
    // font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 8px;
  }
  .description {
    font-size: 14px;
    color: #86909c;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 10px;
  }
  .meta {
    font-size: 14px;
    color: #86909c;
    display: flex;
    align-items: center;
  }
}
.post-item .divider {
  display: inline-flex;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
  background-color: var(--c-border);
}
</style>