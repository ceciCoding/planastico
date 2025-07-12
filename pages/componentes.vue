<script setup>
const inputValue = ref('hola');
</script>

<template>
  <main>
    <h1>Componentes</h1>
    <BaseInput
      v-model="inputValue" 
      label="Título del plan"
      :required="true"
    />
    <BaseInput
      v-model="inputValue"
      label="Precio"
      :required="true"
      :max-length="70"
      :is-currency="true"
      input-type="number"
      error="This field is required"
    />
  </main>
</template>

<style>
h1 {
 font-size: 2.5rem;
}

.base-input {
  margin-bottom: 3rem;
}
</style>