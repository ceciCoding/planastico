<script setup>
import { useUuid } from '@/composables/uuid';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  field: {
    type: Object,
    required: true
  },
  error: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:model-value']);
const id = useUuid();
</script>

<template>
  <div class="base-input">
    <FormBaseInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <div class="base-input__wrapper">
      <input
        :id="id"
        :value="props.modelValue"
        class="base-input__input"
        :class="[
          `base-input__input--${props.field.roundedCorner}`,
          {
            'base-input__input--has-error': props.error.length,
            'base-input__input--has-trailing-icon': props.field.isCurrency || props.field.isErasable
          }
        ]"
        :type="props.field.inputType"
        :placeholder="props.field.placeholder"
        @input="(e) => emit('update:model-value', e.target.value)"
      >
      <span
        v-if="props.field.isCurrency"
        class="base-input__currency"
      >
        €
      </span>
    </div>
    <span
      v-if="props.field.maxLength && !props.error.length"
      class="base-input__count"
    >
      {{ props.modelValue.length }}/{{ props.field.maxLength }}
    </span>
    <span
      v-if="props.error.length"
      class="base-input__error"
    >
      {{ props.error }}
    </span>
  </div>
</template>

<style lang="css">
.base-input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.base-input__wrapper {
  position: relative;
  width: 100%;
}

.base-input__input {
  width: 100%;
  height: 50px;
  background-color: var(--planastico-warm-soft-gray);
  padding: 0 1rem;
  border: none;
  border-bottom: 6px solid var(--planastico-cold-black);
}

.base-input__input--left {
  border-radius: 14px 0 0 0;
}

.base-input__input--right {
  border-radius: 0 14px 0 0;
}

.base-input__input--has-error {
  border-bottom: 6px solid var(--planastico-error-red);
  color: var(--planastico-error-red);
}

.base-input__input--has-trailing-icon {
  padding-right: 2.5rem;
}

.base-input__input--has-error:focus-visible {
  outline-color: var(--planastico-error-red);
}

.base-input__input--has-error + .base-input__currency {
  color: var(--planastico-error-red);
}

.base-input__count {
  font-size: 0.875rem;
  text-align: right;
  padding-top: 0.5rem;
}

.base-input__error {
  font-size: 0.875rem;
  padding-top: 0.5rem;
  color: var(--planastico-error-red);
}

.base-input__currency {
  position: absolute;
  font-size: 1.25rem;
  right: 1rem;
  top: 10px;
  background-color: transparent;
  font-weight: 600;
  pointer-events: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

@media screen and (min-width: 768px) {
  .base-input {
    width: 250px;
  }
}
</style>
