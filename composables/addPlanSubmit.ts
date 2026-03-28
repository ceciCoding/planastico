import type { Ref } from 'vue';

export function useAddPlanSubmit(isOpen: Ref<boolean>) {
  const { formData, resetForm } = useAddPlanForm();
  const { createPlan } = usePlans();
  const { compressAndUpload, deletePlanImages } = useImageUpload();
  const { preparePlanForDB } = usePlanModel();

  const isSubmitting = ref(false);
  const submitError = ref('');

  const submit = async () => {
    isSubmitting.value = true;
    submitError.value = '';

    let uploadedPaths: { storage_path: string; position: number }[] = [];

    try {
      const planData = { ...formData.value };

      if (planData.useContactEmailForManagement) {
        planData.validation_email = planData.contact_email;
      }

      const imageFiles = planData.image_urls;
      delete planData.useContactEmailForManagement;
      delete planData.captchaToken;
      delete planData.image_urls;

      const cleanPlan = preparePlanForDB(planData);

      if (imageFiles && imageFiles.length > 0) {
        uploadedPaths = await compressAndUpload(imageFiles);
      }

      const { error: planError } = await createPlan(cleanPlan, uploadedPaths);
      if (planError) throw new Error(planError);

      isOpen.value = false;
      setTimeout(resetForm, 300);
    } catch (error) {
      await deletePlanImages(uploadedPaths);
      console.error('Error creando plan:', error);
      submitError.value =
        'Hubo un error al crear el plan. Por favor, inténtalo de nuevo más tarde.';
    } finally {
      isSubmitting.value = false;
    }
  };

  return { isSubmitting, submitError, submit };
}
