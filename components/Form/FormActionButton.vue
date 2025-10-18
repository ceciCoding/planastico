<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "accept",
    validator: (value) => ["accept", "cancel"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const copy = {
  accept: "Aceptar",
  cancel: "Cancelar",
};

const emit = defineEmits(["accept", "cancel"]);
</script>

<template>
  <button
    class="form-action-button"
    :class="`form-action-button--${props.type}`"
    :disabled="props.disabled"
    @click="emit(props.type)"
  >
    <IconCheck v-if="props.type === 'accept'" />
    <IconClose v-if="props.type === 'cancel'" />
    <span>{{ copy[props.type] }}</span>
  </button>
</template>

<style lang="scss">
.form-action-button {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  flex: 1;
  background: var(--planastico-warm-soft-gray);
  border-bottom: var(--planastico-border-m);

  &--accept {
    border-bottom-right-radius: var(--planastico-border-radius);
    border-right: var(--planastico-border-m);
    justify-content: flex-end;
  }

  &--cancel {
    border-bottom-left-radius: var(--planastico-border-radius);
    border-left: var(--planastico-border-m);
    justify-content: flex-start;
  }

  &:focus-visible {
    outline-offset: -8px;
  }
}
</style>
