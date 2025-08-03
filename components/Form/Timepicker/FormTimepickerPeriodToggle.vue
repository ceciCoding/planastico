<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-timepicker-period-toggle">
    <button
      class="form-timepicker-period-toggle__button"
      :class="{ 'form-timepicker-period-toggle__button--active': modelValue === 'AM' }"
      @click="emit('update:modelValue', 'AM')"
    >
      AM
    </button>
    <button
      class="form-timepicker-period-toggle__button"
      :class="{ 'form-timepicker-period-toggle__button--active': modelValue === 'PM' }"
      @click="emit('update:modelValue', 'PM')"
    >
      PM
    </button>
  </div>
</template>

<style scoped>
.form-timepicker-period-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
}
.form-timepicker-period-toggle__button {
  background: var(--planastico-warm-soft-gray);
  border: 2px solid var(--planastico-cold-black);
  border-radius: 8px;
  padding: 0 8px;
  font-weight: bold;
}

.form-timepicker-period-toggle__button--active {
  background: var(--planastico-cold-black);
  color: var(--planastico-warm-soft-gray);
}
</style>
