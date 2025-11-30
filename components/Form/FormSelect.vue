<script setup>
  import {
    SelectRoot,
    SelectTrigger,
    SelectIcon,
    SelectPortal,
    SelectContent,
    SelectViewport,
    SelectItem,
    SelectItemText,
    SelectItemIndicator,
    SelectScrollUpButton,
    SelectScrollDownButton,
  } from 'reka-ui';

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
  const isOpen = ref(false);
  const chevronDirection = computed(() => (isOpen.value ? 'up' : 'down'));
  const emit = defineEmits(['update:model-value']);
  const onUpdate = (value) => emit('update:model-value', value);
</script>

<template>
  <div
    class="form-select"
    :data-error="!!error"
  >
    <FormInputLabel
      :input-id="field.id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />

    <SelectRoot
      :model-value="modelValue"
      :name="field.name"
      :required="field.required"
      :disabled="field.disabled"
      @update:model-value="onUpdate"
      @update:open="isOpen = $event"
    >
      <SelectTrigger
        :id="field.id"
        class="form-select__trigger"
      >
        <SelectValue
          :placeholder="field.placeholder"
          class="form-select__value"
        />
        <IconChevron :direction="chevronDirection" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="form-select__content data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut"
          position="popper"
          :avoidCollisions="false"
        >
          <SelectViewport class="form-select__viewport">
            <SelectItem
              v-for="option in field.options"
              :key="String(option.value)"
              :value="option.value"
              class="form-select__item"
            >
              <SelectItemText class="form-select__itemText">
                {{ option.label }}
              </SelectItemText>
              <SelectItemIndicator class="form-select__indicator">
                ✓
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <p
      v-if="error"
      class="form-select__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss">
  .form-select {
    $self: &;
    display: flex;
    flex-direction: column;
    width: 100%;

    &__trigger {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      height: 50px;
      padding: 10px 14px;
      background: var(--planastico-warm-soft-gray);
      border-top-left-radius: var(--planastico-border-radius-s);
      border-top-right-radius: var(--planastico-border-radius-s);
      border-bottom: var(--planastico-border-xl);
      transition: border 0.1s ease;

      &[data-state='closed'] {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &[data-state='open'] {
        border-color: var(--planastico-warm-soft-gray);
      }
    }

    &__value[data-placeholder] {
      opacity: 0.7;
    }

    &__content {
      min-width: var(--radix-select-trigger-width, auto);
      width: var(--radix-select-trigger-width, auto);
      --_trigger-w: var(
        --radix-select-trigger-width,
        var(--reka-select-trigger-width, auto)
      );
      min-width: var(--_trigger-w);
      width: var(--_trigger-w);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background: var(--planastico-warm-soft-gray);
      color: var(--planastico-cold-black);
      overflow: hidden;
      transition: border 0.1s ease;

      &[data-state='open'] {
        border-bottom: var(--planastico-border-xl);
      }
    }

    &__viewport {
      padding: 4px 0;
      max-height: 280px;
    }
    &__scroll {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--planastico-white);
    }

    &__item {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;

      &[data-highlighted] {
        background: var(--planastico-cold-black);
        color: var(--planastico-white);
      }
      &[data-state='checked'] &__itemText {
        font-weight: 700;
      }
    }

    &__content &__item[data-state='checked'] {
      display: none;
    }

    &__indicator {
      font-size: 12px;
    }

    &__error {
      margin: 4px 2px 0;
      color: var(--planastico-error-red);
      font-size: 0.9rem;
    }

    &[data-error='true'] &__trigger {
      border-color: var(--planastico-error-red);
      box-shadow: none;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.98);
    }
  }
  .form-select__content[data-state='close'] {
    animation: fadeOut 1000ms ease-in;
  }
</style>
