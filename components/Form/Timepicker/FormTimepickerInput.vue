<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  minValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const displayValue = computed(() => String(props.modelValue).padStart(2, '0'));

function onInput(e) {
  const raw = e.target.value.replace(/\D/g, '');
  const num = parseInt(raw, 10);
  if (!isNaN(num)) {
    emit('update:modelValue', Math.min(Math.max(num, props.minValue), props.maxValue));
  }
}

function onKeydown(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    const next = props.modelValue >= props.maxValue ? props.minValue : props.modelValue + 1;
    emit('update:modelValue', next);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    const prev = props.modelValue <= props.minValue ? props.maxValue : props.modelValue - 1;
    emit('update:modelValue', prev);
  }
}

function onBlur(e) {
  const raw = e.target.value.replace(/\D/g, '');
  const num = parseInt(raw, 10);
  const clamped = isNaN(num) ? props.minValue : Math.min(Math.max(num, props.minValue), props.maxValue);
  emit('update:modelValue', clamped);
}
</script>

<template>
  <input
    class="form-timepicker-input"
    type="text"
    inputmode="numeric"
    :value="displayValue"
    @input="onInput"
    @keydown="onKeydown"
    @blur="onBlur"
  />
</template>

<style scoped lang="scss">
.form-timepicker-input {
  width: 3.75rem;
  height: 3.75rem;
  font-size: 2rem;
  text-align: center;
  border: var(--planastico-border-s);
  border-radius: 16px;

  &:focus-visible {
    background: var(--planastico-soft-yellow);
    border: var(--planastico-border-s);
    box-shadow: var(--planastico-shadow);
    outline: none;
  }
}
</style>
