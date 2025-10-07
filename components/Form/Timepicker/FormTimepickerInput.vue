<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  minValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :value="modelValue"
    class="form-timepicker-input"
    type="number"
    :min="props.minValue"
    :max="props.maxValue"
    @input="(e) => emit('update:modelValue', e.target.value)"
  >
</template>

<style scoped lang="scss">
.form-timepicker-input {
  width: 3.75rem;
  height: 3.75rem;
  font-size: 2rem;
  text-align: center;
  border: 2px solid var(--planastico-cold-black);
  border-radius: 16px;

  &:focus-visible {
    background: var(--planastico-soft-yellow);
    border: 2px solid var(--planastico-cold-black);
    box-shadow: var(--planastico-shadow);
    outline: none;
  }
}
</style>

