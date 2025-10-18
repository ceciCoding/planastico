<script setup>
import FormBaseInput from "~/components/Form/FormBaseInput.vue";
import FormSelect from "~/components/Form/FormSelect.vue";
import FormTimepicker from "~/components/Form/Timepicker/FormTimepicker.vue";
import FormDatepicker from "~/components/Form/FormDatepicker.vue";

const fields = ref([
  {
    component: FormBaseInput,
    modelValue: "hola",
    fieldConfig: {
      label: {
        name: "Nombre",
        isVisible: true,
      },
      inputType: "text",
      placeholder: "Introduce tu nombre",
      roundedCorner: "right",
    },
  },
  {
    component: FormBaseInput,
    modelValue: "",
    fieldConfig: {
      label: {
        name: "Precio",
        isVisible: true,
      },
      inputType: "number",
      placeholder: "Introduce el precio",
      roundedCorner: "right",
      isCurrency: true,
      maxLength: 70,
    },
    error: "Este campo es requerido",
  },
  {
    component: FormSelect,
    modelValue: "granada",
    fieldConfig: {
      label: {
        name: "Selecciona una ciudad",
        isVisible: true,
      },
      options: [
        {
          label: "Madrid",
          value: "madrid",
        },
        {
          label: "Granada",
          value: "granada",
        },
        {
          label: "Murcia",
          value: "murcia",
        },
      ],
      roundedCorner: "right",
    },
    error: "",
  },
  {
    component: FormTimepicker,
    modelValue: "00:00 AM",
    fieldConfig: {
      label: {
        name: "Inicio",
        isVisible: true,
      },
    },
  },
  {
    component: FormDatepicker,
    modelValue: new Date(),
    fieldConfig: {
      label: {
        name: "Fin",
        isVisible: true,
      },
      roundedCorner: "right"
    },
  }
]);
</script>

<template>
  <main>
    <h1>Componentes</h1>
    <section class="form-section">
      <h2>Form</h2>
      <component
        v-for="(field, index) in fields"
        :key="index"
        :is="field.component"
        v-model="field.modelValue"
        :field="field.fieldConfig"
        :error="field.error"
      />
    </section>
    <section>
      <h2>Icons</h2>
      <div class="icons-wrapper">
        <IconPlanastico width="20" height="30" />
        <IconBurguerMenu />
        <IconCalendar />
        <IconShare />
        <IconUser />
        <IconBookmark />
        <IconBookmark filled />
        <IconEdit />
        <IconChevron />
        <IconChevron direction="up" />
        <IconChevron direction="down" />
        <IconChevron direction="right" />
        <IconTrash />
        <IconClose />
        <IconCheck />
        <IconSingleDatePlan />
        <IconMultiDatesPlan />
        <IconArrow />
        <IconArrow direction="right" />
        <IconUpload />
        <IconCopy />
        <IconCloseSmall />
        <IconEmail />
        <IconFilters />
        <IconWorld />
        <IconClock />
      </div>
    </section>
  </main>
</template>

<style>
h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.icons-wrapper {
  display: flex;
  gap: 1rem;
}

@media screen and (min-width: 768px) {
  .form-section {
    width: 300px;
  }
}
</style>
