<script setup>
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:model-value']);

  const weekDays = [
    { value: 1, label: 'L', fullLabel: 'Lunes' },
    { value: 2, label: 'M', fullLabel: 'Martes' },
    { value: 3, label: 'X', fullLabel: 'Miércoles' },
    { value: 4, label: 'J', fullLabel: 'Jueves' },
    { value: 5, label: 'V', fullLabel: 'Viernes' },
    { value: 6, label: 'S', fullLabel: 'Sábado' },
    { value: 0, label: 'D', fullLabel: 'Domingo' },
  ];

  const handleToggle = (dayValue) => {
    let newDays = [...props.modelValue];

    if (newDays.includes(dayValue)) {
      newDays = newDays.filter(d => d !== dayValue);
    } else {
      newDays.push(dayValue);
    }

    emit('update:model-value', newDays);
  };

  const isDaySelected = (dayValue) => {
    return props.modelValue.includes(dayValue);
  };
</script>

<template>
  <fieldset class="form-week-days">
    <legend
      v-if="field.label?.isVisible"
      class="form-week-days__legend"
    >
      {{ field.label.name }}
    </legend>
    <div
      class="form-week-days__buttons"
      role="group"
      :aria-labelledby="field.id"
    >
      <button
        v-for="day in weekDays"
        :key="day.value"
        type="button"
        class="form-week-days__button"
        :class="{ 'form-week-days__button--selected': isDaySelected(day.value) }"
        :aria-label="day.fullLabel"
        :aria-pressed="String(isDaySelected(day.value))"
        @click="handleToggle(day.value)"
      >
        {{ day.label }}
      </button>
    </div>
    <span
      v-if="error"
      class="form-week-days__error"
      aria-live="polite"
    >
      {{ error }}
    </span>
  </fieldset>
</template>

<style scoped lang="scss">
  .form-week-days {
    border: none;
    padding: 0;
    margin: 0;

    &__legend {
      font-weight: 600;
      margin-bottom: 0.75rem;
      padding: 0;
    }

    &__buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    &__button {
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

    &__error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
