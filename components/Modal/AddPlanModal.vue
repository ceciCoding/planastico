<script setup>
  import {
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTrigger,
  } from 'reka-ui';

  const TOTAL_STEPS = 4;
  const CLOSE_ANIMATION_MS = 300;

  const isOpen = defineModel('open', { type: Boolean, default: false });

  const { currentStep, resetForm, goToPreviousStep, goToNextStep } =
    useAddPlanForm();
  const { isSubmitting, submitError, submit } = useAddPlanSubmit();

  const stepRefs = Array.from({ length: TOTAL_STEPS }, () => ref(null));

  const submitButtonText = computed(() =>
    currentStep.value === TOTAL_STEPS
      ? isSubmitting.value
        ? 'Creando...'
        : 'Crear plan'
      : 'Siguiente'
  );

  const handleGoBack = () =>
    currentStep.value === 1 ? handleCancel() : goToPreviousStep();

  const handleCancel = () => {
    isOpen.value = false;
    setTimeout(() => {
      resetForm();
      submitError.value = '';
    }, CLOSE_ANIMATION_MS);
  };

  const handleNext = async () => {
    const activeStep = stepRefs[currentStep.value - 1].value;
    const isValid = await activeStep?.validate?.();
    if (!isValid) return;

    if (currentStep.value === TOTAL_STEPS) {
      const success = await submit();
      if (success) {
        await refreshNuxtData('plans');
        handleCancel();
      }
    } else {
      goToNextStep();
    }
  };
</script>

<template>
  <DialogRoot
    v-model:open="isOpen"
    class="add-plan-modal"
  >
    <DialogTrigger asChild>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="add-plan-modal__overlay" />
      <DialogContent
        class="add-plan-modal__content"
        aria-label="Añadir nuevo plan"
      >
        <AddPlanStepperHeader
          :current-step="currentStep"
          @go-back="handleGoBack"
        />
        <DialogDescription class="sr-only">
          <span>Paso {{ currentStep }} de {{ TOTAL_STEPS }}</span>
        </DialogDescription>

        <form
          class="add-plan-modal__form"
          novalidate
          @submit.prevent="handleNext"
        >
          <AddPlanStep1
            v-if="currentStep === 1"
            :ref="stepRefs[0]"
          />
          <AddPlanStep2
            v-if="currentStep === 2"
            :ref="stepRefs[1]"
          />
          <AddPlanStep3
            v-if="currentStep === 3"
            :ref="stepRefs[2]"
          />
          <AddPlanStep4
            v-if="currentStep === 4"
            :ref="stepRefs[3]"
          />

          <div
            v-if="submitError"
            class="add-plan-modal__error"
            role="alert"
          >
            {{ submitError }}
          </div>

          <div class="add-plan-modal__actions">
            <BaseButton
              type="submit"
              :disabled="isSubmitting"
            >
              {{ submitButtonText }}
            </BaseButton>
            <BaseButton
              @click="handleCancel"
              color="white"
            >
              Cancelar
            </BaseButton>
          </div>
        </form>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss">
  .add-plan-modal {
    &__overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 50;
    }

    &__content {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      z-index: 51;
      background: var(--planastico-white);

      @media screen and (min-width: 768px) {
        top: 50%;
        left: 50%;
        right: auto;
        bottom: auto;
        transform: translate(-50%, -50%);
        border-radius: 1rem;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
      }
    }

    &__title {
      margin: 0;
    }

    &__form {
      margin-top: 1.5rem;
      padding: 1.5rem;
    }

    &__error {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #fee;
      border: 1px solid var(--planastico-error-red);
      border-radius: 8px;
      color: var(--planastico-error-red);
      font-size: 0.875rem;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: flex-end;
    }

    @media screen and (min-width: 780px) {
      &__form {
        padding: 3.5rem;
      }
    }
  }
</style>
