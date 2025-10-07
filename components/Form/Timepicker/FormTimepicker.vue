<script setup>
import { useUuid } from '~/composables/uuid.js';
import { useTimeParser } from '~/composables/timeParser.js';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  field: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const id = useUuid();

const { hours, minutes, timePeriod, syncFromExternalValue } = useTimeParser(props.modelValue, emit);

watch(() => props.modelValue, (newValue) => {
  syncFromExternalValue(newValue);
});
</script>

<template>
  <div class="form-timepicker">
    <FormBaseInputLabel
      :input-id="props.field.label.name"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <FormTimepickerPopover
      :id="id"
      v-model:hour-model-value="hours"
      v-model:minute-model-value="minutes"
      v-model:time-period="timePeriod"
    />
  </div>
</template>

<style scoped lang="scss">
.form-base-input-label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>