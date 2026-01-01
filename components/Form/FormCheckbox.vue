<script setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
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

  const handleChange = (event) => {
    emit('update:model-value', event.target.checked);
  };
</script>

<template>
  <div class="form-checkbox">
    <label
      :for="field.id"
      class="form-checkbox__label-wrapper"
    >
      <input
        :id="field.id"
        type="checkbox"
        :checked="modelValue"
        class="form-checkbox__input"
        :class="{ 'form-checkbox__input--has-error': error }"
        @change="handleChange"
      />
      <span class="form-checkbox__label">
        {{ field.label.name }}
      </span>
    </label>
    <span
      v-if="error"
      class="form-checkbox__error"
      aria-live="polite"
    >
      {{ error }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .form-checkbox {
    display: flex;
    flex-direction: column;

    &__label-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    &__input {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--planastico-yellow);

      &--has-error {
        outline: 2px solid var(--planastico-error-red);
        outline-offset: 2px;
      }
    }

    &__label {
      cursor: pointer;
      user-select: none;
    }

    &__error {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
