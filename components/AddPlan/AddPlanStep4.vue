<script setup>
  const STEP_INDEX = 4;
  const { formData, handleFieldUpdate } = useAddPlanForm();
  const { validateStep, errors } = useFormValidation();

  const managementEmailField = computed(() => ({
    id: 'management-email',
    label: {
      name: 'Correo de gestión',
      isVisible: true,
      required: true,
    },
    inputType: 'email',
    placeholder: 'correo@ejemplo.com',
    roundedCorner: 'right',
  }));

  const useContactEmailCheckboxField = computed(() => ({
    id: 'use-contact-email',
    label: {
      name: 'Quiero que este sea también mi correo de contacto público',
      isVisible: true,
    },
  }));

  const contactEmailField = computed(() => ({
    id: 'contact-email',
    label: {
      name: 'Correo de contacto público',
      isVisible: true,
      required: true,
    },
    inputType: 'email',
    placeholder: 'correo@ejemplo.com',
    roundedCorner: 'right',
  }));

  const handleUseContactEmailUpdate = (value) => {
    handleFieldUpdate('useContactEmailForManagement', value);

    if (value) {
      handleFieldUpdate('contact_email', formData.value.validation_email);
    } else {
      handleFieldUpdate('contact_email', '');
    }
  };

  defineExpose({
    validate: () => validateStep(formData.value, STEP_INDEX),
  });
</script>

<template>
  <div class="add-plan-step-4">
    <FormBaseInput
      :model-value="formData.validation_email"
      :field="managementEmailField"
      :error="errors.validation_email"
      @update:model-value="(value) => handleFieldUpdate('validation_email', value)"
    />

    <fieldset class="add-plan-step-4__fieldset">
      <legend class="add-plan-step-4__legend">
        Correo de contacto público
      </legend>

      <FormCheckbox
        :model-value="formData.useContactEmailForManagement"
        :field="useContactEmailCheckboxField"
        @update:model-value="handleUseContactEmailUpdate"
      />

      <FormBaseInput
        v-if="!formData.useContactEmailForManagement"
        :model-value="formData.contact_email"
        :field="contactEmailField"
        :error="errors.contact_email"
        @update:model-value="(value) => handleFieldUpdate('contact_email', value)"
      />
    </fieldset>

    <div class="add-plan-step-4__captcha">
      <!-- TODO: Integrar Cloudflare Turnstile aquí -->
      <p class="add-plan-step-4__captcha-placeholder">
        [Captcha de Cloudflare Turnstile - Por implementar]
      </p>
      <span
        v-if="errors.captchaToken"
        class="add-plan-step-4__error"
        aria-live="polite"
      >
        {{ errors.captchaToken }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .add-plan-step-4 {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__legend {
      font-weight: 600;
      margin-bottom: 0.5rem;
      padding: 0;
    }

    &__captcha {
      margin-top: 1rem;
    }

    &__captcha-placeholder {
      padding: 2rem;
      background: var(--planastico-warm-soft-gray);
      border: 2px dashed var(--planastico-cold-gray);
      border-radius: 8px;
      text-align: center;
      color: var(--planastico-cold-gray);
      font-style: italic;
    }

    &__error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
