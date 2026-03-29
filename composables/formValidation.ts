import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator';
import { stepsRulesMap } from '@/validations/formValidationRules';
import type { StepNumber } from '~/types/plan';

export interface FormErrors {
  [field: string]: string | undefined;
}

export const useFormValidation = () => {
  if (!import.meta.client) {
    return {
      validate: async (_formData: any, _step: StepNumber): Promise<FormErrors> => ({}),
    };
  }

  function formatErrors(validationErrors: any): FormErrors {
    if (!validationErrors?.value) return {};
    const formattedErrors: FormErrors = {};
    Object.keys(validationErrors.value).forEach((field) => {
      const fieldErrors = validationErrors.value[field];
      if (fieldErrors?.length > 0) {
        formattedErrors[field] = fieldErrors[0].message;
      }
    });
    return formattedErrors;
  }

  async function validate(formData: any, step: StepNumber): Promise<FormErrors> {
    const { pass, errorFields } = useAsyncValidator(
      formData,
      stepsRulesMap[step] as any
    );
    await pass;
    return formatErrors(errorFields);
  }

  return { validate };
};
