<template>
  <div class="archive">
    <h2 class="title">{{ item.year }}</h2>
    <ul class="list">
      <li
        class="archive-item"
        v-for="(post, index) in item.list"
        :key="index"
      >
        <span class="date">{{ timeFormat(post.date) }}</span>
        <router-link
          class="link"
          :to="post.path"
        >{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { timeFormat as _timeFormat } from '../../utils';
import type { ArchiveType } from '../../shared'

defineProps({
  item: {
    type: Object as PropType<ArchiveType>,
    required: true,
  }
})

const timeFormat = (date) => _timeFormat(date, 'MM-DD')
</script>