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

<style lang="scss">
.pagination {
  text-align: center;
  padding-top: 3em;
  display: flex;
  .button-number, .button-next, .button-prev {
    cursor: pointer;
    padding: 0 5px;
    margin: 0 5px;
    min-width: 30px;
    height: 30px;
    line-height: 28px;
    box-sizing: border-box;
    border: 1px solid var(--c-border);
    border-radius: 5px;
    background-color: var(--c-bg);
  }
  .button-number {
    &:hover {
      border-color: var(--c-text-lighter);
    }
    &.active {
      color: #fff;
      background-color: var(--c-brand);
      border-color: var(--c-brand);
    }
  }
  .button-next, .button-prev {
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
      width: 1em;
      height: 1em;
    }
  }
}
</style>
