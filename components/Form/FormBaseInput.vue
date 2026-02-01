<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
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
  const emit = defineEmits(['update:model-value', 'erase', 'blur']);
</script>

<template>
  <div class="form-base-input">
    <FormInputLabel
      :input-id="field.id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
      :required="props.field.label.required"
      :has-error="props.error.length"
    />
    <div class="form-base-input__wrapper">
      <input
        :id="field.id"
        :value="props.modelValue"
        class="form-base-input__input"
        :class="[
          `form-base-input__input--${props.field.roundedCorner}`,
          {
            'form-base-input__input--has-error': props.error.length,
            'form-base-input__input--has-trailing-icon':
              props.field.isCurrency || props.field.isErasable,
          },
        ]"
        :type="props.field.inputType"
        :placeholder="props.field.placeholder"
        :aria-describedby="`${field.id}-form-base-input__count`"
        @input="(e) => emit('update:model-value', e.target.value)"
        @blur="emit('blur')"
      />
      <span
        v-if="props.field.isCurrency"
        class="form-base-input__currency"
      >
        €
      </span>
      <BaseButtonIcon
        v-if="props.field.isErasable"
        accessible-name="Borrar"
        class="form-base-input__erase"
        :is-naked="true"
        @click="emit('erase')"
      >
        <IconClose />
      </BaseButtonIcon>
    </div>
    <span
      v-if="props.field.maxLength && !props.error.length"
      :id="`${field.id}-form-base-input__count`"
      class="form-base-input__count"
    >
      {{ props.modelValue.length }}/{{ props.field.maxLength }}
    </span>
    <span
      v-if="props.error.length"
      class="form-base-input__error"
      aria-live="polite"
    >
      {{ props.error }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .form-base-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__wrapper {
      position: relative;
      width: 100%;
    }

    &__input {
      width: 100%;
      height: 50px;
      background-color: var(--planastico-warm-soft-gray);
      padding: 0 1rem;
      border: none;
      border-bottom: var(--planastico-border-xl);

      &--left {
        border-radius: 14px 0 0 0;
      }

      &--right {
        border-radius: 0 14px 0 0;
      }

      &--has-error {
        border-color: var(--planastico-error-red);
        color: var(--planastico-error-red);
      }

      &--has-trailing-icon {
        padding-right: 2.5rem;
      }

      &--has-error:focus-visible {
        outline-color: var(--planastico-error-red);
      }

      &--has-error + .form-base-input__currency,
      &--has-error + .form-base-input__erase {
        color: var(--planastico-error-red);
      }
    }

    &__count {
      font-size: 0.875rem;
      text-align: right;
      padding-top: 0.5rem;
    }

    &__error {
      font-size: 0.875rem;
      padding-top: 0.5rem;
      color: var(--planastico-error-red);
    }

    &__currency {
      position: absolute;
      font-size: 1.25rem;
      right: 1rem;
      top: 10px;
      background-color: transparent;
      font-weight: 600;
      pointer-events: none;
    }

    &__erase {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
