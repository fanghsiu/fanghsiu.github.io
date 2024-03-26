<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'

useHead({ meta: [{ name: 'referrer', content: 'no-referrer' }] })
const albums = defineAsyncComponent(() => import('valaxy-theme-yun/layouts/albums.vue'))
</script>

<template>
  <albums></albums>
</template>
