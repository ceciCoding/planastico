<script setup>
  definePageMeta({ layout: 'default', middleware: 'auth' });

  const { getSavedPlans } = useSavedPlans();

  const {
    data: savedData,
    error,
    pending,
  } = await useAsyncData('planes-guardados', async () => {
    const result = await getSavedPlans();
    return result.data;
  });

  const savedPlans = computed(() => savedData.value || []);
</script>

<template>
  <div class="planes-guardados">
    <h1>Planes guardados</h1>

    <div v-if="pending">Cargando...</div>

    <div
      v-else-if="error"
      class="planes-guardados__error"
    >
      Error cargando tus planes guardados: {{ error }}
    </div>

    <p v-else-if="!savedPlans.length">Todavía no guardaste ningún plan.</p>

    <div
      v-else
      class="planes-guardados__list"
    >
      <pre
        v-for="saved in savedPlans"
        :key="saved.id"
        class="planes-guardados__item"
      >{{ JSON.stringify(saved.plans, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .planes-guardados {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      margin-bottom: 2rem;
    }

    &__error {
      color: var(--planastico-error-red);
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__item {
      background: var(--planastico-warm-soft-gray);
      padding: 1rem;
      border-radius: 8px;
      border: var(--planastico-border-s);
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
</style>
