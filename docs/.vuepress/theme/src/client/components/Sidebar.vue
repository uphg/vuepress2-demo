<template>
  <aside class="sidebar">
    <NavbarLinks />

    <slot name="top" />

    <slot name="bottom" />
  </aside>
</template>

<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
</script>