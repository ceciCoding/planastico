<script setup>
  import { useTimeParser } from '~/composables/timeParser.js';

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

  const emit = defineEmits(['update:modelValue']);

  const { hours, minutes, timePeriod, syncFromExternalValue } = useTimeParser(
    props.modelValue,
    emit
  );

  watch(
    () => props.modelValue,
    (newValue) => {
      syncFromExternalValue(newValue);
    }
  );
</script>

<template>
  <div class="form-timepicker">
    <FormInputLabel
      :input-id="field.id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <FormTimepickerPopover
      :id="field.id"
      v-model:hour-model-value="hours"
      v-model:minute-model-value="minutes"
      v-model:time-period="timePeriod"
    />
  </div>
</template>

<style scoped lang="scss">
  .form-timepicker {
    display: flex;
    flex-direction: column;
    width: 50%;

    .form-base-input-label {
      display: block;
      margin-bottom: 0.5rem;
    }
  }
</style>
