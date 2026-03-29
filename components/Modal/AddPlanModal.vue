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
  const store = useAddPlanStore();

  const handleCancel = () => {
    isOpen.value = false;
    setTimeout(() => store.resetForm(), CLOSE_ANIMATION_MS);
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
        <DialogDescription class="sr-only">
          <span>Paso {{ store.currentStep }} de {{ TOTAL_STEPS }}</span>
        </DialogDescription>
        <AddPlanStepper @cancel="handleCancel" />
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
