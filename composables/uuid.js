import { nanoid } from 'nanoid';
import { ref, onMounted } from 'vue';

export function useUuid() {
  const id = ref('');

  onMounted(() => {
    if (import.meta.client) {
      id.value = nanoid();
    }
  });

  return id;
}