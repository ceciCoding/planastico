<script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div
    class="form-input-label"
    :class="{
      'sr-only ': !props.isVisible,
      'form-input-label--has-error': props.hasError,
    }"
  >
    <label
      :for="props.inputId"
      class="form-input-label__label"
      :style="{ color: props.color }"
    >
      {{ label }}
      <span v-if="props.required">*</span>
    </label>
    <slot name="description" />
  </div>
</template>

<style lang="scss">
  .form-input-label {
    margin-bottom: 0.5rem;

    &__label {
      font-size: 1.25rem;
      font-weight: 700;
    }

    &--has-error {
      color: var(--planastico-error-red);
    }
  }
</style>
