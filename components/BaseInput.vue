<script setup>
import { nanoid } from 'nanoid';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isLabelVisible: {
    type: Boolean,
    default: true
  },
  roundedCorner: {
    type: String,
    default: 'right'
  },
  error: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 0
  },
  isCurrency: {
    type: Boolean,
    default: false
  },
  isErasable: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:model-value']);
const id = ref('');

onMounted(() => {
  if (import.meta.client) {
    id.value = nanoid();
  }
});
</script>

<template>
  <div class="base-input">
    <BaseInputLabel 
      :input-id="id"
      :label="props.label"
      :is-visible="props.isLabelVisible"
    />
    <div class="base-input__wrapper">
      <input
        :id="id"
        :value="props.modelValue"
        class="base-input__input"
        :class="[
          `base-input__input--${props.roundedCorner}`,
          {
            'base-input__input--has-error': props.error.length,
            'base-input__input--has-trailing-icon': props.isCurrency || props.isErasable
          }
        ]"
        :type="props.inputType"
        :placeholder="props.placeholder"
        @input="(e) => emit('update:model-value', e.target.value)"
      >
      <span
        v-if="props.isCurrency"
        class="base-input__currency"
      >
        €
      </span>
    </div>
    <span
      v-if="props.maxLength && !props.error.length"
      class="base-input__count"
    >
      {{ props.modelValue.length }}/{{ props.maxLength }}
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

.base-input__label {
  font-weight: 700;
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
  border-radius: 20px 0 0 0;
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
