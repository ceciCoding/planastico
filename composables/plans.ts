import type { Plan, PlanForm, ImagePath } from '~/types/plan';
import type { Category } from '~/types/fields';

interface PlanFilters {
  startDate?: string;
  endDate?: string;
  categories?: number[];
}

interface CategoryWithSlug extends Category {
  slug: string;
}

interface PlanWithRelations extends Plan {
  plan_categories: {
    category_id: number;
    categories: CategoryWithSlug;
  }[];
  plan_images: {
    storage_path: string;
    position: number;
  }[];
}

type ApiResult<T> = Promise<{ data: T | null; error: string | null }>;

export const usePlans = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const generateValidationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const createPlan = async (
    planData: Omit<PlanForm, 'image_urls'>,
    imagePaths: ImagePath[] = []
  ): ApiResult<Plan> => {
    try {
      const validationCode = !user.value ? generateValidationCode() : null;

      const planPayload = {
        name: planData.name,
        description: planData.description,
        extra_links: planData.extra_links || [],
        address: planData.address || null,
        place: planData.place,
        meeting_link: planData.meeting_link || null,
        frequency: planData.frequency,
        start_date: planData.start_date,
        end_date: planData.end_date || null,
        recurrency: planData.recurrency || null,
        start_time: planData.start_time || null,
        end_time: planData.end_time || null,
        cost: planData.cost,
        price: planData.price || null,
        contact_email: planData.contact_email || null,
        validation_email: planData.validation_email || null,
        validation_code: validationCode,
        user_id: user.value?.id || null,
        validated: true,
        email_verified: !!user.value,
      };

      const { data: plan, error } = await supabase.rpc('create_plan_with_images', {
        plan_data: planPayload,
        category_ids: planData.categories,
        image_paths: imagePaths,
      });

      if (error) throw error;

      return { data: plan as Plan, error: null };
    } catch (error: unknown) {
      console.error('Error al crear plan:', error);
      return { data: null, error: (error as Error).message };
    }
  };

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

  const getPlanById = async (planId: string): ApiResult<PlanWithRelations> => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select(
          `
          *,
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
        .eq('id', planId)
        .single();

      if (error) throw error;

      return { data, error: null };
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
          *,
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

      return { data, error: null };
    } catch (error: unknown) {
      console.error('Error al obtener planes:', error);
      return { data: null, error: (error as Error).message };
    }
  };

  return { createPlan, getCategories, getPlanById, getPlans };
};
