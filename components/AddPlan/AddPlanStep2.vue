<script setup>
  const store = useAddPlanStore();

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
    id: 'frequency',
    label: {
      name: '¿Qué día?',
      isVisible: true,
    },
    options: [
      { value: 'once', label: 'Una vez' },
      { value: 'recurring', label: 'Entre dos fechas' },
    ],
    direction: 'horizontal',
  }));

  const singleDateField = computed(() => ({
    id: 'start_date',
    label: {
      name: 'Fecha',
      isVisible: true,
    },
    roundedCorner: 'right',
  }));

  const startDateField = computed(() => ({
    id: 'start_date',
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
      store.formData.place === 'in-person' || store.formData.place === 'hybrid'
    );
  });

  const showMeetingLinkField = computed(() => {
    return (
      store.formData.place === 'online' || store.formData.place === 'hybrid'
    );
  });

  const showSingleDate = computed(() => store.formData.frequency === 'once');
  const showDateRange = computed(() => store.formData.frequency === 'recurring');
</script>

<template>
  <div class="add-plan-step-2">
    <fieldset class="add-plan-step-2__fieldset">
      <FormSelect
        :model-value="store.formData.place"
        :field="placeTypeField"
        :error="store.errors.place"
        @update:model-value="(value) => store.handleFieldUpdate(placeTypeField.id, value)"
      />

      <FormBaseInput
        v-if="showAddressField"
        :model-value="store.formData.address"
        :field="addressField"
        :error="store.errors.address"
        @update:model-value="(value) => store.handleFieldUpdate(addressField.id, value)"
      />

      <FormBaseInput
        v-if="showMeetingLinkField"
        :model-value="store.formData.meeting_link"
        :field="meetingLinkField"
        :error="store.errors.meeting_link"
        @update:model-value="(value) => store.handleFieldUpdate(meetingLinkField.id, value)"
      />
    </fieldset>

    <fieldset class="add-plan-step-2__fieldset">
      <FormRadioGroup
        :model-value="store.formData.frequency"
        :field="dateTypeField"
        :error="store.errors.frequency"
        :direction="dateTypeField.direction"
        @update:model-value="(value) => store.handleFieldUpdate(dateTypeField.id, value)"
      />

      <FormDatepicker
        v-if="showSingleDate"
        :model-value="store.formData.start_date"
        :field="singleDateField"
        :error="store.errors.start_date"
        @update:model-value="(value) => store.handleFieldUpdate(singleDateField.id, value)"
      />

      <template v-if="showDateRange">
        <FormDatepicker
          :model-value="store.formData.start_date"
          :field="startDateField"
          :error="store.errors.start_date"
          @update:model-value="(value) => store.handleFieldUpdate(startDateField.id, value)"
        />

        <FormDatepicker
          :model-value="store.formData.end_date"
          :field="endDateField"
          :error="store.errors.end_date"
          @update:model-value="(value) => store.handleFieldUpdate(endDateField.id, value)"
        />

        <FormWeekDays
          :model-value="store.formData.recurrency"
          :field="weekDaysField"
          :error="store.errors.recurrency"
          @update:model-value="(value) => store.handleFieldUpdate(weekDaysField.id, value)"
        />
      </template>
    </fieldset>

    <fieldset class="add-plan-step-2__fieldset">
      <legend class="add-plan-step-2__legend">¿A qué hora?</legend>

      <FormTimepicker
        :model-value="store.formData.start_time"
        :field="startTimeField"
        :error="store.errors.start_time"
        @update:model-value="(value) => store.handleFieldUpdate(startTimeField.id, value)"
      />

      <FormTimepicker
        :model-value="store.formData.end_time"
        :field="endTimeField"
        :error="store.errors.end_time"
        @update:model-value="(value) => store.handleFieldUpdate(endTimeField.id, value)"
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
