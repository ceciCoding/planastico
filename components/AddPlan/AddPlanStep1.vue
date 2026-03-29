<script setup>
  const store = useAddPlanStore();

  onMounted(() => store.loadCategories());

  const titleField = computed(() => ({
    id: 'name',
    label: {
      name: 'Título del plan',
      isVisible: true,
      required: true,
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
      required: true,
    },
    placeholder: 'Descripción del plan',
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
      name: 'Elige entre 1 y 3 categorías',
      isVisible: true,
      required: true,
    },
    categories: store.categories,
  }));
</script>

<template>
  <div class="add-plan-step-1">
    <FormBaseInput
      :model-value="store.formData.name"
      :field="titleField"
      :error="store.errors.name"
      @update:model-value="(value) => store.handleFieldUpdate(titleField.id, value)"
    />

    <FormTextarea
      :model-value="store.formData.description"
      :field="descriptionField"
      :error="store.errors.description"
      @update:model-value="(value) => store.handleFieldUpdate(descriptionField.id, value)"
    />

    <FormLinksGroup
      :model-value="store.formData.extra_links"
      @update:model-value="(value) => store.handleFieldUpdate('extra_links', value)"
    />

    <FormFilePicker
      :model-value="store.formData.image_urls"
      :field="imagesField"
      :error="store.errors.image_urls"
      @update:model-value="(value) => store.handleFieldUpdate(imagesField.id, value)"
    />

    <FormCategories
      v-if="!store.isLoadingCategories"
      :model-value="store.formData.categories"
      :field="categoriesField"
      :error="store.errors.categories"
      @update:model-value="(value) => store.handleFieldUpdate(categoriesField.id, value)"
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
