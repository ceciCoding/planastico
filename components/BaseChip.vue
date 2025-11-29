<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const state = ref(props.modelValue);
  const emit = defineEmits(['update:modelValue']);

  function handleClick() {
    state.value = !state.value;
    emit('update:modelValue', state.value);
  }
</script>

<template>
  <button
    class="base-chip"
    :class="{ 'base-chip--active': state }"
    type="button"
    :aria-pressed="String(state)"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<style lang="scss">
  .base-chip {
    font-size: 0.875rem;
    padding: 7px 14px;
    border-radius: 24px;
    box-shadow: var(--planastico-shadow);
    cursor: pointer;
    transition: all 0.1s ease;

    &--active {
      background-color: var(--planastico-soft-yellow);
      border: var(--planastico-border-s);
      box-shadow: none;
    }
  }
</style>
