<template>
  <div class="archives">
    <h2>归档</h2>
    <div class="archive" v-for="(item, index) in currentArchives" :key="index">
      <h2 class="title">{{ item.year }}</h2>
      <ul class="list">
        <li class="archive-item" v-for="(post, i) in item.list">
          <router-link
            class="link"
            :to="post.path"
          >{{ post.title }}</router-link>
          <span class="date">{{ timeFormat(post.date) }}</span>
        </li>
      </ul>
    </div>
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
import { timeFormat as _timeFormat } from '../../utils';
import {
  archivePaginations,
  archivePageSize as pageSize,
  archiveTotal as total
} from '@temp/vuepress_blog/archive-pagination'

const currentPage = ref(1)
const currentArchives = computed(() => archivePaginations[currentPage.value - 1])
const timeFormat = (date) => _timeFormat(date, 'YYYY-MM-DD')
</script>