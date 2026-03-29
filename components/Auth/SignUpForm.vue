<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'switch'): void;
  }>();

  const supabase = useSupabaseClient();

  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');
  const authError = ref('');
  const success = ref(false);
  const loading = ref(false);

  const emailField = {
    id: 'signup-email',
    label: { name: 'Email', isVisible: true, required: true },
    inputType: 'email',
    placeholder: 'tu@email.com',
    roundedCorner: 'right',
  };

  const passwordField = {
    id: 'signup-password',
    label: { name: 'Contraseña', isVisible: true, required: true },
    inputType: 'password',
    placeholder: '••••••••',
    roundedCorner: 'right',
  };

  const passwordConfirmField = {
    id: 'signup-password-confirm',
    label: { name: 'Repetí la contraseña', isVisible: true, required: true },
    inputType: 'password',
    placeholder: '••••••••',
    roundedCorner: 'right',
  };

  const signup = async () => {
    if (loading.value) return;

    if (password.value !== passwordConfirm.value) {
      authError.value = 'Las contraseñas no coinciden';
      return;
    }

    loading.value = true;
    authError.value = '';

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      authError.value = 'No pudimos crear tu cuenta. Intentalo de nuevo.';
      loading.value = false;
      return;
    }

    success.value = true;
    loading.value = false;
  };
</script>

<template>
  <div
    v-if="success"
    class="signup-form__success"
    role="status"
  >
    <p>¡Listo! Revisá tu email para confirmar tu cuenta.</p>
    <button
      type="button"
      class="signup-form__switch"
      @click="emit('switch')"
    >
      Ir a iniciar sesión
    </button>
  </div>

  <form
    v-else
    class="signup-form"
    novalidate
    @submit.prevent="signup"
  >
    <FormBaseInput
      v-model="email"
      :field="emailField"
      :error="''"
    />

    <FormBaseInput
      v-model="password"
      :field="passwordField"
      :error="''"
    />

    <FormBaseInput
      v-model="passwordConfirm"
      :field="passwordConfirmField"
      :error="''"
    />

    <div
      v-if="authError"
      class="signup-form__error"
      role="alert"
    >
      {{ authError }}
    </div>

    <BaseButton
      type="submit"
      :disabled="loading"
    >
      {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
    </BaseButton>

    <button
      type="button"
      class="signup-form__switch"
      @click="emit('switch')"
    >
      ¿Ya tenés cuenta? <strong>Iniciá sesión</strong>
    </button>
  </form>
</template>

<style scoped lang="scss">
  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    &__error {
      font-size: 0.875rem;
      color: var(--planastico-error-red);
      padding: 0.75rem 1rem;
      background: #fee;
      border-radius: var(--planastico-border-radius-s);
    }

    &__success {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
      font-size: 1rem;
    }

    &__switch {
      font-size: 0.9375rem;
      color: var(--planastico-cold-black);
      text-decoration: underline;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
