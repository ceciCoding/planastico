<script setup>
  const emit = defineEmits(['cancel']);
  const store = useAddPlanStore();
</script>

<template>
  <div class="add-plan-modal__actions">
    <BaseButton
      type="submit"
      :disabled="store.isSubmitting"
    >
      {{ store.submitButtonText }}
    </BaseButton>
    <BaseButton
      color="white"
      @click="emit('cancel')"
    >
      Cancelar
    </BaseButton>
  </div>
</template>
