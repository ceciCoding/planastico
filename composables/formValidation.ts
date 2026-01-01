import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator';
import { stepsRulesMap } from '@/validations/formValidationRules';
import type { StepNumber } from './addPlanForm';

export interface FormErrors {
  [field: string]: string | undefined;
}

export const useFormValidation = () => {
  if (!import.meta.client) {
    return {
      validateStep: async () => ({}),
    };
  }

  const errors = useState<FormErrors>('addPlanFormErrors', () => ({}));

  function resetErrors(): void {
    errors.value = {};
  }

  function setFieldError(field: string, error: string): void {
    errors.value[field] = error;
  }

  function clearFieldError(field: string): void {
    delete errors.value[field];
  }

  function formatErrors(validationErrors: any): FormErrors {
    if (!validationErrors || !validationErrors.value) return {};

    const formattedErrors: FormErrors = {};
    Object.keys(validationErrors.value).forEach((field) => {
      const fieldErrors = validationErrors.value[field];
      if (fieldErrors && fieldErrors.length > 0) {
        formattedErrors[field] = fieldErrors[0].message;
      }
    });
    return formattedErrors;
  }

  function hasStepErrors(step: StepNumber): boolean {
    const stepFields: Record<StepNumber, string[]> = {
      1: ['name', 'description', 'image_urls', 'categories'],
      2: [
        'address',
        'meeting_link',
        'start_date',
        'end_date',
        'recurrency',
        'start_time',
        'end_time',
      ],
      3: ['price'],
      4: ['contact_email', 'validation_email', 'captchaToken'],
    };

    const fields = stepFields[step] || [];
    return fields.some((field) => errors.value[field]);
  }

  async function validate(
    formData: any,
    step: StepNumber
  ): Promise<FormErrors> {
    const { pass, errorFields } = useAsyncValidator(
      formData,
      stepsRulesMap[step] as any
    );
    await pass;
    return formatErrors(errorFields);
  }

  async function validateStep(
    formData: any,
    step: StepNumber
  ): Promise<boolean> {
    const validationErrors = await validate(formData, step);
    Object.keys(validationErrors).forEach((key) => {
      const error = validationErrors[key];
      if (error) {
        setFieldError(key, error);
      }
    });
    const isValid = Object.keys(validationErrors).length === 0;
    return isValid;
  }

  return {
    validateStep,
    resetErrors,
    clearFieldError,
    errors,
  };
};
