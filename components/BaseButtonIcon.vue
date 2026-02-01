<script setup lang="ts">
  withDefaults(
    defineProps<{
      accessibleName: string;
      isNaked?: boolean;
      isDisabled?: boolean;
    }>(),
    {
      isNaked: false,
      isDisabled: false,
    }
  );

  const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="base-button-icon"
    :class="{
      'base-button-icon--naked': isNaked,
      'base-button-icon--disabled': isDisabled,
    }"
    :aria-label="accessibleName"
    :disabled="isDisabled"
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
    width: 1.7rem;
    height: 1.7rem;

    &:not(.base-button-icon--naked) {
      background: var(--planastico-warm-soft-gray);
      border: var(--planastico-border-s);
      border-radius: 50%;
      box-shadow: var(--planastico-shadow);

      &:active {
        box-shadow: none;
        transform: translateY(2px);
      }
    }

    &--disabled:not(.base-button-icon--naked) {
      box-shadow: none;
      transform: none;
      background: var(--planastico-soft-gray-shade);

      &:active {
        transform: none;
      }
    }

    &--disabled {
      cursor: not-allowed;
      color: var(--planastico-cold-black-shade);
      opacity: 0.7;
    }
  }
</style>
