<script setup lang="ts">
  import { defineProps, computed, type PropType } from 'vue';

  type BaseButtonColor = 'yellow' | 'soft-yellow' | 'white' | 'cold-black';
  type BaseButtonType = 'button' | 'submit' | 'reset';

  const props = defineProps({
    type: {
      type: String as PropType<BaseButtonType>,
      default: 'button',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    color: {
      type: String as PropType<BaseButtonColor>,
      default: 'yellow',
      validator: (value: string) => {
        return ['yellow', 'soft-yellow', 'white', 'cold-black'].includes(value);
      },
    },
  });

  const emits = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();

  const colorClass = computed<string>(() => `base-button--${props.color}`);
</script>

<template>
  <button
    :class="['base-button', colorClass]"
    :type="props.type"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot name="leading-icon" />
    <slot />
    <slot name="trailing-icon" />
  </button>
</template>

<style scoped lang="scss">
  .base-button {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    border: var(--planastico-border-s);
    border-radius: var(--planastico-border-radius-l);
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: var(--planastico-shadow);

    &:active:not(:disabled) {
      box-shadow: none;
      transform: translateY(2px);
    }

    &:disabled {
      background-color: var(--planastico-warm-soft-gray-shade);
      color: var(--planastico-cold-black-shade);
      cursor: not-allowed;
      border: 1px solid var(--planastico-cold-black);
    }

    &--yellow {
      background-color: var(--planastico-yellow);
    }

    &--soft-yellow {
      background-color: var(--planastico-soft-yellow);
    }

    &--white {
      background-color: var(--planastico-white);
    }

    &--cold-black {
      background-color: var(--planastico-cold-black);
      color: var(--planastico-white);
    }
  }
</style>
