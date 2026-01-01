<script setup>
  const STEP_INDEX = 1;
  const { formData, handleFieldUpdate } = useAddPlanForm();
  const { validateStep, errors } = useFormValidation();
  const { getCategories } = useEvents();

  const categories = ref([]);
  const isLoadingCategories = ref(false);

  onMounted(async () => {
    isLoadingCategories.value = true;
    const { data, error } = await getCategories();
    if (!error && data) {
      categories.value = data;
    }
    isLoadingCategories.value = false;
  });

  const titleField = computed(() => ({
    id: 'name',
    label: {
      name: 'Título del plan',
      isVisible: true,
    },
    inputType: 'text',
    placeholder: 'Nombre del plan',
    roundedCorner: 'right',
    maxLength: 70,
  }));

  const descriptionField = computed(() => ({
    id: 'description',
    label: {
      name: 'Describe tu plan',
      isVisible: true,
    },
    placeholder: 'Text',
    roundedCorner: 'right',
    maxLength: 3000,
  }));

  const imagesField = computed(() => ({
    id: 'image_urls',
    label: {
      name: 'Sube imágenes',
      isVisible: true,
    },
  }));

  const categoriesField = computed(() => ({
    id: 'categories',
    label: {
      name: 'Categorías',
      isVisible: true,
    },
    description: 'Elige entre 1 y 3 categorías',
    categories: categories.value,
  }));

  defineExpose({
    validate: () => validateStep(formData.value, STEP_INDEX),
  });
</script>

<template>
  <div class="add-plan-step-1">
    <FormBaseInput
      :model-value="formData.name"
      :field="titleField"
      :error="errors.name"
      @update:model-value="(value) => handleFieldUpdate(titleField.id, value)"
    />

    <FormTextarea
      :model-value="formData.description"
      :field="descriptionField"
      :error="errors.description"
      @update:model-value="(value) => handleFieldUpdate(descriptionField.id, value)"
    />

    <FormFilePicker
      :model-value="formData.image_urls"
      :field="imagesField"
      :error="errors.image_urls"
      @update:model-value="(value) => handleFieldUpdate(imagesField.id, value)"
    />

    <FormCategories
      v-if="!isLoadingCategories"
      :model-value="formData.categories"
      :field="categoriesField"
      :error="errors.categories"
      @update:model-value="(value) => handleFieldUpdate(categoriesField.id, value)"
    />
    <p v-else>Cargando categorías...</p>
  </div>
</template>

<style scoped lang="scss">
  .add-plan-step-1 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
