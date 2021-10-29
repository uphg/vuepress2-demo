<template>
  <div class="vuepress-toc">
    <div class="toc-wrap">
      <div
        v-for="(item, index) in headerFlats"
        :key="index"
        class="toc-item"
        :class="[
          `toc-h${item.level}`,
          { active: activeIndex === index },
        ]"
      >
        <a
          class="toc-link"
          :href="`#${item.slug}`"
          :title="item.title"
        >{{ item.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToc } from '../composables/useToc';

const { headerFlats, activeIndex } = useToc()
</script>