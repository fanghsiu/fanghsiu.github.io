<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'

useHead({ meta: [{ name: 'referrer', content: 'no-referrer' }] })
const gallery = defineAsyncComponent(() => import('valaxy-theme-yun/layouts/gallery.vue'))
</script>

<template>
  <gallery></gallery>
</template>
