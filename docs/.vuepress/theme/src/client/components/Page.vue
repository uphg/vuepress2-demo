<template>
  <main class="page">
    <slot name="top" />
    <PageHeader />
    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import PageHeader from './PageHeader.vue';
</script>
