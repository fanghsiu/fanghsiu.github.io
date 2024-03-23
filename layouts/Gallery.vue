<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import gallery from 'valaxy-theme-yun/layouts/gallery.vue'
useHead({ meta: [{ name: 'referrer', content: 'no-referrer' }] })
</script>

<template>
  <gallery></gallery>
</template>
