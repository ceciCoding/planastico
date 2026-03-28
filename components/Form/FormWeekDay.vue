<script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    fullLabel: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['toggle']);

  function toggleDay() {
    emit('toggle');
  }
</script>

<template>
  <button
    type="button"
    class="form-week-day"
    :class="{ 'form-week-day--selected': active }"
    :aria-label="fullLabel"
    :aria-pressed="String(active)"
    @click="toggleDay"
  >
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
  .form-week-day {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: var(--planastico-border-s);
    background: white;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background: var(--planastico-warm-soft-gray);
    }

    &--selected {
      background: var(--planastico-soft-yellow);
      border-color: var(--planastico-cold-black);
    }

    &:focus-visible {
      outline: 2px solid var(--planastico-cold-black);
      outline-offset: 2px;
    }
  }
</style>
