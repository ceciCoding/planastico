<script setup>
  const emit = defineEmits(['cancel']);
  const store = useAddPlanStore();

  const handleGoBack = () => {
    if (store.currentStep === 1) {
      emit('cancel');
    } else {
      store.prevStep();
    }
  };

  const handleNext = async () => {
    const result = await store.nextStep();
    if (result === 'submitted') {
      await refreshNuxtData('plans');
      emit('cancel');
    }
  };
</script>

<template>
  <AddPlanStepperHeader
    :current-step="store.currentStep"
    @go-back="handleGoBack"
  />

  <form
    class="add-plan-modal__form"
    novalidate
    @submit.prevent="handleNext"
  >
    <AddPlanStep1 v-if="store.currentStep === 1" />
    <AddPlanStep2 v-if="store.currentStep === 2" />
    <AddPlanStep3 v-if="store.currentStep === 3" />
    <AddPlanStep4 v-if="store.currentStep === 4" />

    <div
      v-if="store.submitError"
      class="add-plan-modal__error"
      role="alert"
    >
      {{ store.submitError }}
    </div>

    <AddPlanFormActions @cancel="emit('cancel')" />
  </form>
</template>
