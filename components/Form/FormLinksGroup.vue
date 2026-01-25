<script setup lang="ts">
  import { useUuid } from '~/composables/uuid';

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

  const isValidUrl = (str: string): boolean => {
    if (!str || !str.trim()) return true;

    const urlToTest = str.startsWith('http://') || str.startsWith('https://')
      ? str
      : `https://${str}`;

    try {
      const url = new URL(urlToTest);
      return url.hostname.includes('.');
    } catch {
      return false;
    }
  };

  const errors = ref<Record<number, string>>({});

  const validateLink = (index: number) => {
    const link = links.value[index];
    if (!link || !link.trim()) {
      errors.value[index] = '';
    } else if (!isValidUrl(link)) {
      errors.value[index] = 'El enlace no es válido';
    } else {
      errors.value[index] = '';
    }
  };

  const getFieldConfig = (index: number) => ({
    id: `extra-link-${index}`,
    label: {
      name: `Enlace ${index + 1}`,
      isVisible: false,
    },
    inputType: 'text',
    placeholder: 'https://ejemplo.com',
    roundedCorner: 'right',
    isErasable: true,
  });

  const updateLink = (index: number, value: string) => {
    links.value[index] = value;
    emit('update:model-value', links.value);
  };

  const addLink = () => {
    links.value.push('');
    emit('update:model-value', links.value);
  };

  const removeLink = (index: number) => {
    links.value[index] = '';
    emit('update:model-value', links.value);
  };

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
    />
    <div class="form-links-group__row">
      <div class="form-links-group__inputs">
        <FormBaseInput
          v-for="(link, index) in links"
          :key="index"
          :model-value="link"
          :field="getFieldConfig(index)"
          :error="errors[index] || ''"
          @blur="validateLink(index)"
          @update:model-value="(value: string) => updateLink(index, value)"
          @erase="removeLink(index)"
        />
      </div>
      <BaseButtonIcon
        accessible-name="Añadir nuevo enlace"
        :is-naked="false"
        @click="addLink"
      >
        <IconAdd
          width="16"
          height="16"
        />
      </BaseButtonIcon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form-links-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    &__inputs {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .base-button-icon {
      margin-top: 1rem;
    }
  }
</style>
