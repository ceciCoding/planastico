import type { AddPlanFormData } from '~/composables/addPlanForm';
import { isValidUrl } from '~/validations/url';

type ValidationCallback = (error?: Error) => void;

interface BaseValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'email' | 'enum';
  min?: number;
  max?: number;
  message?: string;
  enum?: string[];
}

interface CustomValidationRule {
  validator: (
    rule: unknown,
    value: unknown,
    callback: ValidationCallback,
    source: Partial<AddPlanFormData>
  ) => void;
}

type ValidationRule = BaseValidationRule | CustomValidationRule;
type FieldRules = ValidationRule[];

interface StepRules {
  [field: string]: FieldRules;
}

const step1Rules: StepRules = {
  name: [
    { required: true, message: 'El título es obligatorio' },
    { max: 70, message: 'El título no puede superar los 70 caracteres' },
  ],
  description: [
    { required: true, message: 'La descripción es obligatoria' },
    {
      max: 3000,
      message: 'La descripción no puede superar los 3000 caracteres',
    },
  ],
  extra_links: [
    {
      validator: (_, value, callback) => {
        if (!value || !Array.isArray(value)) {
          return callback();
        }
        const nonEmptyLinks = value.filter((link) => link && link.trim());
        const hasInvalidLink = nonEmptyLinks.some((link) => !isValidUrl(link));
        if (hasInvalidLink) {
          return callback(new Error('invalid'));
        }
        callback();
      },
    },
  ],
  image_urls: [
    {
      type: 'array',
      max: 3,
      message: 'Máximo 3 imágenes',
    },
  ],
  categories: [
    {
      type: 'array',
      required: true,
      message: 'Debes seleccionar al menos 1 categoría',
    },
    {
      validator: (_, value, callback) => {
        if (!value || !Array.isArray(value)) {
          return callback();
        }
        if (value.length < 1) {
          return callback(new Error('Debes seleccionar al menos 1 categoría'));
        }
        if (value.length > 3) {
          return callback(new Error('Puedes seleccionar máximo 3 categorías'));
        }
        callback();
      },
    },
  ],
};

const step2Rules: StepRules = {
  place: [
    { required: true, message: 'Debes seleccionar un tipo de lugar' },
    {
      type: 'enum',
      enum: ['in-person', 'online', 'hybrid'],
      message: 'Tipo de lugar no válido',
    },
  ],
  address: [
    {
      validator: (_, value, callback, source) => {
        if (
          (source.place === 'in-person' || source.place === 'hybrid') &&
          !value
        ) {
          return callback(new Error('La dirección es obligatoria'));
        }
        if (typeof value === 'string' && value.length > 400) {
          return callback(
            new Error('La dirección no puede superar los 400 caracteres')
          );
        }
        callback();
      },
    },
  ],
  meeting_link: [
    {
      validator: (_, value, callback, source) => {
        if (source.place === 'online' || source.place === 'hybrid') {
          if (!value) {
            return callback(new Error('El enlace de la reunión es obligatorio'));
          }
          if (typeof value === 'string') {
            try {
              new URL(value);
            } catch {
              return callback(new Error('El enlace no es válido'));
            }
          }
        }
        callback();
      },
    },
  ],
  frequency: [
    { required: true, message: 'Debes seleccionar la frecuencia' },
    {
      type: 'enum',
      enum: ['once', 'recurring'],
      message: 'Frecuencia no válida',
    },
  ],
  start_date: [{ required: true, message: 'La fecha es obligatoria' }],
  end_date: [
    {
      validator: (_, value, callback, source) => {
        if (source.frequency === 'recurring') {
          if (!value) {
            return callback(new Error('La fecha de fin es obligatoria'));
          }
          if (
            source.start_date &&
            new Date(value as string | Date) <= new Date(source.start_date)
          ) {
            return callback(
              new Error('La fecha de fin debe ser posterior a la de inicio')
            );
          }
        }
        callback();
      },
    },
  ],
  recurrency: [
    {
      validator: (_, value, callback, source) => {
        if (source.frequency === 'recurring') {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return callback(
              new Error('Debes seleccionar al menos un día de la semana')
            );
          }
        }
        callback();
      },
    },
  ],
  start_time: [{ required: true, message: 'La hora de inicio es obligatoria' }],
  end_time: [{ required: true, message: 'La hora de fin es obligatoria' }],
};

const step3Rules: StepRules = {
  cost: [
    { required: true, message: 'Debes seleccionar el tipo de coste' },
    {
      type: 'enum',
      enum: ['free', 'pay-what-you-want', 'fixed-price'],
      message: 'Tipo de coste no válido',
    },
  ],
  price: [
    {
      validator: (_, value, callback, source) => {
        if (source.cost !== 'free') {
          if (!value && value !== 0) {
            return callback(new Error('El precio es obligatorio'));
          }
          if (isNaN(Number(value))) {
            return callback(new Error('El precio debe ser un número'));
          }
          if (Number(value) <= 0) {
            return callback(new Error('El precio debe ser mayor a 0'));
          }
        }
        callback();
      },
    },
  ],
};

const step4Rules: StepRules = {
  contact_email: [
    { required: true, message: 'El correo de contacto es obligatorio' },
    { type: 'email', message: 'El correo de contacto no es válido' },
  ],
  validation_email: [
    {
      validator: (_, value, callback, source) => {
        if (!source.useContactEmailForManagement) {
          if (!value) {
            return callback(new Error('El correo de gestión es obligatorio'));
          }
          if (
            typeof value === 'string' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            return callback(new Error('El correo de gestión no es válido'));
          }
        }
        callback();
      },
    },
  ],
  // TODO: Captcha comentado temporalmente
  // captchaToken: [
  //   { required: true, message: 'Debes completar el captcha' },
  // ],
};

export const stepsRulesMap: Record<number, StepRules> = {
  1: step1Rules,
  2: step2Rules,
  3: step3Rules,
  4: step4Rules,
};
