<script>
</script>

<template>
  <button class="form-button-new">
      <IconAdd/>
  </button>
</template>

<style lang="scss">
.form-button-new {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  border: var(--planastico-border-s);
  border-radius: 50%;
  box-shadow: var(--planastico-shadow);
  background: var(--planastico-yellow);
  
  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
}
</style>