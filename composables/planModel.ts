import type { PlanForm } from '~/types/plan';

export const usePlanModel = () => {
  const createEmptyPlan = (): PlanForm => ({
    name: '',
    description: '',
    extra_links: [''],
    image_urls: [],
    categories: [],
    place: 'in-person',
    address: null,
    meeting_link: null,
    frequency: 'once',
    start_date: null,
    end_date: null,
    recurrency: [],
    start_time: '12:00 AM',
    end_time: '12:00 AM',
    cost: 'free',
    price: null,
    contact_email: '',
    validation_email: '',
  });

  /**
   * Cleans form data based on business rules before sending to the DB.
   * Receives the form state without image_urls (handled separately).
   */
  const preparePlanForDB = (
    plan: Omit<PlanForm, 'image_urls'>
  ): Omit<PlanForm, 'image_urls'> => {
    const cleanPlan = { ...plan } as Omit<PlanForm, 'image_urls'>;

    if (cleanPlan.place === 'online') cleanPlan.address = null;
    if (cleanPlan.place === 'in-person') cleanPlan.meeting_link = null;
    if (cleanPlan.frequency === 'once') {
      cleanPlan.end_date = null;
      cleanPlan.recurrency = null;
    }
    if (cleanPlan.cost === 'free') cleanPlan.price = null;

    return cleanPlan;
  };

  return { createEmptyPlan, preparePlanForDB };
};
