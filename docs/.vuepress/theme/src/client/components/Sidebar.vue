<template>
  <aside class="sidebar">
    <NavbarLinks />

    <slot name="top" />

    <div class="sidebar-links">
      <!-- <Toc /> -->
    </div>

    <slot name="bottom" />
  </aside>
</template>

<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
// import Toc from './Toc.vue';
</script>