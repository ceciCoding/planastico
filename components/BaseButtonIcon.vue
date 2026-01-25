<script setup lang="ts">
  withDefaults(
    defineProps<{
      accessibleName: string;
      isNaked?: boolean;
    }>(),
    {
      isNaked: true,
    }
  );

  const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="base-button-icon"
    :class="{ 'base-button-icon--naked': isNaked }"
    :aria-label="accessibleName"
    type="button"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss">
  .base-button-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;

    &:not(&--naked) {
      background: var(--planastico-warm-soft-gray);
      border: var(--planastico-border-s);
      border-radius: 50%;
      box-shadow: var(--planastico-shadow);

      &:active {
        box-shadow: none;
        transform: translateY(2px);
      }
    }
  }
</style>
