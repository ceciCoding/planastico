<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <input
    type="radio"
    :value="modelValue"
  />
</template>

<style></style>
