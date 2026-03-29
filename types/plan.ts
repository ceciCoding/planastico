import type { Category } from '~/types/fields';

export type PlaceType = 'in-person' | 'online' | 'hybrid';
export type FrequencyType = 'once' | 'recurring';
export type CostType = 'free' | 'pay-what-you-want' | 'fixed-price';
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** DB model — mirrors the `plans` table in Supabase */
export interface Plan {
  id: string;
  slug: string;
  name: string;
  description: string;
  extra_links: string[];
  place: PlaceType;
  address: string | null;
  meeting_link: string | null;
  frequency: FrequencyType;
  start_date: string;
  end_date: string | null;
  recurrency: WeekDay[] | null;
  start_time: string | null;
  end_time: string | null;
  cost: CostType;
  price: number | null;
  contact_email: string | null;
  user_id: string | null;
  validated: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ImagePath {
  storage_path: string;
  position: number;
}

/**
 * Form state — fields the user fills in before submission.
 * Not all fields map directly to the DB:
 * - `image_urls`: File objects converted to storage_path rows in `plan_images`
 * - `categories`: IDs stored in the `plan_categories` junction table
 */
export interface PlanForm {
  name: string;
  description: string;
  extra_links: string[];
  image_urls: File[];
  categories: number[];
  place: PlaceType;
  address: string | null;
  meeting_link: string | null;
  frequency: FrequencyType;
  start_date: Date | string | null;
  end_date: Date | string | null;
  recurrency: WeekDay[] | null;
  start_time: string;
  end_time: string;
  cost: CostType;
  price: number | null;
  contact_email: string;
  validation_email: string;
}

/** DB model — mirrors the `saved_plans` table in Supabase */
export interface SavedPlan {
  id: string;
  user_id: string;
  plan_id: string;
  created_at: string;
}

/** Plan from Supabase with joined categories and images */
export interface PlanWithRelations extends Plan {
  plan_categories: {
    category_id: number;
    categories: Category & { slug: string };
  }[];
  plan_images: {
    storage_path: string;
    position: number;
  }[];
}

/** View model for the PlanCard component — pre-formatted for display */
export interface PlanCardData {
  id: string;
  slug: string;
  title: string;
  address: string | null;
  description: string;
  dateLabel: string;
  timeLabel: string | null;
  categoryName: string;
  priceLabel: string;
  imageUrl?: string;
  isSaved: boolean;
}

export type StepNumber = 1 | 2 | 3 | 4;

export interface AddPlanFormData extends PlanForm {
  useContactEmailForManagement: boolean;
  captchaToken: string;
}

