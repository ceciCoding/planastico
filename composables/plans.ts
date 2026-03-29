import type { PlanWithRelations } from '~/types/plan';
import type { Category } from '~/types/fields';

interface PlanFilters {
  startDate?: string;
  endDate?: string;
  categories?: number[];
}

type ApiResult<T> = Promise<{ data: T | null; error: string | null }>;

export const usePlans = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const getCategories = async (): ApiResult<Category[]> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error: unknown) {
      console.error('Error al obtener categorías:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  const getPlanBySlug = async (slug: string): ApiResult<PlanWithRelations> => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select(
          `
          id, slug, name, description, extra_links, address, place, meeting_link,
          frequency, start_date, end_date, recurrency, start_time, end_time,
          cost, price, contact_email, user_id, validated, email_verified,
          created_at, updated_at,
          plan_categories (
            category_id,
            categories (
              id,
              name,
              slug
            )
          ),
          plan_images (storage_path, position)
        `
        )
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return { data: data as unknown as PlanWithRelations, error: null };
    } catch (error: unknown) {
      console.error('Error al obtener plan:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  const getPlans = async (filters: PlanFilters = {}): ApiResult<PlanWithRelations[]> => {
    try {
      let query = supabase
        .from('plans')
        .select(
          `
          id, slug, name, description, extra_links, address, place, meeting_link,
          frequency, start_date, end_date, recurrency, start_time, end_time,
          cost, price, contact_email, user_id, validated, email_verified,
          created_at, updated_at,
          plan_categories (
            category_id,
            categories (
              id,
              name,
              slug
            )
          ),
          plan_images (storage_path, position)
        `
        )
        .eq('validated', true)
        .order('start_date', { ascending: true });

      if (filters.startDate) {
        query = query.gte('start_date', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('start_date', filters.endDate);
      }

      if (filters.categories && filters.categories.length > 0) {
        const { data: matches, error: catError } = await supabase
          .from('plan_categories')
          .select('plan_id')
          .in('category_id', filters.categories);

        if (catError) throw catError;

        const planIds = [...new Set(matches.map((r) => r.plan_id))] as string[];
        query = query.in('id', planIds);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as unknown as PlanWithRelations[], error: null };
    } catch (error: unknown) {
      console.error('Error al obtener planes:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  const getMisPlanes = async (): ApiResult<PlanWithRelations[]> => {
    try {
      if (!user.value) return { data: [], error: null };

      const { data, error } = await supabase
        .from('plans')
        .select(
          `
          id, slug, name, description, extra_links, address, place, meeting_link,
          frequency, start_date, end_date, recurrency, start_time, end_time,
          cost, price, contact_email, user_id, validated, email_verified,
          created_at, updated_at,
          plan_categories (
            category_id,
            categories (
              id,
              name,
              slug
            )
          ),
          plan_images (storage_path, position)
        `
        )
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data: data as unknown as PlanWithRelations[], error: null };
    } catch (error: unknown) {
      console.error('Error al obtener mis planes:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  return { getCategories, getPlanBySlug, getPlans, getMisPlanes };
};
