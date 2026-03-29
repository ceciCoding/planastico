import { defineStore } from 'pinia';
import type { AddPlanFormData, StepNumber } from '~/types/plan';
import type { FormErrors } from '~/composables/formValidation';

const TOTAL_STEPS = 4;

export const useAddPlanStore = defineStore('addPlan', () => {
  const { createEmptyPlan, preparePlanForDB } = usePlanModel();
  const { validate } = useFormValidation();

  const currentStep = ref<StepNumber>(1);
  const formData = ref<AddPlanFormData>({
    ...createEmptyPlan(),
    useContactEmailForManagement: false,
    captchaToken: '',
  });
  const errors = ref<FormErrors>({});
  const isSubmitting = ref(false);
  const submitError = ref('');
  const categories = ref<{ id: number; name: string }[]>([]);
  const isLoadingCategories = ref(false);

  const isLastStep = computed(() => currentStep.value === TOTAL_STEPS);
  const submitButtonText = computed(() => {
    if (!isLastStep.value) return 'Siguiente';
    return isSubmitting.value ? 'Creando...' : 'Crear plan';
  });

  function handleFieldUpdate<K extends keyof AddPlanFormData>(
    field: K,
    value: AddPlanFormData[K]
  ) {
    formData.value[field] = value;
    delete errors.value[field as string];
  }

  function resetForm() {
    currentStep.value = 1;
    formData.value = {
      ...createEmptyPlan(),
      useContactEmailForManagement: false,
      captchaToken: '',
    };
    errors.value = {};
    submitError.value = '';
  }

  async function loadCategories() {
    if (categories.value.length > 0) return;
    const { getCategories } = usePlans();
    isLoadingCategories.value = true;
    const { data, error } = await getCategories();
    if (!error && data) categories.value = data;
    isLoadingCategories.value = false;
  }

  async function nextStep(): Promise<'invalid' | 'advanced' | 'submitted'> {
    const validationErrors = await validate(formData.value, currentStep.value);

    errors.value = {};
    Object.entries(validationErrors).forEach(([key, error]) => {
      if (error && key !== 'extra_links') {
        errors.value[key] = error;
      }
    });

    const isValid = Object.keys(validationErrors).length === 0;
    if (!isValid) return 'invalid';

    if (!isLastStep.value) {
      currentStep.value = (currentStep.value + 1) as StepNumber;
      return 'advanced';
    }

    const success = await submit();
    return success ? 'submitted' : 'invalid';
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as StepNumber;
    }
  }

  async function submit(): Promise<boolean> {
    const { compressAndUpload, deletePlanImages } = useImageUpload();

    isSubmitting.value = true;
    submitError.value = '';
    let uploadedPaths: { storage_path: string; position: number }[] = [];

    try {
      const planData = { ...formData.value } as any;

      if (planData.useContactEmailForManagement) {
        planData.validation_email = planData.contact_email;
      }

      const imageFiles = planData.image_urls as File[];
      const captchaToken = planData.captchaToken as string;
      const categories = planData.categories as number[];
      delete planData.useContactEmailForManagement;
      delete planData.captchaToken;
      delete planData.image_urls;
      delete planData.categories;

      const cleanPlan = preparePlanForDB(planData);

      if (imageFiles?.length > 0) {
        uploadedPaths = await compressAndUpload(imageFiles);
      }

      await $fetch('/api/plans', {
        method: 'POST',
        body: { plan: cleanPlan, categories, imagePaths: uploadedPaths, captchaToken },
      });

      return true;
    } catch (error) {
      await deletePlanImages(uploadedPaths);
      console.error('Error creando plan:', error);
      submitError.value =
        'Hubo un error al crear el plan. Por favor, inténtalo de nuevo más tarde.';
      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    submitError,
    categories,
    isLoadingCategories,
    isLastStep,
    submitButtonText,
    handleFieldUpdate,
    resetForm,
    loadCategories,
    nextStep,
    prevStep,
  };
});
