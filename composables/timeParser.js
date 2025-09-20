import { ref, watch } from 'vue';

export function useTimeParser(initialValue = '', emit = null) {
  const initialTime = parseTime(initialValue);
  const hours = ref(initialTime.hours);
  const minutes = ref(initialTime.minutes);
  const timePeriod = ref(initialTime.period);

  function parseTime(timeString) {
    if (!timeString) return { hours: 12, minutes: 0, period: 'AM' };

    const parts = timeString.split(' ');
    const timePart = parts[0] || '12:00';
    const period = parts[1] || 'AM';

    const [hour, minute] = timePart.split(':');
    return {
      hours: hour ? parseInt(hour, 10) : 12,
      minutes: minute ? parseInt(minute, 10) : 0,
      period
    };
  }

  function formatTimeString() {
    return `${hours.value.toString().padStart(2, '0')}:${minutes.value.toString().padStart(2, '0')} ${timePeriod.value}`;
  }

  function updateModelValue() {
    if (emit) {
      const timeString = formatTimeString();
      emit('update:modelValue', timeString);
    }
  }

  function syncFromExternalValue(newValue) {
    const parsed = parseTime(newValue);
    hours.value = parsed.hours;
    minutes.value = parsed.minutes;
    timePeriod.value = parsed.period;
  }

  if (emit) {
    watch([hours, minutes, timePeriod], updateModelValue);
  }

  return {
    hours,
    minutes,
    timePeriod,
    syncFromExternalValue
  };
}