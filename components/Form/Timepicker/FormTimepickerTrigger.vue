<script setup>
const props = defineProps({
  time: {
    type: String,
    default: "",
  },
  roundedCorner: {
    type: String,
    default: "right",
  }
});
const placeholder = "hh:mm";
const value = computed(() => props.time.length ? props.time : placeholder);
</script>

<template>
  <button class="form-timepicker-trigger" :class="`form-timepicker-trigger--${props.roundedCorner}`">
    <IconClock />
    <span class="form-timepicker-trigger__value">{{ value }}</span>
  </button>
</template>

<style scoped>
.form-timepicker-trigger {
  background: var(--planastico-warm-soft-gray);
  border-bottom: 6px solid var(--planastico-cold-black);
  height: 50px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.form-timepicker-trigger--left {
  border-radius: 14px 0 0 0;
}

.form-timepicker-trigger--right {
  border-radius: 0 14px 0 0;
}
</style>