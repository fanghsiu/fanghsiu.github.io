<script lang="ts" setup>
import { isDark } from 'valaxy'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

// @ts-expect-error vue waline component type
import { Waline } from '@waline/client/component'
import { commentCount, pageviewCount } from '@waline/client'
import { getEmojis } from 'valaxy-addon-waline'

import '@waline/client/style'
import type { WalineOptions } from 'valaxy-addon-waline'

const props = defineProps<{
  options: WalineOptions
}>()

const types = ['alus', 'bilibili', 'qq']

const route = useRoute()
const { locale } = useI18n()
const path = computed(() => props.options.path || route.path.replace(/\/$/, ''))
const emoji = props.options.emoji || computed(() => getEmojis(props.options.cdn, types))

onMounted(() => {
  const { pageview, comment } = props.options

  if (pageview) {
    pageviewCount({
      serverURL: props.options.serverURL,
      path: path.value,
      selector: typeof pageview === 'string' ? pageview : undefined,
    })
  }

  if (comment) {
    commentCount({
      serverURL: props.options.serverURL,
      path: path.value,
      selector: typeof comment === 'string' ? comment : undefined,
    })
  }
})
</script>

<template>
  <Waline v-bind="options" :server-u-r-l="options.serverURL" :lang="locale" :path="path" :dark="isDark"
    :emoji="emoji" />
</template>

<style>
:root {
  --waline-theme-color: var(--va-c-primary);
  --waline-active-color: var(--va-c-primary-light);
}
</style>
