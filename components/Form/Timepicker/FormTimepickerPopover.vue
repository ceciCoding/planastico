<script setup>
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "reka-ui";

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

const isOpen = ref(false);

// Local temporary values used while the popover is open.
// These are initialized from props when the popover opens and only
// emitted to the parent when the user accepts.
const tempHour = ref(props.hourModelValue);
const tempMinute = ref(props.minuteModelValue);
const tempPeriod = ref(props.timePeriod);

const hourValue = computed({
  get: () => tempHour.value.toString(),
  set: (value) => (tempHour.value = parseInt(value, 10)),
});

const minuteValue = computed({
  get: () => tempMinute.value.toString(),
  set: (value) => (tempMinute.value = parseInt(value, 10)),
});

const timePeriodValue = computed({
  get: () => tempPeriod.value,
  set: (value) => (tempPeriod.value = value),
});

const formattedTime = computed(() => {
  const hour = props.hourModelValue.toString().padStart(2, "0");
  const minute = props.minuteModelValue.toString().padStart(2, "0");
  return `${hour}:${minute} ${props.timePeriod}`;
});

watch(isOpen, (open) => {
  if (open) {
    tempHour.value = props.hourModelValue;
    tempMinute.value = props.minuteModelValue;
    tempPeriod.value = props.timePeriod;
  }
});

function accept() {
  emit("update:hourModelValue", tempHour.value);
  emit("update:minuteModelValue", tempMinute.value);
  emit("update:timePeriod", tempPeriod.value);
  isOpen.value = false;
}

function cancel() {
  tempHour.value = props.hourModelValue;
  tempMinute.value = props.minuteModelValue;
  tempPeriod.value = props.timePeriod;
  isOpen.value = false;
}
</script>

<template>
  <PopoverRoot class="form-timepicker-popover" v-model:open="isOpen" :id="id">
    <PopoverTrigger as-child>
      <FormTimepickerTrigger :time="formattedTime" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        :side-offset="2"
        class="form-timepicker-popover__content"
      >
        <div class="form-timepicker-popover__inputs-wrapper">
          <FormTimepickerInput v-model="hourValue" :min-value="0" :max-value="12" />
          <span class="form-timepicker-popover__input-separator">:</span>
          <FormTimepickerInput v-model="minuteValue" :min-value="0" :max-value="60" />
          <FormTimepickerPeriodToggle v-model="timePeriodValue" />
        </div>
        <FormActionsGroup @cancel="cancel" @accept="accept" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="scss">
.form-timepicker-popover {
  padding: 1.7rem;
  border: 3px solid var(--planastico-cold-black);
  margin-top: -5px;
  border-radius: 4px;

  &__inputs-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: var(--planastico-white);
    padding: 30px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border: var(--planastico-border-m);
  }

  &__input-separator {
    font-size: 2rem;
  }

  &__content {
    margin-left: 8px;
  }
}
</style>
