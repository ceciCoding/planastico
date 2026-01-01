import type { Plan, ValidationResult } from '~/types/plan';

export const usePlanModel = () => {
  /**
   * @returns Empty plan model
   */
  const createEmptyPlan = (): Plan => ({
    name: '',
    description: '',
    image_urls: [],
    categories: [],
    place: 'in-person',
    address: null,
    meeting_link: null,
    frequency: 'once',
    start_date: null,
    end_date: null,
    recurrency: null,
    start_time: '12:00 AM',
    end_time: '12:00 AM',
    cost: 'free',
    price: null,
    contact_email: '',
    validation_email: '',
  });

  /**
   * @param plan - Plan to validate
   * @returns { isValid: boolean, errors: string[] }
   */
  const validatePlanStructure = (plan: Plan): ValidationResult => {
    const errors: string[] = [];

    if (!plan.name) errors.push('name es requerido');

    if (!plan.description) errors.push('description es requerido');

    if (!Array.isArray(plan.categories) || plan.categories.length === 0) {
      errors.push('categories debe tener al menos 1 elemento');
    }

    if (!['in-person', 'online', 'hybrid'].includes(plan.place)) {
      errors.push('place debe ser in-person, online o hybrid');
    }

    if (
      (plan.place === 'in-person' || plan.place === 'hybrid') &&
      !plan.address
    ) {
      errors.push('address es requerido para planes presenciales');
    }
    if (
      (plan.place === 'online' || plan.place === 'hybrid') &&
      !plan.meeting_link
    ) {
      errors.push('meeting_link es requerido para planes online');
    }

    if (!['once', 'recurring'].includes(plan.frequency)) {
      errors.push('frequency debe ser once o recurring');
    }

    if (!plan.start_date) errors.push('start_date es requerido');

    if (plan.frequency === 'recurring') {
      if (!plan.end_date)
        errors.push('end_date es requerido para frequency recurring');
      if (!Array.isArray(plan.recurrency) || plan.recurrency.length === 0) {
        errors.push('recurrency es requerido para frequency recurring');
      }
    }

    if (!plan.start_time) errors.push('start_time es requerido');

    if (!plan.end_time) errors.push('end_time es requerido');

    if (!['free', 'pay-what-you-want', 'fixed-price'].includes(plan.cost)) {
      errors.push('cost debe ser free, pay-what-you-want o fixed-price');
    }

    if (plan.cost !== 'free' && !plan.price) {
      errors.push('price es requerido si cost no es free');
    }

    if (!plan.contact_email) errors.push('contact_email es requerido');
    if (!plan.validation_email) errors.push('validation_email es requerido');

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  /**
   * Prepares a plan to be sent to the database.
   * Cleans the fields based on other bussiness rules.
   * @param plan - Plan from the form
   * @returns Clean plan ready for the database
   */
  const preparePlanForDB = (plan: Plan): Plan => {
    const cleanPlan = { ...plan };

    if (cleanPlan.place === 'online') {
      cleanPlan.address = null;
    }
    if (cleanPlan.place === 'in-person') {
      cleanPlan.meeting_link = null;
    }

    if (cleanPlan.frequency === 'once') {
      cleanPlan.end_date = null;
      cleanPlan.recurrency = null;
    }

    if (cleanPlan.cost === 'free') {
      cleanPlan.price = null;
    }

    return cleanPlan;
  };

  return {
    createEmptyPlan,
    validatePlanStructure,
    preparePlanForDB,
  };
};
