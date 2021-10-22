<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <p class="inner">
      <span v-if="prevNavLink" class="prev">
        ←
        <NavLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <NavLink :item="nextNavLink" />
        →
      </span>
    </p>
  </nav>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'

const prevNavLink = {
  text: 'prevLink',
  link: '/'
}
const nextNavLink = {
  text: 'nextLink',
  link: '/'
}
</script>
