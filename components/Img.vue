<script lang="ts" setup>
const props = defineProps<{
  src?: string
}>()
</script>

<template>
  <figure>
    <img referrerpolicy="no-referrer" :src="props.src" alt="" loading="lazy" decoding="async" class="medium-zoom-image" />
  </figure>
</template>