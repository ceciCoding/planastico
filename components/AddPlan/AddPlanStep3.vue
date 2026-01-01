<script setup>
  const STEP_INDEX = 3;
  const { formData, handleFieldUpdate } = useAddPlanForm();
  const { validateStep, errors } = useFormValidation();

  const costTypeField = computed(() => ({
    id: 'cost',
    label: {
      name: '¿Cuánto cuesta?',
      isVisible: true,
    },
    options: [
      { value: 'free', label: 'Gratis' },
      { value: 'pay-what-you-want', label: 'A voluntad' },
      { value: 'fixed-price', label: 'Precio fijo' },
    ],
  }));

  const priceField = computed(() => ({
    id: 'price',
    label: {
      name: 'Precio',
      isVisible: false,
    },
    inputType: 'number',
    placeholder: '0',
    roundedCorner: 'right',
    isCurrency: true,
  }));

  const showPriceField = computed(() => {
    return formData.value.cost !== 'free';
  });

  function handleCostUpdate(value) {
    handleFieldUpdate(costTypeField.value.id, value);

    if (value === 'free') {
      handleFieldUpdate(priceField.value.id, null);
    }
  }

  defineExpose({
    validate: () => validateStep(formData.value, STEP_INDEX),
  });
</script>

<template>
  <div class="add-plan-step-3">
    <fieldset class="add-plan-step-3__fieldset">
      <FormRadioGroup
        :model-value="formData.cost"
        :field="costTypeField"
        :error="errors.cost"
        @update:model-value="handleCostUpdate"
      />

      <FormBaseInput
        v-if="showPriceField"
        :model-value="formData.price"
        :field="priceField"
        :error="errors.price"
        @update:model-value="(value) => handleFieldUpdate(priceField.id, value)"
      />
    </fieldset>
  </div>
</template>

<style scoped lang="scss">
  .add-plan-step-3 {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
