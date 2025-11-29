<script setup>
  import BaseModal from './BaseModal.vue';
</script>

<template>
  <BaseModal class="test-modal">
    <template #trigger>
      <button class="btn-primary">Open Test Modal</button>
    </template>
    <template #title>Test Modal Title</template>
    <template #description>This is a description for the test modal.</template>
    <template #content>
      <p>This is the content of the test modal.</p>
    </template>
  </BaseModal>
</template>

<style lang="scss">
  .test-modal {
    .btn-primary {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 1rem;
    }

    .base-modal__content {
      padding: 2rem;
      height: auto;
      border: var(--planastico-border-m);
    }
  }
</style>
