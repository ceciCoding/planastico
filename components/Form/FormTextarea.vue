<script setup>
  import { useUuid } from '~/composables/uuid';

  const props = defineProps({
    modelValue: {
      type: String,
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
  const emit = defineEmits(['update:model-value']);
  const id = useUuid();
</script>

<template>
  <div class="form-textarea">
    <FormBaseInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <textarea
      :id="id"
      :value="props.modelValue"
      rows="6"
      class="form-textarea__textarea"
      :class="[
        `form-textarea__textarea--${props.field.roundedCorner}`,
        {
          'form-textarea__textarea--has-error': props.error.length,
        },
      ]"
      :placeholder="props.field.placeholder"
      @input="(e) => emit('update:model-value', e.target.value)"
    ></textarea>
    <span
      v-if="props.field.maxLength && !props.error.length"
      class="form-textarea__count"
    >
      {{ props.modelValue.length }}/{{ props.field.maxLength }}
    </span>
    <span
      v-if="props.error.length"
      class="form-textarea__error"
    >
      {{ props.error }}
    </span>
  </div>
</template>

<style lang="scss">
  .form-textarea {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__textarea {
      width: 100%;
      padding: 8px;
      background: var(--planastico-warm-soft-gray);
      border: none;
      border-bottom: var(--planastico-border-xl);
      resize: vertical;

      &--left {
        border-top-left-radius: var(--planastico-border-radius-s);
      }

      &--right {
        border-top-right-radius: var(--planastico-border-radius-s);
      }

      &--has-error {
        border-color: var(--planastico-error-red);
      }
    }

    &__count {
      align-self: flex-end;
      margin-top: 4px;
      font-size: 12px;
      color: var(--planastico-cold-gray);
    }

    &__error {
      margin-top: 4px;
      font-size: 12px;
      color: var(--planastico-danger);
    }
  }
</style>
