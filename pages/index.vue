<script setup>
  import AddPlanButton from '@/components/AddPlan/AddPlanButton.vue';

  const { getEvents } = useEvents();

  const {
    data: plansData,
    error,
    pending,
  } = await useAsyncData('plans', async () => {
    const result = await getEvents();
    return result.data;
  });

  const plans = computed(() => plansData.value || []);
</script>

<template>
  <div class="home">
    <h1>Planes</h1>

    <div v-if="pending">Cargando planes...</div>

    <div
      v-else-if="error"
      class="error"
    >
      Error cargando planes: {{ error }}
    </div>

    <div v-else-if="!plans || plans.length === 0">
      No hay planes disponibles
    </div>

    <div
      v-else
      class="plans-list"
    >
      <pre
        v-for="(plan, index) in plans"
        :key="plan?.id || index"
        class="plan-item"
        >{{ JSON.stringify(plan, null, 2) }}
      </pre>
    </div>

    <AddPlanButton />
  </div>
</template>

<style lang="scss">
  .home {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      margin-bottom: 2rem;
    }
  }

  .error {
    color: var(--planastico-error-red);
    padding: 1rem;
    background-color: #fee;
    border-radius: 8px;
  }

  .plans-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .plan-item {
    background-color: var(--planastico-warm-soft-gray);
    padding: 1rem;
    border-radius: 8px;
    border: var(--planastico-border-s);
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .add-plan-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
</style>
