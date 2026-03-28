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
    type: Number,
    required: true,
  },
  minuteModelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits([
  "update:hour-model-value",
  "update:minute-model-value",
]);

const isOpen = ref(false);

const tempHour = ref(props.hourModelValue);
const tempMinute = ref(props.minuteModelValue);

const formattedTime = computed(() => {
  const hour = props.hourModelValue.toString().padStart(2, "0");
  const minute = props.minuteModelValue.toString().padStart(2, "0");
  return `${hour}:${minute}`;
});

watch(isOpen, (open) => {
  if (open) {
    tempHour.value = props.hourModelValue;
    tempMinute.value = props.minuteModelValue;
  }
});

function accept() {
  emit("update:hour-model-value", tempHour.value);
  emit("update:minute-model-value", tempMinute.value);
  isOpen.value = false;
}

function cancel() {
  tempHour.value = props.hourModelValue;
  tempMinute.value = props.minuteModelValue;
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
        <form @submit.prevent="accept">
          <div class="form-timepicker-popover__inputs-wrapper">
            <FormTimepickerInput v-model="tempHour" :min-value="0" :max-value="23" />
            <span class="form-timepicker-popover__input-separator">:</span>
            <FormTimepickerInput v-model="tempMinute" :min-value="0" :max-value="59" />
          </div>
          <FormActionsGroup @cancel="cancel" />
        </form>
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
    z-index: var(--planastico-max-z-index);
  }
}
</style>
