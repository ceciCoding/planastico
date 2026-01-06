<script setup>
  const props = defineProps({
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      default: 4,
    },
  });

  const emit = defineEmits(['go-back']);

  const handleGoBack = () => {
    emit('go-back');
  };
</script>

<template>
  <header class="add-plan-stepper-header">
    <AddPlanHeaderShape class="add-plan-stepper-header__shape" />
    <div class="add-plan-stepper-header__content">
      <button
        class="add-plan-stepper-header__back-button"
        aria-label="Volver al paso anterior"
        @click="handleGoBack"
      >
        <IconArrow direction="left" />
      </button>
      <h2 class="add-plan-stepper-header__title">Agregar plan</h2>
      <span class="add-plan-stepper-header__step">
        {{ currentStep }}/{{ totalSteps }}
      </span>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .add-plan-stepper-header {
    position: relative;
    margin-bottom: 2rem;
    min-height: 100px;

    &__shape {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      z-index: 0;
    }

    &__content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      padding-top: 2.7rem;
    }

    &__back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--planastico-cold-black);

      &:hover {
        opacity: 0.8;
      }

      &:focus-visible {
        outline: 2px solid var(--planastico-cold-black);
        outline-offset: 2px;
        border-radius: 4px;
      }
    }

    &__title {
      flex: 1;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    &__step {
      font-size: 1rem;
      font-weight: 600;
      color: var(--planastico-cold-gray);
      padding-right: 1.5rem;
    }
  }
</style>
