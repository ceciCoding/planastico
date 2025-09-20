<script setup>
import { useUuid } from '@/composables/uuid';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  field: {
    type: Object,
    required: true,
  },
  error: {
    type: String,
    default: "",
  }
});
const emit = defineEmits(["update:model-value"]);
const id = useUuid();
</script>

<template>
  <div class="form-select">
    <FormBaseInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <select id="id" @input="(e) => emit('update:model-value', e.target.value)">
      <button>
        <selectedcontent>{{ modelValue }}</selectedcontent>
      </button>
      <option
        v-for="option in field.options"
        :key="option.value"
        value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.form-select {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .form-select {
    width: 250px;
  }
}
</style>
