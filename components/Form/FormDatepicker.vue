<script setup>
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger
} from "reka-ui";
import { useUuid } from '@/composables/uuid';
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: ''
  },
  field: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const id = useUuid();
</script>

<template>
  <div class="form-datepicker">
    <FormBaseInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <DatePickerRoot :id="id" granularity="day" locale="es-ES">
      <DatePickerField
        v-slot="{ segments }"
        :id="id"
        class="form-datepicker__field"
        :class="`form-datepicker__field--${props.field.roundedCorner}`"
      >
        <template v-for="item in segments" :key="item.part">
          <DatePickerInput
            v-if="item.part === 'literal'"
            :part="item.part"
            class="form-datepicker__field-literal"
          >
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput 
            v-else 
            :part="item.part" 
            class="form-datepicker__field-segment"
          >
            {{ item.value }}
          </DatePickerInput>
        </template>
        <DatePickerTrigger class="form-datepicker__popover-trigger">
          <IconCalendar class="form-datepicker__icon" />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent
        side="bottom"
        align="end"
        :side-offset="8"
        :avoid-collisions="true"
        :collision-padding="8"
        class="form-datepicker__popover-content"
      >
        <DatePickerArrow class="form-datepicker__popover-arrow" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="form-datepicker__calendar">
          <DatePickerHeader class="form-datepicker__calendar-header">
            <DatePickerPrev class="form-datepicker__calendar-nav-button" aria-label="Mes anterior">
              <IconChevron direction="left" class="form-datepicker__icon" aria-hidden="true" />
            </DatePickerPrev>
            <DatePickerHeading class="form-datepicker__calendar-heading" />
            <DatePickerNext class="form-datepicker__calendar-nav-button" aria-label="Mes siguiente">
              <IconChevron direction="right" class="form-datepicker__icon" aria-hidden="true"/>
            </DatePickerNext>
          </DatePickerHeader>
          <div>
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="form-datepicker__calendar-grid"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="form-datepicker__calendar-grid-row">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="form-datepicker__calendar-head-cell"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="form-datepicker__calendar-grid-row"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="form-datepicker__calendar-cell"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="form-datepicker__calendar-cell-trigger"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </div>
</template>

<style lang="scss">
.form-datepicker {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;

  &__field {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 44px;
    padding: 0 40px 0 12px;
    background: var(--planastico-warm-soft-gray);
    font-size: 0.875rem;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: var(--planastico-border-xl);

    &--left {
      border-top-left-radius: 14px;
    }

    &--right {
      border-top-right-radius: 14px;
    }
  }

  &__field-segment,
  &__field-literal {
    display: inline-block;
    padding: 0 1px;
  }

  &__field-segment[part="hour"],
  &__field-segment[part="minute"],
  &__field-segment[part="second"],
  &__field-segment[part="dayPeriod"] {
    display: none;
  }

  &__popover-trigger {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    border: 0;
    background: transparent;
    border-radius: 8px;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  &__popover-content {
    background: var(--planastico-white);
    z-index: 1000;
  }

  &__popover-arrow {
    display: none;
  }

  &__calendar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: var(--planastico-border-m);
  }

  &__calendar-header {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    gap: 6px;
    padding: 4px;
    border-bottom: var(--planastico-border-m);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background: var(--planastico-warm-soft-gray);
  }

  &__calendar-heading {
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    text-transform: capitalize;
  }

  &__calendar-nav-button {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  &__calendar-grid {
    width: 100%;
  }

  &__calendar-grid-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__calendar-head-cell {
    height: 28px;
    display: grid;
    place-items: center;
    font-weight: 600;
    line-height: 20px;
  }

  &__calendar-cell {
    display: grid;
  }

  &__calendar-cell-trigger {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 14px;
    display: grid;
    place-items: center;
    cursor: pointer;
    border: 1px solid transparent;
    font-weight: 500;
  }

  &__calendar-cell-trigger:hover {
    border-color: #e5e7eb;
    background: #f9fafb;
  }

  &__calendar-cell-trigger[data-selected] {
    background: var(--planastico-cold-black);
    color: var(--planastico-white);
  }

  &__calendar-cell-trigger[data-today] {
    border-color: var(--planastico-cold-black);
  }

  &__calendar-cell-trigger[data-unavailable],
  &__calendar-cell-trigger[data-disabled] {
    color: #9ca3af;
    cursor: not-allowed;
    background: #f3f4f6;
    border-color: #f3f4f6;
  }

  &__calendar-cell-trigger[data-outside-view],
  &__calendar-cell-trigger[data-outside-month] {
    color: #cbd5e1;
  }
}
</style>
