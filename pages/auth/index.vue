<script setup>
  import LoginForm from '@/components/Auth/LoginForm.vue';
  import SignUpForm from '@/components/Auth/SignUpForm.vue';

  definePageMeta({ layout: false });

  const mode = ref('login');
</script>

<template>
  <main
    id="main-content"
    class="auth-page"
  >
    <div class="auth-page__card">
      <NuxtLink
        to="/"
        class="auth-page__brand"
        aria-label="Planástico Granada, ir al inicio"
      >
        <IconPlanastico class="auth-page__logo" />
        <span class="auth-page__brand-name">Planástico</span>
      </NuxtLink>

      <h1
        id="auth-title"
        class="auth-page__title"
      >
        {{ mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}
      </h1>

      <LoginForm
        v-if="mode === 'login'"
        aria-labelledby="auth-title"
        @switch="mode = 'signup'"
      />
      <SignUpForm
        v-else
        aria-labelledby="auth-title"
        @switch="mode = 'login'"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
  .auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background: var(--planastico-warm-soft-gray);

    &__card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      width: 100%;
      max-width: 400px;
      background: var(--planastico-white);
      border: var(--planastico-border-s);
      border-radius: var(--planastico-border-radius-m);
      padding: 2.5rem 2rem;
      box-shadow: var(--planastico-shadow);
    }

    &__brand {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--planastico-cold-black);
    }

    &__logo {
      height: 32px;
      width: auto;
    }

    &__brand-name {
      font-weight: 700;
      font-size: 1.25rem;
    }

    &__title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
  }
</style>
