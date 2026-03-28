import { ref, watch } from 'vue';

type TimepickerEmit = ((event: 'update:model-value', value: string) => void) | null;

interface ParsedTime {
  hours: number;
  minutes: number;
}

export function useTimeParser(initialValue = '', emit: TimepickerEmit = null) {
  const initialTime = parseTime(initialValue);
  const hours = ref<number>(initialTime.hours);
  const minutes = ref<number>(initialTime.minutes);

  function parseTime(timeString: string): ParsedTime {
    if (!timeString) return { hours: 0, minutes: 0 };

    const [hour, minute] = timeString.split(':');
    return {
      hours: hour ? parseInt(hour, 10) : 0,
      minutes: minute ? parseInt(minute, 10) : 0,
    };
  }

  function formatTimeString(): string {
    return `${hours.value.toString().padStart(2, '0')}:${minutes.value.toString().padStart(2, '0')}`;
  }

  function syncFromExternalValue(newValue: string): void {
    const parsed = parseTime(newValue);
    hours.value = parsed.hours;
    minutes.value = parsed.minutes;
  }

  if (emit) {
    watch([hours, minutes], () => emit('update:model-value', formatTimeString()));
  }

  return { hours, minutes, syncFromExternalValue, formatTimeString };
}
