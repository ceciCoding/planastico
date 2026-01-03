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

  const emit = defineEmits(['update:modelValue']);

  const inputError = ref(null);
  const errorMessage = computed(() => props.error || inputError.value);

  const files = ref([null, null, null]);

  function handleInputError(message) {
    inputError.value = message;
  }

  function handleFileUpdate(index, file) {
    files.value[index] = file;
    const validFiles = files.value.filter((f) => f !== null);
    emit('update:modelValue', validFiles);
  }
</script>

<template>
  <div class="form-file-picker">
    <FormInputLabel
      :input-id="field.id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    >
      <template #description>
        <p
          :id="`form-file-picker__description-${field.id}`"
          class="form-file-picker__description"
        >
          Puedes cargar un máximo de 3 imágenes de hasta 2MB en formato JPG o
          PNG. La primera será la imagen principal del plan.
        </p>
      </template>
    </FormInputLabel>
    <div
      class="form-file-picker__inputs-wrapper"
      role="group"
      :aria-describedby="`form-file-picker__description-${field.id}`"
    >
      <FormFilePickerInput
        v-for="index in 3"
        :key="index"
        :index="index"
        :model-value="files[index - 1]"
        :field="props.field"
        :error="props.error"
        :aria-describedby="`form-file-picker__description-${field.id}`"
        @error="handleInputError"
        @update:modelValue="(file) => handleFileUpdate(index - 1, file)"
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
    }

    &__inputs-wrapper {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: nowrap;
    }

    &__error {
      color: var(--planastico-error-red);
      font-size: 0.875rem;
      margin-top: 0.5rem;
      font-style: italic;
    }
  }
</style>
