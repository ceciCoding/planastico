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

  const emit = defineEmits(['update:model-value']);

  const handleChipToggle = (categoryId, isSelected) => {
    let newCategories = [...props.modelValue];

    if (isSelected) {
      if (newCategories.length < 3) {
        newCategories.push(categoryId);
      }
    } else {
      newCategories = newCategories.filter(id => id !== categoryId);
    }

    emit('update:model-value', newCategories);
  };

  const isCategorySelected = (categoryId) => {
    return props.modelValue.includes(categoryId);
  };
</script>

<template>
  <fieldset class="form-categories">
    <legend
      v-if="field.label?.isVisible"
      class="form-categories__legend"
    >
      {{ field.label.name }}
    </legend>
    <p
      v-if="field.description"
      class="form-categories__description"
    >
      {{ field.description }}
    </p>
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
    }

    &__error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
