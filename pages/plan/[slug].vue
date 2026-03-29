<script setup lang="ts">
  definePageMeta({ layout: 'default' });
  import BaseImage from '@/components/BaseImage.vue';
  import BaseBadge from '@/components/BaseBadge.vue';

  const route = useRoute();
  const { getPlanBySlug } = usePlans();
  const { getImageUrl } = usePlanAdapter();

  const slug = route.params.slug as string;

  const { data: plan, error } = await useAsyncData(`plan-${slug}`, () =>
    getPlanBySlug(slug).then((res) => {
      if (res.error || !res.data) throw createError({ statusCode: 404, message: 'Plan no encontrado' });
      return res.data;
    })
  );

  const sortedImages = computed(() =>
    [...(plan.value?.plan_images ?? [])].sort((a, b) => a.position - b.position)
  );

  const heroImageUrl = computed(() =>
    sortedImages.value[0] ? getImageUrl(sortedImages.value[0].storage_path) : null
  );

  const categories = computed(() =>
    plan.value?.plan_categories.map((pc) => pc.categories) ?? []
  );

  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function formatTime(timeStr: string): string {
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = (minutesStr ?? '00').slice(0, 2).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }

  const priceLabel = computed(() => {
    if (!plan.value) return '';
    if (plan.value.cost === 'free') return 'Gratis';
    if (plan.value.cost === 'pay-what-you-want') return 'A voluntad';
    return plan.value.price != null ? `€${plan.value.price}` : 'Precio fijo';
  });

  const shareUrl = computed(() =>
    import.meta.client ? `${window.location.origin}/plan/${slug}` : ''
  );

  const handleShare = async () => {
    if (!import.meta.client) return;
    if (navigator.share) {
      await navigator.share({ title: plan.value?.name, url: shareUrl.value });
    } else {
      await navigator.clipboard.writeText(shareUrl.value);
    }
  };

  useSeoMeta({
    title: () => plan.value?.name ?? 'Plan',
    description: () => plan.value?.description ?? '',
    ogTitle: () => plan.value?.name ?? 'Plan',
    ogDescription: () => plan.value?.description ?? '',
    ogImage: () => heroImageUrl.value ?? undefined,
  });
</script>

<template>
  <div
    v-if="error"
    class="plan-detail__error"
  >
    Plan no encontrado.
  </div>

  <article
    v-else-if="plan"
    class="plan-detail"
    :aria-labelledby="'plan-detail-title'"
  >
    <div
      v-if="heroImageUrl"
      class="plan-detail__hero"
    >
      <BaseImage
        :src="heroImageUrl"
        :alt="plan.name"
        class="plan-detail__hero-image"
      />
    </div>

    <div class="plan-detail__content">
      <header class="plan-detail__header">
        <h1
          id="plan-detail-title"
          class="plan-detail__title"
        >
          {{ plan.name }}
        </h1>

        <div class="plan-detail__badges">
          <BaseBadge
            v-for="cat in categories"
            :key="cat.id"
            :label="cat.name"
            variant="category"
          />
          <BaseBadge
            :label="priceLabel"
            variant="price"
          />
        </div>
      </header>

      <section
        class="plan-detail__meta"
        aria-label="Detalles del plan"
      >
        <p class="plan-detail__date">
          <IconSingleDatePlan aria-hidden="true" />
          <span>{{ formatDate(plan.start_date) }}</span>
          <template v-if="plan.start_time">
            <span aria-hidden="true">·</span>
            <span>{{ formatTime(plan.start_time) }}</span>
            <template v-if="plan.end_time">
              <span aria-hidden="true">–</span>
              <span>{{ formatTime(plan.end_time) }}</span>
            </template>
          </template>
        </p>

        <p
          v-if="plan.address"
          class="plan-detail__address"
        >
          {{ plan.address }}
        </p>

        <a
          v-if="plan.meeting_link"
          :href="plan.meeting_link"
          target="_blank"
          rel="noopener noreferrer"
          class="plan-detail__meeting-link"
        >
          Unirse al evento online
        </a>
      </section>

      <p class="plan-detail__description">{{ plan.description }}</p>

      <ul
        v-if="plan.extra_links?.length"
        class="plan-detail__links"
        aria-label="Links adicionales"
      >
        <li
          v-for="(link, i) in plan.extra_links"
          :key="i"
        >
          <a
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
          >{{ link }}</a>
        </li>
      </ul>

      <footer class="plan-detail__footer">
        <a
          v-if="plan.contact_email"
          :href="`mailto:${plan.contact_email}`"
          class="plan-detail__contact"
        >
          {{ plan.contact_email }}
        </a>

        <button
          type="button"
          class="plan-detail__share"
          @click="handleShare"
        >
          Compartir
        </button>
      </footer>
    </div>
  </article>
</template>

<style lang="scss">
  .plan-detail {
    max-width: 760px;
    margin: 0 auto;
    padding-bottom: 3rem;

    &__error {
      padding: 2rem;
      text-align: center;
      color: var(--planastico-error-red);
    }

    &__hero {
      width: 100%;
      height: 280px;
      overflow: hidden;

      @media (min-width: 768px) {
        height: 400px;
        border-radius: var(--planastico-border-radius-l);
        margin-top: 1.5rem;
      }
    }

    &__hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__content {
      padding: 1.5rem;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    &__title {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      color: var(--planastico-cold-black);
    }

    &__badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.9375rem;
      color: var(--planastico-cold-black);
    }

    &__date {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-weight: 500;
    }

    &__address {
      font-style: italic;
    }

    &__meeting-link {
      color: var(--planastico-cold-black);
      font-weight: 500;
    }

    &__description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--planastico-cold-black);
      margin-bottom: 1.5rem;
      white-space: pre-line;
    }

    &__links {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;

      a {
        color: var(--planastico-cold-black);
        word-break: break-all;
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 1.25rem;
      border-top: var(--planastico-border-s);
    }

    &__contact {
      color: var(--planastico-cold-black);
      font-size: 0.9375rem;
    }

    &__share {
      background: none;
      border: var(--planastico-border-s);
      border-radius: var(--planastico-border-radius-l);
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.9375rem;
      color: var(--planastico-cold-black);

      &:hover {
        background-color: var(--planastico-light-grey, #f5f5f5);
      }
    }
  }
</style>
