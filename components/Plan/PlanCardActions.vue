<script setup lang="ts">
  defineProps<{
    planId: string;
    isSaved: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'save', planId: string): void;
    (e: 'share', planId: string): void;
  }>();
</script>

<template>
  <div class="plan-card-actions">
    <button
      class="plan-card-actions__btn"
      type="button"
      aria-label="Compartir plan"
      @click="emit('share', planId)"
    >
      <IconShare />
    </button>
    <button
      class="plan-card-actions__btn"
      type="button"
      :aria-label="isSaved ? 'Quitar de guardados' : 'Guardar plan'"
      :aria-pressed="String(isSaved)"
      @click="emit('save', planId)"
    >
      <IconBookmark :filled="isSaved" />
    </button>
  </div>
</template>

<style scoped lang="scss">
  .plan-card-actions {
    display: flex;
    gap: 8px;
    align-self: flex-end;
    position: relative;
    z-index: 2;

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      color: var(--planastico-cold-black);
      transition: opacity 0.15s ease;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.5;
      }
    }
  }
</style>
