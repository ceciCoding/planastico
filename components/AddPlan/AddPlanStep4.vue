<script setup>
  const store = useAddPlanStore();

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

  const captchaToken = computed({
    get: () => store.formData.captchaToken,
    set: (value) => store.handleFieldUpdate('captchaToken', value),
  });

  const handleUseContactEmailUpdate = (value) => {
    store.handleFieldUpdate('useContactEmailForManagement', value);
    if (value) {
      store.handleFieldUpdate('contact_email', store.formData.validation_email);
    } else {
      store.handleFieldUpdate('contact_email', '');
    }
  };
</script>

<template>
  <div class="add-plan-step-4">
    <FormBaseInput
      :model-value="store.formData.validation_email"
      :field="managementEmailField"
      :error="store.errors.validation_email"
      @update:model-value="(value) => store.handleFieldUpdate('validation_email', value)"
    />

    <fieldset class="add-plan-step-4__fieldset">
      <legend class="add-plan-step-4__legend">
        Correo de contacto público
      </legend>

      <FormCheckbox
        :model-value="store.formData.useContactEmailForManagement"
        :field="useContactEmailCheckboxField"
        @update:model-value="handleUseContactEmailUpdate"
      />

      <FormBaseInput
        v-if="!store.formData.useContactEmailForManagement"
        :model-value="store.formData.contact_email"
        :field="contactEmailField"
        :error="store.errors.contact_email"
        @update:model-value="(value) => store.handleFieldUpdate('contact_email', value)"
      />
    </fieldset>

    <div class="add-plan-step-4__captcha">
      <Turnstile
        v-model="captchaToken"
        class="add-plan-step-4__captcha-widget"
      />
      <span
        v-if="store.errors.captchaToken"
        class="add-plan-step-4__error"
        aria-live="polite"
      >
        {{ store.errors.captchaToken }}
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

    &__captcha-widget {
      display: flex;
      justify-content: center;
    }

    &__error {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--planastico-error-red);
    }
  }
</style>
