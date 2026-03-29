<template>
  <a
    href="#main-content"
    class="skip-link"
  >Saltar al contenido principal</a>
  <TheTopbar />
  <main id="main-content">
    <slot />
  </main>
</template>

<style scoped lang="scss">
  .skip-link {
    position: absolute;
    top: -100%;
    left: 0;
    padding: 0.5rem 1rem;
    background: var(--planastico-cold-black);
    color: var(--planastico-white);
    text-decoration: none;
    z-index: 9999;

    &:focus {
      top: 0;
    }
  }
</style>
