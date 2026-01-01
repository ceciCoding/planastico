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
      role="radiogroup"
      :aria-labelledby="field.id"
    >
      <label
        v-for="option in field.options"
        :key="option.value"
        class="form-radio-group__option"
      >
        <input
          :id="`${field.id}-${option.value}`"
          type="radio"
          :name="field.id"
          :value="option.value"
          :checked="modelValue === option.value"
          class="form-radio-group__input"
          @change="handleChange(option.value)"
        />
        <span class="form-radio-group__label">{{ option.label }}</span>
      </label>
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
      flex-direction: column;
      gap: 0.75rem;
    }

    &__option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    &__input {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--planastico-yellow);
    }

    &__label {
      cursor: pointer;
      user-select: none;
    }

    &__error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
