<script setup>
const firstInput = ref("hola");
const secondInput = ref("");
</script>

<template>
  <main>
    <h1>Componentes</h1>
    <section>
      <h2>Form</h2>
      <FormBaseInput v-model="firstInput" label="Título del plan" :required="true" />
      <FormBaseInput
        v-model="secondInput"
        label="Precio"
        :required="true"
        :max-length="70"
        is-currency
        input-type="number"
        error="Este campo es requerido"
      />
    </section>
    <section>
      <h2>Icons</h2>
      <div class="icons-wrapper">
        <IconBurguerMenu />
        <IconCalendar />
        <IconShare />
        <IconUser />
        <IconBookmark />
        <IconBookmark filled />
        <IconEdit />
        <IconChevron />
        <IconChevron direction="up" />
        <IconChevron direction="down" />
        <IconChevron direction="right" />
      </div>
    </section>
  </main>
</template>

<style>
h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

.base-input {
  margin-bottom: 3rem;
}

.icons-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
