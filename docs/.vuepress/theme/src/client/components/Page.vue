<template>
  <main ref="pageRef" class="page">
    <slot name="top" />
    <article class="theme-default-content">
      <ArticleHeader />
      <Content />
    </article>

    <PageMeta />
    <PageNav />
    <Toc />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import ArticleHeader from './ArticleHeader.vue';
import Toc from './Toc.vue';
import { ref, onMounted, onBeforeUnmount, nextTick, provide, readonly } from 'vue'

const pageRef = ref(null)

provide('pageRef', readonly(pageRef))

onMounted(() => {
  document.documentElement.classList.add('smooth')
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('smooth')
})
</script>
