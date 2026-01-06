<script setup>
  import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from 'reka-ui';

  const { currentStep, formData, resetForm, goToPreviousStep, goToNextStep } =
    useAddPlanForm();
  const { createEvent } = useEvents();
  const { uploadEventImages } = useImageUpload();
  const { preparePlanForDB } = usePlanModel();

  const isOpen = defineModel('open', { type: Boolean, default: false });
  const isSubmitting = ref(false);
  const submitError = ref('');

  const step1Ref = ref(null);
  const step2Ref = ref(null);
  const step3Ref = ref(null);
  const step4Ref = ref(null);

  const submitButtonText = computed(() => {
    if (currentStep.value === 4) {
      return isSubmitting.value ? 'Creando...' : 'Crear plan';
    } else {
      return 'Siguiente';
    }
  });

  const handleGoBack = () => {
    currentStep.value === 1 ? handleCancel() : goToPreviousStep();
  };

  const handleCancel = () => {
    isOpen.value = false;
    setTimeout(() => {
      resetForm();
      submitError.value = '';
    }, 300);
  };

  const handleNext = async () => {
    let stepRef = null;
    switch (currentStep.value) {
      case 1:
        stepRef = step1Ref.value;
        break;
      case 2:
        stepRef = step2Ref.value;
        break;
      case 3:
        stepRef = step3Ref.value;
        break;
      case 4:
        stepRef = step4Ref.value;
        break;
    }

    if (stepRef && stepRef.validate) {
      const isValid = await stepRef.validate();
      if (isValid) {
        if (currentStep.value === 4) {
          await handleSubmit();
        } else {
          goToNextStep();
        }
      }
    }
  };

  const handleSubmit = async () => {
    isSubmitting.value = true;
    submitError.value = '';

    try {
      const planData = { ...formData.value };

      if (planData.useContactEmailForManagement) {
        planData.validation_email = planData.contact_email;
      }

      const imagesToUpload = planData.image_urls;

      delete planData.useContactEmailForManagement;
      delete planData.captchaToken;
      delete planData.image_urls;

      const cleanPlan = preparePlanForDB(planData);

      const { data: event, error: eventError } = await createEvent(cleanPlan);

      if (eventError) {
        throw new Error(eventError);
      }

      if (imagesToUpload && imagesToUpload.length > 0) {
        try {
          await uploadEventImages(imagesToUpload, event.id);
        } catch (imageError) {
          submitError.value = `Evento creado pero error subiendo imágenes: ${imageError.message}`;
        }
      }

      isOpen.value = false;
      setTimeout(() => {
        resetForm();
      }, 300);
    } catch (error) {
      console.error('Error creando evento:', error);
      submitError.value =
        'Hubo un error al crear el plan. Por favor, inténtalo de nuevo más tarde.';
    } finally {
      isSubmitting.value = false;
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
          <span>Paso {{ currentStep }} de 4</span>
        </DialogDescription>

        <form
          class="add-plan-modal__form"
          @submit.prevent="handleNext"
        >
          <AddPlanStep1
            v-if="currentStep === 1"
            ref="step1Ref"
          />
          <AddPlanStep2
            v-if="currentStep === 2"
            ref="step2Ref"
          />
          <AddPlanStep3
            v-if="currentStep === 3"
            ref="step3Ref"
          />
          <AddPlanStep4
            v-if="currentStep === 4"
            ref="step4Ref"
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
              @click="handleCancel"
              color="white"
            >
              Cancelar
            </BaseButton>
            <BaseButton
              type="submit"
              :disabled="isSubmitting"
            >
              {{ submitButtonText }}
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
      &__actions {
        flex-direction: row;
      }
    }
  }
</style>
