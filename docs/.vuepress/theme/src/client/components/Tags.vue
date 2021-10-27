<template>
  <div class="tags">
    <h2 class="column-title">标签</h2>
    <section class="tags-content">
      <button
        v-for="(item, index) in getTags"
        :key="index"
        :class="[
          'tag-button',
          { active: activeIndex === index }
        ]"
        @click="clickTag(index)"
      >{{ item }}</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const getTags = [
  'JavaScript',
  'Vue',
  'React',
  '前端',
  '周董',
  'Node.js'
]

const activeIndex = ref(0)

const clickTag = (index) => {
  activeIndex.value = index
}
</script>