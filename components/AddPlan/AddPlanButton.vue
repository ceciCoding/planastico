<script setup>
  import AddPlanModal from '@/components/Modal/AddPlanModal.vue';
  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  };
</script>

<template>
  <AddPlanModal v-model:open="isModalOpen">
    <template #trigger>
      <button
        class="add-plan-button"
        type="button"
        aria-label="Añadir nuevo plan"
      >
        <IconAdd />
      </button>
    </template>
  </AddPlanModal>
</template>

<style lang="scss">
  .add-plan-button {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px;
    border: var(--planastico-border-s);
    border-radius: 50%;
    box-shadow: var(--planastico-shadow);
    background: var(--planastico-yellow);

    &:active {
      box-shadow: none;
      transform: translateY(2px);
    }
  }
</style>
