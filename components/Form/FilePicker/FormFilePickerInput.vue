<script setup>
  import { useImageValidation } from '~/composables/imageValidation.js';

  const props = defineProps({
    modelValue: {
      type: [File, null],
      default: null,
    },
    field: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits(['error']);

  const inputRef = ref(null);

  const previewSrc = ref(null);
  const hasError = ref(false);

  const { validateImage } = useImageValidation();

  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const validation = validateImage(file);
    if (!validation.valid) {
      hasError.value = true;
      emit('error', validation.error);
      return;
    } else {
      unsetError();
    }

    previewSrc.value = URL.createObjectURL(file);
  }

  function deleteImage() {
    previewSrc.value = null;
    inputRef.value.value = null;
    unsetError();
  }

  function unsetError() {
    hasError.value = false;
    emit('error', null);
  }
</script>

<template>
  <div
    class="form-file-picker-input"
    :class="{ 'form-file-picker-input--error': hasError }"
  >
    <div
      class="form-file-picker-input__header"
      :class="{ 'form-file-picker-input__header--error': hasError }"
    >
      <span class="form-file-picker-input__number">{{ index }}</span>
      <button
        v-if="previewSrc"
        type="button"
        class="form-file-picker-input__remove"
        :aria-label="`Eliminar imagen ${index}`"
        @click="deleteImage"
      >
        <IconCancel aria-hidden="true" />
      </button>
    </div>
    <div class="form-file-picker-input__wrapper">
      <input
        ref="inputRef"
        class="form-file-picker-input__input"
        :class="{
          'form-file-picker-input__input--with-preview': previewSrc,
        }"
        type="file"
        :id="id"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
        tabindex="-1"
        aria-hidden="true"
        @change="onFileChange"
      />
      <button
        v-if="!previewSrc"
        class="form-file-picker-input__icon-wrapper"
        :class="{ 'form-file-picker-input__icon-wrapper--error': hasError }"
        :aria-label="`Subir imagen ${index}`"
        @click.prevent="inputRef.click()"
      >
        <IconUpload
          class="form-file-picker-input__icon"
          :class="{ 'form-file-picker-input__icon--error': hasError }"
          aria-hidden="true"
        />
      </button>
      <img
        v-if="previewSrc"
        class="form-file-picker-input__preview"
        :src="previewSrc"
        :alt="`Vista previa de la imagen ${index}`"
      />
    </div>
  </div>
</template>

<style lang="scss">
  .form-file-picker-input {
    border: var(--planastico-border-s);
    border-radius: 12px;
    overflow: hidden;
    height: 125px;

    &--error {
      border-color: var(--planastico-error-red);
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0.5rem;
      background-color: var(--planastico-soft-white);
      border-bottom: var(--planastico-border-s);
      background: var(--planastico-warm-soft-gray);

      &--error {
        border-bottom-color: var(--planastico-error-red);
        color: var(--planastico-error-red);
      }
    }

    &__number {
      font-size: 0.875rem;
    }

    &__remove {
      background: none;
      border: none;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: max-content;
      width: max-content;
    }

    &__wrapper {
      min-width: 0;
      color: transparent;
      position: relative;
      overflow: hidden;
      height: 100%;
    }

    &__icon-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      padding: 0.5rem;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      cursor: pointer;

      &:hover {
        border: var(--planastico-border-s);
      }

      &--error:hover {
        border-color: var(--planastico-error-red);
      }
    }

    &__icon {
      color: var(--planastico-cold-black);

      &--error {
        color: var(--planastico-error-red);
      }
    }

    &__input {
      width: 100%;
      height: 100%;

      &::-webkit-file-upload-button {
        visibility: hidden;
      }

      &::before {
        content: '';
        display: block;
        background: var(--planastico-soft-yellow);
        border: none;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      &--error {
        &::before {
          color: var(--planastico-error-red);
        }
      }

      &--with-preview {
        &::before {
          background-color: transparent;
          pointer-events: none;
          cursor: default;
        }
      }
    }

    &__preview {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }
</style>
