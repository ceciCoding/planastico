<script setup>
  import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from 'reka-ui';
  import IconCancel from '~/components/Icon/IconCancel.vue';
</script>

<template>
  <DialogRoot class="base-modal">
    <DialogTrigger asChild>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="base-modal__overlay" />
      <DialogContent class="base-modal__content">
        <DialogTitle class="base-modal__title">
          <slot name="title" />
        </DialogTitle>
        <DialogDescription class="base-modal__description">
          <slot name="description" />
        </DialogDescription>
        <slot name="content" />
        <DialogClose
          class="base-modal__close"
          aria-label="Cerrar"
        >
          <slot name="close-icon">
            <IconCancel />
          </slot>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss">
  .base-modal {
    &__overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 50;
    }

    &__content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      max-width: 500px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      z-index: 51;
    }

    &__close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--planastico-cold-black);
    }
  }
</style>
