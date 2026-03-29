<script setup lang="ts">
  withDefaults(
    defineProps<{
      label: string;
      variant?: 'category' | 'price';
    }>(),
    {
      variant: 'category',
    }
  );
</script>

<template>
  <span
    class="base-badge"
    :class="`base-badge--${variant}`"
  >
    {{ label }}
  </span>
</template>

<style scoped lang="scss">
  .base-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 24px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    border: var(--planastico-border-s);

    &--category {
      background-color: var(--planastico-soft-yellow);
      color: var(--planastico-cold-black);
    }

    &--price {
      background-color: var(--planastico-cold-black);
      color: var(--planastico-white);
      border-color: var(--planastico-cold-black);
    }
  }
</style>
