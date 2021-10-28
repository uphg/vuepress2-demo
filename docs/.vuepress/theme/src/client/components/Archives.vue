<template>
  <div class="archives">
    <h2 class="column-title">归档</h2>
    <Archive
      v-for="(item, index) in currentArchives"
      :item="item"
      :key="index"
    />
    <Pagination
      v-model:page="currentPage"
      :page-size="pageSize"
      :total="total"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Pagination from './Pagination.vue'
import {
  archivePaginations,
  archivePageSize as pageSize,
  archiveTotal as total
} from '@temp/vuepress_blog/archive-pagination'
import Archive from './Archive.vue';
import type { ArchiveType } from '../../shared'

const currentPage = ref(1)
const currentArchives = computed<ArchiveType[]>(() => archivePaginations[currentPage.value - 1])
</script>
