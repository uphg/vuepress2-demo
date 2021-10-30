<template>
  <div class="tags">
    <h2 class="column-title">标签</h2>
    <section class="tags-content">
      <button
        v-for="(item, index) in tags"
        :key="index"
        :class="[
          'tag-button',
          { 'is-active': activeIndex === index }
        ]"
        @click="onClickTag(item, index)"
      >{{ item }}</button>
    </section>
    <div class="tag-archives">
      <Archive
        :item="item"
        v-for="(item, index) in currentArchives"
        :key="index"
      />
      <Pagination
        v-model:page="currentPage"
        :page-size="pageSize"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tags, tagPages } from '@temp/vuepress_blog/tags'
import { createArchivePaginations } from '../../utils'
import type { ArchiveType } from '../../shared'
import Archive from './Archive.vue';
import Pagination from './Pagination.vue'

const route = useRoute()
const router = useRouter()

const pageSize = 20
const activeIndex = ref(-1)
const currentPage = ref(1)

const onClickTag = (activeTag, index) => {
  setQueryTag(activeTag)
  setTagIndex(index)
}

const setTagIndex = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
  if (!(currentArchives.value && currentArchives.value.length > 0)) {
    currentPage.value = 1
  }
}

const setQueryTag = (activeTag) => {
  if (route?.query?.activeTag === activeTag) {
    router.push({ query: {} })
  } else {
    router.push({ query: { activeTag } })
  }
}

const currentPosts = computed(() => {
  return activeIndex.value >= 0 ? tagPages.filter((post) => {
    return post?.tags?.includes(tags[activeIndex.value])
  }) || [] : tagPages
})

const archivePaginations = computed(() => createArchivePaginations(currentPosts.value, pageSize))
const total = computed(() => currentPosts.value.length)
const currentArchives = computed<ArchiveType[]>(() => archivePaginations.value[currentPage.value - 1])

onMounted(() => {
  if (!route?.query?.activeTag) return
  const index = tags.findIndex((item) => item === route.query.activeTag)

  if (index === -1) return
  setTagIndex(index)
})
</script>