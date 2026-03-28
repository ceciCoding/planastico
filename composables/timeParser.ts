import { ref, watch } from 'vue';

type TimePeriod = 'AM' | 'PM';
type TimepickerEmit = ((event: 'update:model-value', value: string) => void) | null;

interface ParsedTime {
  hours: number;
  minutes: number;
  period: TimePeriod;
}

export function useTimeParser(initialValue = '', emit: TimepickerEmit = null) {
  const initialTime = parseTime(initialValue);
  const hours = ref<number>(initialTime.hours);
  const minutes = ref<number>(initialTime.minutes);
  const timePeriod = ref<TimePeriod>(initialTime.period);

  function parseTime(timeString: string): ParsedTime {
    if (!timeString) return { hours: 12, minutes: 0, period: 'AM' };

    const parts = timeString.split(' ');
    const timePart = parts[0] || '12:00';
    const period = (parts[1] || 'AM') as TimePeriod;

    const [hour, minute] = timePart.split(':');
    return {
      hours: hour ? parseInt(hour, 10) : 12,
      minutes: minute ? parseInt(minute, 10) : 0,
      period,
    };
  }

  function formatTimeString(): string {
    return `${hours.value.toString().padStart(2, '0')}:${minutes.value.toString().padStart(2, '0')} ${timePeriod.value}`;
  }

  function updateModelValue(): void {
    if (emit) {
      emit('update:model-value', formatTimeString());
    }
  }

  function syncFromExternalValue(newValue: string): void {
    const parsed = parseTime(newValue);
    hours.value = parsed.hours;
    minutes.value = parsed.minutes;
    timePeriod.value = parsed.period;
  }

  if (emit) {
    watch([hours, minutes, timePeriod], updateModelValue);
  }

  return { hours, minutes, timePeriod, syncFromExternalValue, formatTimeString };
}
