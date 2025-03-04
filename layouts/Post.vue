<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'

useHead({ meta: [{ name: 'referrer', content: 'no-referrer' }] })
const post = defineAsyncComponent(() => import('valaxy-theme-yun/layouts/post.vue'))
</script>

<template>
  <post></post>
</template>
