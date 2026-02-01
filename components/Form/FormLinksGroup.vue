<script setup lang="ts">
  import { useUuid } from '~/composables/uuid';
  import { validateLink } from '~/validations/url';

  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [''],
    },
    label: {
      type: String,
      default: 'Agrega enlaces',
    },
  });

  const emit = defineEmits(['update:model-value']);

  const links = ref<string[]>([...props.modelValue]);

  const errors = ref<Record<number, string>>({});

  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error.length > 0);
  });

  function validateLinkAtIndex(index: number) {
    errors.value[index] = validateLink(links.value[index]);
  }

  function getFieldConfig(index: number) {
    return {
      id: `extra-link-${index}`,
      label: {
        name: `Enlace ${index + 1}`,
        isVisible: false,
      },
      inputType: 'text',
      placeholder: 'https://ejemplo.com',
      roundedCorner: 'right',
      isErasable: true,
    } as const;
  }

  function updateLink(index: number, value: string) {
    links.value[index] = value;
    updateModelValue();
  }

  function addLink() {
    links.value.push('');
    updateModelValue();
  }

  function clearLink(index: number) {
    links.value[index] = '';
    updateModelValue();
  }

  function deleteLink(index: number) {
    links.value.splice(index, 1);
    delete errors.value[index];
    updateModelValue();
  }

  function updateModelValue() {
    emit('update:model-value', links.value);
  }

  const labelId = useUuid();
</script>

<template>
  <div
    class="form-links-group"
    aria-role="group"
    :aria-labelledby="labelId"
  >
    <FormInputLabel
      :id="labelId"
      :label="label"
      :has-error="hasErrors"
    />
    <div class="form-links-group__inputs">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="form-links-group__row"
        :class="{ 'form-links-group__row--has-error': errors[index] }"
      >
        <FormBaseInput
          :model-value="link"
          :field="getFieldConfig(index)"
          :error="errors[index] || ''"
          @blur="validateLinkAtIndex(index)"
          @update:model-value="(value: string) => updateLink(index, value)"
          @erase="clearLink(index)"
        />
        <BaseButtonIcon
          v-if="index > 0"
          :accessible-name="`Eliminar enlace ${index + 1}`"
          @click="deleteLink(index)"
        >
          <IconLess
            width="16"
            height="16"
          />
        </BaseButtonIcon>
        <BaseButtonIcon
          v-if="index === 0"
          accessible-name="Añadir nuevo enlace"
          :is-disabled="links.length >= 5"
          @click="addLink"
        >
          <IconAdd
            width="16"
            height="16"
          />
        </BaseButtonIcon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form-links-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__inputs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;

      .form-base-input {
        flex: 1;
      }

      &--has-error {
        .base-button-icon {
          color: var(--planastico-error-red);
          box-shadow: var(--planastico-error-shadow);
          border-color: currentColor;
          margin-bottom: 1.75rem;
        }
      }
    }
  }
</style>
