<template>
  <router-link
    class="post-item"
    :to="item.path"
  >
    <h2 class="title">
      <span :title="item.title">{{ item.title }}</span>
    </h2>
    <p class="description" v-if="item.description">{{item.description}}</p>
    <div class="meta">
      <template v-if="item.date">
        <span class="date">{{ timeFromNow(item.date || 0) }}</span>
        <span v-if="item.tags && item.tags.length > 0" class="divider"></span>
      </template>
      <template v-for="(tag, index) in item.tags" :key="index">
        <span v-if="index !== 0" class="divider"></span>
        <span class="tag-item">{{ tag }}</span>
      </template>
    </div>
  </router-link>
</template>

<script setup lang="ts">
// import { withBase } from '@vuepress/client'
import { timeFromNow } from '../../utils'
import { PostType } from '../../shared'

defineProps<{
  item: PostType
}>()
</script>
