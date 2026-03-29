export type PlaceType = 'in-person' | 'online' | 'hybrid';
export type FrequencyType = 'once' | 'recurring';
export type CostType = 'free' | 'pay-what-you-want' | 'fixed-price';
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** DB model — mirrors the `plans` table in Supabase */
export interface Plan {
  id: string;
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
  validation_email: string | null;
  validation_code: string | null;
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

export type StepNumber = 1 | 2 | 3 | 4;

export interface AddPlanFormData extends PlanForm {
  useContactEmailForManagement: boolean;
  captchaToken: string;
}

