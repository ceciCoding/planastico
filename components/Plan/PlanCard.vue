<script setup lang="ts">
  import PlanCardActions from '@/components/Plan/PlanCardActions.vue';
  import BaseBadge from '@/components/BaseBadge.vue';
  import BaseImage from '@/components/BaseImage.vue';
  import type { PlanCardData } from '@/types/plan';

  const props = defineProps<{
    plan: PlanCardData;
  }>();

  const emit = defineEmits<{
    (e: 'save', planId: string): void;
    (e: 'share', planId: string): void;
  }>();
</script>

<template>
  <article
    class="plan-card"
    :class="{ 'plan-card--no-image': !plan.imageUrl }"
    :aria-labelledby="`plan-title-${plan.id}`"
    :aria-describedby="`plan-desc-${plan.id}`"
  >
    <NuxtLink
      class="plan-card__cover-link"
      :to="`/plan/${plan.slug}`"
      :aria-label="plan.title"
    />

    <div
      v-if="plan.imageUrl"
      class="plan-card__image-wrapper"
    >
      <BaseImage
        :src="plan.imageUrl"
        :alt="plan.title"
        class="plan-card__image"
      />
      <BaseBadge
        class="plan-card__category-on-image"
        :label="plan.categoryName"
        variant="category"
      />
    </div>

    <div class="plan-card__body">
      <PlanCardActions
        :plan-id="plan.id"
        :is-saved="plan.isSaved"
        @save="emit('save', $event)"
        @share="emit('share', $event)"
      />
      <h2
        :id="`plan-title-${plan.id}`"
        class="plan-card__title"
      >
        {{ plan.title }}
      </h2>
      <p
        v-if="plan.address"
        class="plan-card__address"
      >
        {{ plan.address }}
      </p>
      <p
        :id="`plan-desc-${plan.id}`"
        class="plan-card__description"
      >
        {{ plan.description }}
      </p>
    </div>

    <footer class="plan-card__footer">
      <span class="plan-card__date">
        <IconSingleDatePlan aria-hidden="true" />
        <span>
          {{ plan.dateLabel }}
          <template v-if="plan.timeLabel">| {{ plan.timeLabel }}</template>
        </span>
      </span>
      <div class="plan-card__footer-badges">
        <BaseBadge
          class="plan-card__category-in-footer"
          :label="plan.categoryName"
          variant="category"
        />
        <BaseBadge
          :label="plan.priceLabel"
          variant="price"
        />
      </div>
    </footer>
  </article>
</template>

<style lang="scss">
  .plan-card {
    position: relative;
    display: grid;
    grid-template-areas:
      'image body'
      'footer footer';
    grid-template-columns: 110px 1fr;
    grid-template-rows: 1fr auto;
    border: var(--planastico-border-s);
    border-radius: var(--planastico-border-radius-l);
    box-shadow: var(--planastico-shadow);
    overflow: hidden;
    background-color: var(--planastico-white);

    &--no-image {
      grid-template-areas:
        'body'
        'footer';
      grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
      grid-template-areas:
        'image body'
        'image footer';
      grid-template-columns: 200px 1fr;
      grid-template-rows: 1fr auto;
    }

    &--no-image {
      @media (min-width: 768px) {
        grid-template-areas:
          'body'
          'footer';
        grid-template-columns: 1fr;
      }
    }

    &__cover-link {
      position: absolute;
      inset: 0;
      z-index: 1;
      border-radius: inherit;
    }

    &__image-wrapper {
      grid-area: image;
      position: relative;
      z-index: 2;
      overflow: hidden;
      pointer-events: none;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__category-on-image {
      position: absolute;
      top: 8px;
      left: 8px;
      pointer-events: none;

      @media (min-width: 768px) {
        display: none;
      }
    }

    &__body {
      grid-area: body;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 12px 8px;
      position: relative;
      z-index: 2;
      pointer-events: none;
    }

    &__title {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.3;
      color: var(--planastico-cold-black);

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @media (min-width: 768px) {
        -webkit-line-clamp: unset;
        overflow: visible;
        display: block;
      }
    }

    &__address {
      font-size: 0.875rem;
      color: var(--planastico-cold-black);
      font-style: italic;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (min-width: 768px) {
        white-space: normal;
        overflow: visible;
        text-overflow: unset;
      }
    }

    &__description {
      font-size: 0.875rem;
      color: var(--planastico-cold-black);
      line-height: 1.5;

      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @media (min-width: 768px) {
        -webkit-line-clamp: unset;
        overflow: visible;
        display: block;
      }
    }

    &__footer {
      grid-area: footer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 12px;
      border-top: var(--planastico-border-s);
      position: relative;
      z-index: 2;
      pointer-events: none;
    }

    &__date {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--planastico-cold-black);
      white-space: nowrap;
    }

    &__footer-badges {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    &__category-in-footer {
      display: none;

      @media (min-width: 768px) {
        display: inline-block;
      }
    }
  }
</style>
