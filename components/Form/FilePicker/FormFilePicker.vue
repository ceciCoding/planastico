<script setup>
  import { useUuid } from '~/composables/uuid.js';

  const props = defineProps({
    modelValue: {
      type: [String, Number, Object],
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
  const id = useUuid();
  const inputError = ref(null);
  const errorMessage = computed(() => props.error || inputError.value);

  function handleInputError(message) {
    inputError.value = message;
  }
</script>

<template>
  <div class="form-file-picker">
    <FormInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    >
      <template #description>
        <p
          :id="`form-file-picker__description-${id}`"
          class="form-file-picker__description"
        >
          Puedes cargar un máximo de 3 imágenes de hasta 2MB en formato JPG o
          PNG. La primera será la imagen principal del plan.
        </p>
      </template>
    </FormInputLabel>
    <div class="form-file-picker__inputs-wrapper">
      <FormFilePickerInput
        v-for="index in 3"
        :key="index"
        :id="id"
        :index="index"
        :model-value="props.modelValue"
        :field="props.field"
        :error="props.error"
        :aria-describedby="`form-file-picker__description-${id}`"
        @error="handleInputError"
      />
    </div>
    <p
      v-if="errorMessage"
      class="form-file-picker__error"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss">
  .form-file-picker {
    width: 100%;

    &__description {
      font-size: 0.875rem;
      margin-top: 1rem;
      font-style: italic;
      font-weight: 400;
      line-height: 20px;
      color: var(--planastico-cold-black-shade);
      letter-spacing: 0.5%;
    }

    &__inputs-wrapper {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    &__error {
      color: var(--planastico-error-red);
      font-size: 0.875rem;
      margin-top: 0.5rem;
      font-style: italic;
    }
  }
</style>
