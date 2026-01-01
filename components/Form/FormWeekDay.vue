<script setup>
  const props = defineProps({
    day: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['select']);

  const daysMap = {
    L: 'Lunes',
    M: 'Martes',
    X: 'Miércoles',
    J: 'Jueves',
    V: 'Viernes',
    S: 'Sábado',
    D: 'Domingo',
  };

  const isActive = ref(props.active);

  function toggleDay() {
    isActive.value = !isActive.value;
    emit('select', { day: props.day, active: isActive.value });
  }
</script>

<template>
  <button
    class="form-week-day"
    :aria-label="daysMap[day]"
    :aria-pressed="isActive"
    @click="toggleDay"
  >
    {{ day }}
  </button>
</template>
