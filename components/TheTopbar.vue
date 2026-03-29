<script setup lang="ts">
  import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from 'reka-ui';
  import AddPlanModal from '@/components/Modal/AddPlanModal.vue';

  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const isAddPlanOpen = ref(false);

  const logout = async () => {
    await supabase.auth.signOut();
  };
</script>

<template>
  <header class="topbar">
    <div class="topbar__inner">
      <NuxtLink
        to="/"
        class="topbar__brand"
        aria-label="Planástico Granada, ir al inicio"
      >
        <IconPlanastico class="topbar__logo" />
        <span class="topbar__brand-name">Planástico</span>
        <span
          class="topbar__city"
          aria-hidden="true"
        >Granada</span>
      </NuxtLink>

      <div class="topbar__right">
        <AddPlanModal v-model:open="isAddPlanOpen">
          <template #trigger>
            <button
              type="button"
              class="topbar__add-plan-btn"
            >
              Agregar plan
              <IconAdd aria-hidden="true" />
            </button>
          </template>
        </AddPlanModal>

        <NuxtLink
          v-if="!user"
          to="/auth"
          class="topbar__entrar-link"
        >Entrar</NuxtLink>

        <DropdownMenuRoot v-else>
          <DropdownMenuTrigger class="topbar__user-trigger">
            <IconUser aria-hidden="true" />
            Mi cuenta
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              class="topbar__user-menu"
              align="end"
              :side-offset="8"
            >
              <DropdownMenuItem as-child>
                <NuxtLink
                  to="/mis-planes"
                  class="topbar__user-menu-item"
                >Mis planes</NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <NuxtLink
                  to="/planes-guardados"
                  class="topbar__user-menu-item"
                >Planes guardados</NuxtLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator class="topbar__user-menu-separator" />

              <DropdownMenuItem
                class="topbar__user-menu-item topbar__user-menu-item--action"
                @select="logout"
              >
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  $breakpoint-md: 768px;

  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--planastico-white);
    border-bottom: var(--planastico-border-s);

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    &__brand {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--planastico-cold-black);
      flex-shrink: 0;
    }

    &__logo {
      height: 28px;
      width: auto;
    }

    &__brand-name {
      font-weight: 700;
      font-size: 1.125rem;
    }

    &__city {
      font-size: 0.875rem;
      color: var(--planastico-cold-black-shade);
    }

    &__right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__add-plan-btn {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--planastico-yellow);
      border: var(--planastico-border-s);
      border-radius: var(--planastico-border-radius-l);
      box-shadow: var(--planastico-shadow);
      font-size: 1rem;
      white-space: nowrap;
      cursor: pointer;

      @media (min-width: #{$breakpoint-md}) {
        display: flex;
      }

      &:active {
        box-shadow: none;
        transform: translateY(2px);
      }
    }

    &__entrar-link {
      text-decoration: underline;
      color: var(--planastico-cold-black);
      font-size: 0.9375rem;

      &:hover {
        color: var(--planastico-cold-black-shade);
      }
    }

    &__user-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border: var(--planastico-border-s);
      border-radius: var(--planastico-border-radius-l);
      font-size: 0.9375rem;
      cursor: pointer;

      &[data-state='open'] {
        background: var(--planastico-warm-soft-gray);
      }
    }
  }
</style>

<!-- Unscoped: DropdownMenuPortal renders to <body>, outside component scope -->
<style lang="scss">
  .topbar__user-menu {
    min-width: 180px;
    background: var(--planastico-white);
    border: var(--planastico-border-s);
    border-radius: var(--planastico-border-radius-m);
    box-shadow: var(--planastico-shadow);
    overflow: hidden;
    z-index: 200;
  }

  .topbar__user-menu-item {
    display: block;
    padding: 0.875rem 1.25rem;
    text-decoration: none;
    color: var(--planastico-cold-black);
    font-size: 0.9375rem;
    cursor: pointer;
    outline: none;

    &[data-highlighted] {
      background: var(--planastico-warm-soft-gray);
    }

    &--action {
      width: 100%;
      text-align: left;
    }
  }

  .topbar__user-menu-separator {
    height: 2px;
    background: var(--planastico-warm-soft-gray);
    margin: 0;
  }
</style>
