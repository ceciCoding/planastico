import type { Plan } from '~/types/plan';

interface SavedPlanWithPlan {
  id: string;
  user_id: string;
  plan_id: string;
  created_at: string;
  plans: Plan;
}

type ApiResult<T> = Promise<{ data: T | null; error: string | null }>;

export const useSavedPlans = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const getSavedPlans = async (): ApiResult<SavedPlanWithPlan[]> => {
    try {
      if (!user.value) return { data: [], error: null };

      const { data, error } = await supabase
        .from('saved_plans')
        .select('*, plans(*)')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: unknown) {
      console.error('Error al obtener planes guardados:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  const toggleSavedPlan = async (
    planId: string
  ): Promise<{ saved: boolean; error: string | null }> => {
    try {
      if (!user.value) return { saved: false, error: 'Usuario no autenticado' };

      const { data: existing } = await supabase
        .from('saved_plans')
        .select('id')
        .eq('user_id', user.value.id)
        .eq('plan_id', planId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('saved_plans')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        return { saved: false, error: null };
      } else {
        const { error } = await supabase
          .from('saved_plans')
          .insert({ user_id: user.value.id, plan_id: planId });

        if (error) throw error;
        return { saved: true, error: null };
      }
    } catch (error: unknown) {
      console.error('Error al guardar/desguardar plan:', error);
      return { saved: false, error: (error as Error).message };
    }
  };

  const isSavedPlan = async (planId: string): Promise<boolean> => {
    if (!user.value) return false;

    const { data } = await supabase
      .from('saved_plans')
      .select('id')
      .eq('user_id', user.value.id)
      .eq('plan_id', planId)
      .maybeSingle();

    return !!data;
  };

  return { getSavedPlans, toggleSavedPlan, isSavedPlan };
};
