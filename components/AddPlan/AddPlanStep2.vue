<script setup>
  const STEP_INDEX = 2;
  const { formData, handleFieldUpdate } = useAddPlanForm();
  const { validateStep, errors } = useFormValidation();

  const placeTypeField = computed(() => ({
    id: 'place',
    label: {
      name: '¿Dónde?',
      isVisible: true,
    },
    options: [
      { value: 'in-person', label: 'Presencial' },
      { value: 'online', label: 'Online' },
      { value: 'hybrid', label: 'Presencial y online' },
    ],
  }));

  const addressField = computed(() => ({
    id: 'address',
    label: {
      name: 'Dirección',
      isVisible: false,
    },
    inputType: 'text',
    placeholder: 'Escribe la dirección del plan',
    roundedCorner: 'right',
  }));

  const meetingLinkField = computed(() => ({
    id: 'meeting_link',
    label: {
      name: 'Enlace de reunión',
      isVisible: false,
    },
    inputType: 'url',
    placeholder: 'https://',
    roundedCorner: 'right',
  }));

  const dateTypeField = computed(() => ({
    id: 'date',
    label: {
      name: '¿Qué día?',
      isVisible: true,
    },
    options: [
      { value: 'once', label: 'Una vez' },
      { value: 'recurring', label: 'Entre dos fechas' },
    ],
  }));

  const singleDateField = computed(() => ({
    id: 'single-date',
    label: {
      name: 'Fecha',
      isVisible: true,
    },
    roundedCorner: 'right',
  }));

  const startDateField = computed(() => ({
    id: 'start-date',
    label: {
      name: 'Fecha de inicio',
      isVisible: true,
    },
    roundedCorner: 'right',
  }));

  const endDateField = computed(() => ({
    id: 'end_date',
    label: {
      name: 'Fecha de fin',
      isVisible: true,
    },
    roundedCorner: 'right',
  }));

  const weekDaysField = computed(() => ({
    id: 'recurrency',
    label: {
      name: 'Días de la semana',
      isVisible: true,
    },
  }));

  const startTimeField = computed(() => ({
    id: 'start_time',
    label: {
      name: 'Hora de inicio',
      isVisible: true,
    },
  }));

  const endTimeField = computed(() => ({
    id: 'end_time',
    label: {
      name: 'Hora de fin',
      isVisible: true,
    },
  }));

  const showAddressField = computed(() => {
    return (
      formData.value.place === 'in-person' || formData.value.place === 'hybrid'
    );
  });

  const showMeetingLinkField = computed(() => {
    return (
      formData.value.place === 'online' || formData.value.place === 'hybrid'
    );
  });

  const showSingleDate = computed(() => {
    return formData.value.frequency === 'once';
  });

  const showDateRange = computed(() => {
    return formData.value.frequency === 'recurring';
  });

  defineExpose({
    validate: () => validateStep(formData.value, STEP_INDEX),
  });
</script>

<template>
  <div class="add-plan-step-2">
    <fieldset class="add-plan-step-2__fieldset">
      <FormSelect
        :model-value="formData.place"
        :field="placeTypeField"
        :error="errors.place"
        @update:model-value="(value) => handleFieldUpdate(placeTypeField.id, value)"
      />

      <FormBaseInput
        v-if="showAddressField"
        :model-value="formData.address"
        :field="addressField"
        :error="errors.address"
        @update:model-value="(value) => handleFieldUpdate(addressField.id, value)"
      />

      <FormBaseInput
        v-if="showMeetingLinkField"
        :model-value="formData.meeting_link"
        :field="meetingLinkField"
        :error="errors.meeting_link"
        @update:model-value="(value) => handleFieldUpdate(meetingLinkField.id, value)"
      />
    </fieldset>

    <fieldset class="add-plan-step-2__fieldset">
      <FormRadioGroup
        :model-value="formData.frequency"
        :field="dateTypeField"
        :error="errors.frequency"
        @update:model-value="(value) => handleFieldUpdate(dateTypeField.id, value)"
      />

      <FormDatepicker
        v-if="showSingleDate"
        :model-value="formData.start_date"
        :field="singleDateField"
        :error="errors.start_date"
        @update:model-value="(value) => handleFieldUpdate(singleDateField.id, value)"
      />

      <template v-if="showDateRange">
        <FormDatepicker
          :model-value="formData.start_date"
          :field="startDateField"
          :error="errors.start_date"
          @update:model-value="(value) => handleFieldUpdate(startDateField.id, value)"
        />

        <FormDatepicker
          :model-value="formData.end_date"
          :field="endDateField"
          :error="errors.end_date"
          @update:model-value="(value) => handleFieldUpdate(endDateField.id, value)"
        />

        <FormWeekDays
          :model-value="formData.recurrency"
          :field="weekDaysField"
          :error="errors.recurrency"
          @update:model-value="(value) => handleFieldUpdate(weekDaysField.id, value)"
        />
      </template>
    </fieldset>

    <fieldset class="add-plan-step-2__fieldset">
      <legend class="add-plan-step-2__legend">¿A qué hora?</legend>

      <FormTimepicker
        :model-value="formData.start_time"
        :field="startTimeField"
        :error="errors.start_time"
        @update:model-value="(value) => handleFieldUpdate(startTimeField.id, value)"
      />

      <FormTimepicker
        :model-value="formData.end_time"
        :field="endTimeField"
        :error="errors.end_time"
        @update:model-value="(value) => handleFieldUpdate(endTimeField.id, value)"
      />
    </fieldset>
  </div>
</template>

<style scoped lang="scss">
  .add-plan-step-2 {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__fieldset {
      border: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__legend {
      font-weight: 600;
      margin-bottom: 0.5rem;
      padding: 0;
    }
  }
</style>
