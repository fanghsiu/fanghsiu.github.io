<script lang="ts" setup>
const props = defineProps<{
  src: string
  alt: string
  caption: string
}>()
const src = props.src || ""
const alt = props.alt || ""
const caption = props.caption || ""
</script>

<template>
  <figure>
    <img referrerpolicy="no-referrer" :src="src" :alt="alt" loading="lazy" decoding="async" class="medium-zoom-image" />
    <figcaption v-if="caption != ''">{{ caption }}</figcaption>
  </figure>
</template>
