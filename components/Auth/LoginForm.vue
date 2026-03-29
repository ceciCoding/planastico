<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'switch'): void;
  }>();

  const supabase = useSupabaseClient();

  const email = ref('');
  const password = ref('');
  const authError = ref('');
  const loading = ref(false);

  const emailField = {
    id: 'login-email',
    label: { name: 'Email', isVisible: true, required: true },
    inputType: 'email',
    placeholder: 'tu@email.com',
    roundedCorner: 'right',
  };

  const passwordField = {
    id: 'login-password',
    label: { name: 'Contraseña', isVisible: true, required: true },
    inputType: 'password',
    placeholder: '••••••••',
    roundedCorner: 'right',
  };

  const login = async () => {
    if (loading.value) return;
    loading.value = true;
    authError.value = '';

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      authError.value = 'Email o contraseña incorrectos';
      loading.value = false;
      return;
    }

    await navigateTo('/');
  };
</script>

<template>
  <form
    class="login-form"
    novalidate
    @submit.prevent="login"
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

    <div
      v-if="authError"
      class="login-form__error"
      role="alert"
    >
      {{ authError }}
    </div>

    <BaseButton
      type="submit"
      :disabled="loading"
    >
      {{ loading ? 'Entrando...' : 'Entrar' }}
    </BaseButton>

    <button
      type="button"
      class="login-form__switch"
      @click="emit('switch')"
    >
      ¿No tenés cuenta? <strong>Registrate</strong>
    </button>
  </form>
</template>

<style scoped lang="scss">
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    &__switch {
      font-size: 0.9375rem;
      color: var(--planastico-cold-black);
      text-decoration: underline;
      text-align: center;
      cursor: pointer;
    }

    &__error {
      font-size: 0.875rem;
      color: var(--planastico-error-red);
      padding: 0.75rem 1rem;
      background: #fee;
      border-radius: var(--planastico-border-radius-s);
    }
  }
</style>
