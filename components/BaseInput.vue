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
  required: {
    type: Boolean,
    default: false
  },
  showLetterCount: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);
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
    <input
      :id="id"
      :value="props.modelValue"
      class="base-input__input"
      :class="`base-input__input--${props.roundedCorner}`"
      :type="props.inputType"
      :placeholder="props.placeholder"
      @input="(e) => emit('update:modelValue', e.target.value)"
    >
  </div>
</template>

<style lang="css">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.base-input__label {
  font-weight: 700;
}

.base-input__input {
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

@media screen and (min-width: 768px) {
  .base-input {
    width: 250px;
  }
}
</style>
