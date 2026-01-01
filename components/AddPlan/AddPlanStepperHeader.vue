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
    <button
      v-if="currentStep > 1"
      type="button"
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
  </header>
</template>

<style scoped lang="scss">
  .add-plan-stepper-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    position: relative;

    &__back-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
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
    }
  }
</style>
