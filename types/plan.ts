export type PlaceType = 'in-person' | 'online' | 'hybrid';
export type FrequencyType = 'once' | 'recurring';
export type CostType = 'free' | 'pay-what-you-want' | 'fixed-price';
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Plan {
  name: string;
  description: string;
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

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
