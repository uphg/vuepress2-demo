<template>
  <div class="tags">
    <h2 class="column-title">标签</h2>
    <section class="tags-content">
      <button
        v-for="(item, index) in tags"
        :key="index"
        :class="[
          'tag-button',
          { 'is-active': tagsIndex === index }
        ]"
        @click="onClickTag(index)"
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
import { ref, computed } from 'vue'
import { tags, tagPages } from '@temp/vuepress_blog/tags'
import { createArchivePaginations } from '../../utils'
import type { ArchiveType } from '../../shared'
import Archive from './Archive.vue';
import Pagination from './Pagination.vue'

const pageSize = 20
const tagsIndex = ref(-1)
const currentPage = ref(1)

const onClickTag = (index) => {
  tagsIndex.value = tagsIndex.value === index ? -1 : index
  if (!(currentArchives.value && currentArchives.value.length > 0)) {
    currentPage.value = 1
  }
}

const currentPosts = computed(() => {
  return tagsIndex.value >= 0 ? tagPages.filter((post) => {
    const tag = tags[tagsIndex.value]
    return post?.tags?.includes(tag)
  }) || [] : tagPages
})

const archivePaginations = computed(() => createArchivePaginations(currentPosts.value, pageSize))
const total = computed(() => currentPosts.value.length)
const currentArchives = computed<ArchiveType[]>(() => archivePaginations.value[currentPage.value - 1])
</script>