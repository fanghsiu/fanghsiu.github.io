<script lang="ts" setup>
// import { usePagination } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

function usePagination(options: {
  /**
   * Post 总数
   */
  total: number
  /**
   * 每页数量
   */
  pageSize: number
}) {
  const route = useRoute()
  const curPage = computed<number>(() => Number.parseInt((route.params as { page: string }).page || '1'))

  const totalPages = computed(() => Math.ceil(options.total / options.pageSize))

  /**
   * 围绕的长度
   */
  const surLen = computed(() => {
    if (curPage.value === 1 || curPage.value === totalPages.value)
      return 3
    else
      return 2
  })

  function showPage(i: number) {
    if (i === 1)
      return true
    else if (i === totalPages.value)
      return true
    return i > curPage.value - surLen.value && i < curPage.value + surLen.value
  }

  function getTo(i: number) {
    if (i === 1)
      return '/page/1'
    else return `/page/${i}`
  }

  const prevTo = computed(() => {
    return getTo(curPage.value - 1)
  })
  const nextTo = computed(() => {
    return getTo(curPage.value + 1)
  })

  const showPrev = computed(() => curPage.value > 1)
  const showNext = computed(() => curPage.value < totalPages.value)

  return {
    curPage,
    totalPages,
    showPage,
    surLen,

    getTo,
    prevTo,
    nextTo,
    showPrev,
    showNext,
  }
}

const props = defineProps<{
  /**
   * Total Pages
   */
  total: number
  /**
   * Page Size
   */
  pageSize: number
}>()

const { curPage, totalPages, showPage, getTo, surLen, prevTo, nextTo, showPrev, showNext } = usePagination({
  total: props.total,
  pageSize: props.pageSize,
})

defineExpose({
  curPage,
})
</script>

<template>
  <nav class="pagination">
    <RouterLink v-if="showPrev" class="page-number" :to="prevTo" aria-label="prev">
      <div i-ri-arrow-left-s-line />
    </RouterLink>

    <template v-for="i in totalPages">
      <RouterLink
        v-if="showPage(i)" :key="i" class="page-number"
        :class="curPage === i && 'active'"
        :to="getTo(i)"
      >
        {{ i }}
      </RouterLink>
      <span v-else-if="i === curPage - surLen" :key="`prev-space-${i}`" class="space" disabled>
        ...
      </span>
      <span v-else-if="i === curPage + surLen" :key="`next-space-${i}`" class="space" disabled>
        ...
      </span>
    </template>

    <RouterLink v-if="showNext" class="page-number" :to="nextTo" aria-label="next">
      <div i-ri-arrow-right-s-line />
    </RouterLink>
  </nav>
</template>

<style lang="scss">
:root {
  --page-btn-bg-color: rgb(255 255 255 / 0.5);
  --page-btn-hover-bg-color: var(--va-c-primary-lighter);
  --page-btn-active-bg-color: var(--va-c-primary-light);
}

.dark {
  --page-btn-bg-color: var(--va-c-bg-light);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  .prev, .next, .page-number, .space {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin: 0;

    // disabled attr
    &[disabled] {
      color: var(--va-c-text-light);
      background-color: var(--va-c-bg-mute);
    }
  }

  .prev, .next, .page-number {
    cursor: pointer;
    color: var(--va-c-text);
    text-decoration: none;
    background-color: var(--page-btn-bg-color);

    &:hover {
      // color: var(--va-c-bg);
      color: white;
      background: var(--page-btn-hover-bg-color);
    }

    &:active {
      // color: var(--va-c-bg);
      color: white;
      background: var(--page-btn-active-bg-color);
    }

    &.active {
      // color: var(--va-c-bg);
      color: white;
      font-weight: normal;
      background: var(--page-btn-active-bg-color);
      cursor: default;
    }

  }
}
</style>
