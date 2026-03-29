import type { PlanWithRelations, PlanCardData, CostType } from '~/types/plan';

function formatDateLabel(dateStr: string): string {
  const today = new Date();
  const [year, month, day] = dateStr.split('-').map(Number);

  const isToday =
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  if (isToday) return 'HOY';

  const planDate = new Date(year, month - 1, day);
  return planDate.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function formatTimeLabel(timeStr: string | null): string | null {
  if (!timeStr) return null;
  const [hoursStr, minutesStr] = timeStr.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = (minutesStr ?? '00').slice(0, 2).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
}

function formatPriceLabel(cost: CostType, price: number | null): string {
  if (cost === 'free') return 'Gratis';
  if (cost === 'pay-what-you-want') return 'A voluntad';
  return price != null ? `€${price}` : 'Precio fijo';
}

export const usePlanAdapter = () => {
  const supabase = useSupabaseClient();

  const getImageUrl = (storagePath: string): string => {
    const { data } = supabase.storage.from('plan-images').getPublicUrl(storagePath);
    return data.publicUrl;
  };

  const toPlanCardData = (plan: PlanWithRelations, savedPlanIds: Set<string>): PlanCardData => {
    const sortedImages = [...plan.plan_images].sort((a, b) => a.position - b.position);

    return {
      id: plan.id,
      title: plan.name,
      address: plan.address,
      description: plan.description,
      dateLabel: formatDateLabel(plan.start_date),
      timeLabel: formatTimeLabel(plan.start_time),
      categoryName: plan.plan_categories[0]?.categories?.name ?? '',
      priceLabel: formatPriceLabel(plan.cost, plan.price),
      imageUrl: sortedImages[0] ? getImageUrl(sortedImages[0].storage_path) : undefined,
      isSaved: savedPlanIds.has(plan.id),
    };
  };

  return { toPlanCardData };
};
