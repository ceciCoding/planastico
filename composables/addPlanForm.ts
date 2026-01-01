import type { Plan } from '~/types/plan';

export type StepNumber = 1 | 2 | 3 | 4;

export interface AddPlanFormData extends Plan {
  useContactEmailForManagement: boolean;
  captchaToken: string;
}

export function useAddPlanForm() {
  const { createEmptyPlan } = usePlanModel();
  const { resetErrors, clearFieldError } = useFormValidation();

  const currentStep = useState<StepNumber>('addPlanCurrentStep', () => 1);

  const formData = useState<AddPlanFormData>('addPlanFormData', () => ({
    ...createEmptyPlan(),
    useContactEmailForManagement: false,
    captchaToken: '',
  }));

  function goToNextStep(): void {
    if (currentStep.value < 4) {
      currentStep.value = (currentStep.value + 1) as StepNumber;
    }
  }

  function goToPreviousStep(): void {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as StepNumber;
    }
  }

  function goToStep(step: StepNumber): void {
    if (typeof step !== 'number' || step < 1 || step > 4) {
      return;
    }
    currentStep.value = step;
  }

  function resetForm(): void {
    currentStep.value = 1;
    formData.value = {
      ...createEmptyPlan(),
      useContactEmailForManagement: false,
      captchaToken: '',
    };
    resetErrors();
  }

  function updateField<K extends keyof AddPlanFormData>(
    field: K,
    value: AddPlanFormData[K]
  ): void {
    formData.value[field] = value;
  }

  function handleFieldUpdate<K extends keyof AddPlanFormData>(
    field: K,
    value: AddPlanFormData[K]
  ): void {
    updateField(field, value);
    clearFieldError(field as string);
  }

  return {
    currentStep,
    formData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm,
    handleFieldUpdate,
  };
}
