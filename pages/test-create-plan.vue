<template>
  <div class="test-page">
    <h1>Probar Creación de Evento</h1>

    <div
      v-if="loading"
      class="loading"
    >
      Creando evento...
    </div>

    <div
      v-if="success"
      class="success"
    >
      ✅ Evento creado correctamente!
      <div
        v-if="validationCode"
        class="validation-code"
      >
        <strong>Código de validación generado:</strong>
        {{ validationCode }}
      </div>
      <pre>{{ JSON.stringify(createdEvent, null, 2) }}</pre>
    </div>

    <div
      v-if="error"
      class="error"
    >
      ❌ Error: {{ error }}
    </div>

    <div class="user-info">
      <p v-if="user">✅ Usuario autenticado: {{ user.email }}</p>
      <p v-else>⚠️ Usuario NO autenticado (modo anónimo)</p>
    </div>

    <button
      @click="testCreateEvent"
      :disabled="loading"
    >
      Crear Evento de Prueba
    </button>

    <div
      v-if="categories.length"
      class="categories"
    >
      <h2>Categorías disponibles:</h2>
      <ul>
        <li
          v-for="cat in categories"
          :key="cat.id"
        >
          {{ cat.id }} - {{ cat.name }} ({{ cat.slug }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  const { createEvent, getCategories } = useEvents();
  const user = useSupabaseUser();

  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);
  const createdEvent = ref(null);
  const validationCode = ref(null); // ✅ Añadir esto
  const categories = ref([]);

  onMounted(async () => {
    const { data } = await getCategories();
    if (data) {
      categories.value = data;
    }
  });

  const testCreateEvent = async () => {
    loading.value = true;
    success.value = false;
    error.value = null;
    createdEvent.value = null;
    validationCode.value = null; // ✅ Resetear

    const testEvent = {
      name: 'Concierto de Prueba en Granada',
      description:
        'Este es un evento de prueba para verificar que la API funciona correctamente. Se puede borrar después.',
      address: 'Plaza Nueva, Granada',
      place: 'presencial',
      frequency: 'una vez',
      start_date: '2025-12-01',
      start_time: '20:00',
      end_time: '23:00',
      cost: 'precio fijo',
      price: 15.5,
      categories: [6], // Ajusta según tus IDs
      contact_email: 'contacto@ejemplo.com',
    };

    if (!user.value) {
      testEvent.validation_email = 'test@ejemplo.com';
    }

    const {
      data,
      error: err,
      validationCode: code,
    } = await createEvent(testEvent);

    loading.value = false;

    if (err) {
      error.value = err;
    } else {
      success.value = true;
      createdEvent.value = data;
      validationCode.value = code; // ✅ Guardar el código
    }
  };
</script>

<style scoped>
  /* ... tus estilos existentes ... */

  .user-info {
    padding: 12px;
    background: #f3f4f6;
    border-radius: 8px;
    margin: 20px 0;
  }

  .validation-code {
    margin-top: 12px;
    padding: 12px;
    background: #fef3c7;
    border-radius: 6px;
    font-family: monospace;
  }
</style>
