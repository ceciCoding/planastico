<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'vertical',
    },
  });

  const emit = defineEmits(['update:model-value']);

  const handleChange = (value) => {
    emit('update:model-value', value);
  };
</script>

<template>
  <fieldset class="form-radio-group">
    <legend
      v-if="field.label?.isVisible"
      class="form-radio-group__legend"
    >
      {{ field.label.name }}
    </legend>
    <div
      class="form-radio-group__options"
      :class="`form-radio-group__options--${direction}`"
      role="radiogroup"
      :aria-labelledby="field.id"
    >
      <FormRadio
        v-for="option in field.options"
        :key="option.value"
        :model-value="modelValue"
        :option="option"
        :name="field.id"
        @update:model-value="handleChange"
      />
    </div>
    <span
      v-if="error"
      class="form-radio-group__error"
      aria-live="polite"
    >
      {{ error }}
    </span>
  </fieldset>
</template>

<style scoped lang="scss">
  .form-radio-group {
    border: none;
    padding: 0;
    margin: 0;

    &__legend {
      font-weight: 600;
      margin-bottom: 0.75rem;
      padding: 0;
    }

    &__options {
      display: flex;
      gap: 0.75rem;

      &--horizontal {
        flex-direction: row;
      }

      &--vertical {
        flex-direction: column;
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
