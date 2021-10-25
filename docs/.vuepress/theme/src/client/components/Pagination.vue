<template>
  <div v-if="total > pageSize" class="pagination">
    <button
      :disabled="page <= 1"
      @click="prev"
      class="button-prev"
    ><ArrowIosLeft /></button>
    <button
      v-for="item in pageTotal"
      :key="item"
      @click="setCurrentPage(item)"
      :class="[
        'button-number',
        { active: item === page }
      ]"
    >{{ item }}</button>
    <button
      :disabled="page >= pageTotal"
      @click="next"
      class="button-next"
    ><ArrowIosRight /></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ArrowIosLeft from './icons/ArrowIosLeft.vue'
import ArrowIosRight from './icons/ArrowIosRight.vue'

const props = withDefaults(defineProps<{
  total: number // 总条数
  page: number // 当前页
  pageSize?: number // 每页显示条目个数
}>(), {
  total: 0,
  page: 1,
  pageSize: 10,
})

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const setCurrentPage = (value: number) => {
  // 更新当前页
  emit('update:page', value)
}

const prev = () => {
  if (props.page <= 1) return
  setCurrentPage(props.page - 1)
}

const next = () => {
  if (props.page >= pageTotal.value) return
  setCurrentPage(props.page + 1)
}

const pageTotal = computed(() => Math.ceil(props.total / props.pageSize))
</script>
