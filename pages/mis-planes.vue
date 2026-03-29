<script setup>
  definePageMeta({ layout: 'default', middleware: 'auth' });

  const { getMisPlanes } = usePlans();

  const {
    data: plansData,
    error,
    pending,
  } = await useAsyncData('mis-planes', async () => {
    const result = await getMisPlanes();
    return result.data;
  });

  const plans = computed(() => plansData.value || []);
</script>

<template>
  <div class="mis-planes">
    <h1>Mis planes</h1>

    <div v-if="pending">Cargando...</div>

    <div
      v-else-if="error"
      class="mis-planes__error"
    >
      Error cargando tus planes: {{ error }}
    </div>

    <p v-else-if="!plans.length">Todavía no creaste ningún plan.</p>

    <div
      v-else
      class="mis-planes__list"
    >
      <pre
        v-for="plan in plans"
        :key="plan.id"
        class="mis-planes__item"
      >{{ JSON.stringify(plan, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mis-planes {
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
