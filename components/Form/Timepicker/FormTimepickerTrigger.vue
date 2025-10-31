<script setup>
  const props = defineProps({
    time: {
      type: String,
      default: '',
    },
    roundedCorner: {
      type: String,
      default: 'right',
    },
  });
  const placeholder = 'hh:mm';
  const value = computed(() => (props.time.length ? props.time : placeholder));
</script>

<template>
  <button
    class="form-timepicker-trigger"
    :class="`form-timepicker-trigger--${props.roundedCorner}`"
    aria-label="Seleccionar hora"
  >
    <IconClock />
    <span class="form-timepicker-trigger__value">{{ value }}</span>
  </button>
</template>

<style scoped lang="scss">
  .form-timepicker-trigger {
    background: var(--planastico-warm-soft-gray);
    border-bottom: var(--planastico-border-xl);
    height: 50px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: fit-content;

    &--left {
      border-radius: 14px 0 0 0;
    }

    &--right {
      border-radius: 0 14px 0 0;
    }
  }
</style>
