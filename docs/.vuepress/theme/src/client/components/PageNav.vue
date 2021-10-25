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
import NavLink from './NavLink.vue'
import ArrowIosLeft from './icons/ArrowIosLeft.vue'
import ArrowIosRight from './icons/ArrowIosRight.vue'

const prevNavLink = {
  text: '上一个',
  link: '/'
}
const nextNavLink = {
  text: '下一个',
  link: '/'
}
</script>

<style lang="scss">
.page-nav {
  .prev, .next {
    display: inline-flex;
    align-items: center;
  }
  .prev-icon, .next-icon {
    width: 0.9em;
    height: 0.9em;
  }
  .inner .nav-link {
    line-height: 1;
  }
}

</style>
