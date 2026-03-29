<script setup>
  definePageMeta({ layout: 'default' });
  import AddPlanButton from '@/components/AddPlan/AddPlanButton.vue';
  import PlanCard from '@/components/Plan/PlanCard.vue';

  const { getPlans } = usePlans();
  const { getSavedPlans, toggleSavedPlan } = useSavedPlans();
  const { toPlanCardData } = usePlanAdapter();

  const {
    data: homeData,
    error,
    pending,
  } = await useAsyncData('home', async () => {
    const [plansResult, savedResult] = await Promise.all([
      getPlans(),
      getSavedPlans(),
    ]);
    return {
      plans: plansResult.data ?? [],
      savedPlanIds: savedResult.data?.map((sp) => sp.plan_id) ?? [],
    };
  });

  const savedPlanIds = reactive(new Set(homeData.value?.savedPlanIds ?? []));

  const plans = computed(() =>
    (homeData.value?.plans ?? []).map((plan) =>
      toPlanCardData(plan, savedPlanIds)
    )
  );

  const handleSave = async (planId) => {
    const wasSaved = savedPlanIds.has(planId);
    if (wasSaved) {
      savedPlanIds.delete(planId);
    } else {
      savedPlanIds.add(planId);
    }
    const { error: saveError } = await toggleSavedPlan(planId);
    if (saveError) {
      if (wasSaved) {
        savedPlanIds.add(planId);
      } else {
        savedPlanIds.delete(planId);
      }
    }
  };

  const handleShare = async (planId) => {
    if (!import.meta.client) return;
    const plan = plans.value.find((p) => p.id === planId);
    const url = `${window.location.origin}/plan/${plan?.slug ?? planId}`;
    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };
</script>

<template>
  <div class="home">
    <h1 id="main-title">Planes</h1>

    <div v-if="pending">Cargando planes...</div>

    <div
      v-else-if="error"
      class="home__error"
    >
      Error cargando planes: {{ error }}
    </div>

    <div v-else-if="!plans.length">No hay planes disponibles</div>

    <ul
      v-else
      class="home__plans-list"
      aria-labeledby="main-title"
      :aria-busy="pending"
    >
      <li
        class="home__plans-list-item"
        v-for="plan in plans"
        :key="plan.id"
      >
        <PlanCard
          :plan="plan"
          @save="handleSave"
          @share="handleShare"
        />
      </li>
    </ul>

    <AddPlanButton />
  </div>
</template>

<style lang="scss">
  .home {
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;

    h1 {
      margin-bottom: 2rem;
    }

    &__error {
      color: var(--planastico-error-red);
      padding: 1rem;
      background-color: #fee;
      border-radius: 8px;
    }

    &__plans-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .add-plan-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
    }
  }
</style>
