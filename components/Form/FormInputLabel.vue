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
  });
</script>

<template>
  <label
    :for="props.inputId"
    class="form-input-label"
    :class="{ 'sr-only': !props.isVisible }"
    :style="{ color: props.color }"
  >
    {{ label }}
    <span v-if="props.required">*</span>
  </label>
</template>

<style lang="scss">
  .form-input-label {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
</style>
