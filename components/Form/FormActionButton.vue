<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'accept',
      validator: (value) => ['accept', 'cancel'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['accept', 'cancel']);
</script>

<template>
  <button
    class="form-action-button"
    :class="`form-action-button--${props.type}`"
    :type="props.type === 'accept' ? 'submit' : 'button'"
    :aria-label="props.type === 'accept' ? 'Aceptar' : 'Cancelar'"
    :disabled="props.disabled"
    @click="props.type === 'cancel' ? emit('cancel') : undefined"
  >
    <IconCheck v-if="props.type === 'accept'" aria-hidden="true" />
    <IconClose v-if="props.type === 'cancel'" aria-hidden="true" />
  </button>
</template>

<style lang="scss">
  .form-action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    flex: 1;
    background: var(--planastico-warm-soft-gray);
    border-bottom: var(--planastico-border-m);

    &--accept {
      background: var(--planastico-cold-black);
      border-bottom-right-radius: var(--planastico-border-radius-m);
      border-right: var(--planastico-border-m);

      svg {
        color: var(--planastico-white);
      }
    }

    &--cancel {
      border-bottom-left-radius: var(--planastico-border-radius-m);
      border-left: var(--planastico-border-m);
    }

    &:focus-visible {
      outline-offset: -8px;
    }
  }
</style>
