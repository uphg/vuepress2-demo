import { ref, onMounted, onBeforeUnmount, nextTick, inject, computed } from 'vue'
import type { Ref } from 'vue'
import { usePageData } from '@vuepress/client'
import { getHeaderFlats } from '../utils/header-flat'
import debounce from 'lodash.debounce'
import isServer from '../utils/isServer'

const TOLERANCE_RATE = 2

export const useToc = () => {
  const page = usePageData()
  const headerFlats = getHeaderFlats(page.value.headers)
  const activeIndex = ref(0)
  const headerDoms = ref<HTMLElement[]>([])
  const pageEl = inject<Ref<HTMLElement>>('pageEl')
  const contentHeight = computed(() => pageEl?.value?.clientHeight || 0)

  const getHeaderDoms = (headers) => headers.map(({ slug }) => pageEl?.value.querySelector(`#${slug}`))
  const activeLink = index => {
    activeIndex.value = index
  }

  // 当前窗口可视区域高度
  const viewHeight = isServer ? 0 : Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientHeight)

  const onScroll = () => {
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    let headerIndex = 0
    let minOffsetTop = Math.floor(headerDoms.value[0].offsetTop - scrollTop - TOLERANCE_RATE)

    if (scrollTop >= (contentHeight.value - viewHeight)) {
      // 滚动到最底部的情况
      activeLink(headerDoms.value.length - 1)
    } else if (minOffsetTop > 0) {
      // 没有到达第一个标题之前
      activeLink(-1)
    } else if (minOffsetTop <= 0) {
      if (headerDoms.value.length !== 1) {
        // 滚动到第一个标题之后的情况
        for (let i = 0; i < headerDoms.value.length - 1; i++) {
          const next = headerDoms.value[i + 1]
          const nextTop = next.offsetTop - scrollTop - TOLERANCE_RATE
          // 只有当前高度与下一个元素高度都小于 0 时才做大小判断
          if (minOffsetTop < 0 && nextTop < 0 && nextTop > minOffsetTop) {
            headerIndex = i + 1
            minOffsetTop = nextTop
          }
        }
      }
      activeLink(headerIndex)
    }

    // 处理标题过多无法全部展示的情况
    autoScrollToc()
  }

  const _onScroll = debounce(onScroll, 250, { leading: true })

  onMounted(() => {
    if (isServer) return
    headerDoms.value = getHeaderDoms(headerFlats)
    if (headerDoms.value.length < 1) return
    window.addEventListener('scroll', _onScroll)
  })

  onBeforeUnmount(() => {
    if (isServer || headerDoms.value?.length < 1) return
    window.removeEventListener('scroll', _onScroll)
  })

  return {
    headerFlats,
    activeIndex,
    onScroll
  }
}

export const autoScrollToc = () => {
  nextTick(() => {
    const tocHeight = document.querySelector('.vuepress-toc')?.clientHeight || 0
    const tocWrap = document.querySelector('.vuepress-toc > .toc-wrap') as HTMLElement
    const currentTocLink = document.querySelector('.vuepress-toc > .toc-wrap > .toc-item.active')
    const activeTocOffsetTop = (currentTocLink as HTMLElement)?.offsetTop || 0
    const centralTop = tocHeight / 2

    if (activeTocOffsetTop > centralTop) {
      tocWrap.style.transform = `translateY(-${(activeTocOffsetTop - centralTop) || 0}px)`
    } else {
      tocWrap.style.transform = `translateY(0px)`
    }
  })
}