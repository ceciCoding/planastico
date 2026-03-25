export interface Category {
  id: number;
  name: string;
}

export interface FieldOption {
  value: string | number;
  label: string;
}

export interface FormField {
  id: string;
  label: {
    name: string;
    isVisible: boolean;
    required?: boolean;
  };
  inputType?: string;
  placeholder?: string;
  roundedCorner?: 'left' | 'right';
  maxLength?: number;
  isCurrency?: boolean;
  isErasable?: boolean;
  options?: FieldOption[];
  direction?: 'horizontal' | 'vertical';
  categories?: Category[];
}
