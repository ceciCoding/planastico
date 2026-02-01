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
    maxSelected: {
      type: Number,
      default: 3,
    },
  });

  const emit = defineEmits(['update:model-value']);

  const handleChipToggle = (categoryId, isSelected) => {
    let newCategories = [...props.modelValue];

    if (isSelected) {
      if (newCategories.length < props.maxSelected) {
        newCategories.push(categoryId);
      }
    } else {
      newCategories = newCategories.filter((id) => id !== categoryId);
    }

    emit('update:model-value', newCategories);
  };

  const isCategorySelected = (categoryId) => {
    return props.modelValue.includes(categoryId);
  };

  const isChipDisabled = (categoryId) => {
    return (
      props.modelValue.length >= props.maxSelected &&
      !isCategorySelected(categoryId)
    );
  };
</script>

<template>
  <fieldset class="form-categories">
    <FormInputLabel
      :input-id="field.id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
      :required="props.field.required"
    />
    <div
      class="form-categories__chips"
      role="group"
      :aria-labelledby="field.id"
    >
      <BaseChip
        v-for="category in field.categories"
        :key="category.id"
        :text="category.name"
        :model-value="isCategorySelected(category.id)"
        :disabled="isChipDisabled(category.id)"
        @update:model-value="(value) => handleChipToggle(category.id, value)"
      />
    </div>
    <span
      v-if="error"
      class="form-categories__error"
      aria-live="polite"
    >
      {{ error }}
    </span>
  </fieldset>
</template>

<style scoped lang="scss">
  .form-categories {
    border: none;
    padding: 0;
    margin: 0;

    &__legend {
      font-weight: 600;
      margin-bottom: 0.5rem;
      padding: 0;
    }

    &__description {
      font-size: 0.875rem;
      margin-bottom: 1rem;
      color: var(--planastico-cold-gray);
    }

    &__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding-top: 1rem;
    }

    &__error {
      display: block;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
