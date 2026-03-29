<script setup lang="ts">
  withDefaults(
    defineProps<{
      src: string;
      alt: string;
      width?: number | string;
      height?: number | string;
      sizes?: string;
      fit?: 'cover' | 'contain' | 'fill';
    }>(),
    {
      fit: 'cover',
    }
  );
</script>

<template>
  <NuxtImg
    class="base-image"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
  />
</template>

<style scoped lang="scss">
  .base-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: v-bind(fit);
  }
</style>
