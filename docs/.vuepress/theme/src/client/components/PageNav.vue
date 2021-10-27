<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <p class="inner">
      <span v-if="prevNavLink" class="prev">
        <ArrowIosLeft class="prev-icon" />
        <NavLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <NavLink :item="nextNavLink" />
        <ArrowIosRight class="next-icon" />
      </span>
    </p>
  </nav>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { usePageData } from '@vuepress/client'
import { simplePages } from '@temp/vuepress_blog/simple-pages'
import NavLink from './NavLink.vue'
import ArrowIosLeft from './icons/ArrowIosLeft.vue'
import ArrowIosRight from './icons/ArrowIosRight.vue'

const page = usePageData() as Ref<{ path: string }>

const prevNavLink = computed(() => {
  if (!(simplePages.length > 0)) return false

  for (let i = 0; i < simplePages.length; i++) {
    if(simplePages[i].path === page.value.path) {
      const prev = simplePages[i - 1]
      return i > 0 ? {
        text: prev.title,
        link: prev.path,
      } : false
    }
  }
})

const nextNavLink = computed(() => {
  if (!(simplePages.length > 0)) return false

  for (let i = 0; i < simplePages.length; i++) {
    if(simplePages[i].path === page.value.path) {
      const next = simplePages[i + 1]
      return i < simplePages.length - 1 ? {
        text: next.title,
        link: next.path,
      } : false
    }
  }
})
</script>
