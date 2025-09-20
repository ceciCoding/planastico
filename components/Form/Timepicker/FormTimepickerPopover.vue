<script setup>
import FormTimepickerInput from "./FormTimepickerInput.vue";
import FormTimepickerPeriodToggle from "./FormTimepickerPeriodToggle.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  hourModelValue: {
    type: [String, Number],
    required: true,
  },
  minuteModelValue: {
    type: [String, Number],
    required: true,
  },
  timePeriod: {
    type: String,
    default: "AM",
  },
});

const emit = defineEmits([
  "update:hourModelValue",
  "update:minuteModelValue",
  "update:timePeriod",
]);
const hourValue = computed({
  get: () => props.hourModelValue,
  set: (value) => emit("update:hourModelValue", value),
});

const minuteValue = computed({
  get: () => props.minuteModelValue,
  set: (value) => emit("update:minuteModelValue", script),
});

const timePeriodValue = computed({
  get: () => props.timePeriod,
  set: (value) => emit("update:timePeriod", value),
});
</script>

<template>
  <div class="form-timepicker-popover" :id="props.id" popover>
    <div class="form-timepicker-popover__inputs-wrapper">
      <FormTimepickerInput v-model="hourValue" :min-value="0" :max-value="12" />
      <span class="form-timepicker-popover__input-separator">:</span>
      <FormTimepickerInput v-model="minuteValue" :min-value="0" :max-value="60" />
      <FormTimepickerPeriodToggle v-model="timePeriodValue" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-timepicker-popover {
  padding: 1.7rem;
  border: 3px solid var(--planastico-cold-black);
  position-area: bottom center;
  margin-top: -5px;
  border-radius: 4px;

  &__inputs-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  &__input-separator {
    font-size: 2rem;
  }
}
</style>
