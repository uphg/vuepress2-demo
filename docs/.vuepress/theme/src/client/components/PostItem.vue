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
        <span class="tag-item" @click.prevent="onClickTag(tag)">{{ tag }}</span>
      </template>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { timeFromNow } from '../../utils'
import { PostType } from '../../shared'
import { useRouter, useRoute } from 'vue-router'

defineProps<{
  item: PostType
}>()

const router = useRouter()
const route = useRoute()

console.log('route')
console.log(route)

const onClickTag = (tag) => {
  router.push({
    path: '/tags/'
  })
}
</script>
