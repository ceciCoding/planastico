<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['update:model-value']);

  const handleChange = () => {
    emit('update:model-value', props.option.value);
  };
</script>

<template>
  <label class="form-radio">
    <input
      :id="`${name}-${option.value}`"
      type="radio"
      :name="name"
      :value="option.value"
      :checked="modelValue === option.value"
      class="form-radio__input"
      @change="handleChange"
    />
    <span class="form-radio__label">{{ option.label }}</span>
  </label>
</template>

<style lang="scss">
  .form-radio {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &__input {
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid var(--planastico-cold-black);
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      flex-shrink: 0;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        background-color: var(--planastico-cold-black);
        transition: transform 0.15s ease-in-out;
      }

      &:checked::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &__label {
      cursor: pointer;
      user-select: none;
    }
  }
</style>
