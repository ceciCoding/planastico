import { describe, it, expect } from 'vitest';
import { usePlanModel } from '~/composables/planModel';

const { preparePlanForDB } = usePlanModel();

const basePlan = {
  name: 'Test Plan',
  description: 'A plan',
  extra_links: [],
  categories: [],
  place: 'in-person' as const,
  address: 'Calle Gran Vía 1',
  meeting_link: null,
  frequency: 'once' as const,
  start_date: '2026-04-01',
  end_date: '2026-04-10',
  recurrency: [1, 3] as [0 | 1 | 2 | 3 | 4 | 5 | 6],
  start_time: '10:00',
  end_time: '12:00',
  cost: 'free' as const,
  price: 50,
  contact_email: 'test@example.com',
  validation_email: 'admin@example.com',
};

describe('preparePlanForDB', () => {
  describe('place rules', () => {
    it('clears address when place is online', () => {
      const result = preparePlanForDB({
        ...basePlan,
        place: 'online',
        meeting_link: 'https://meet.google.com/abc',
      });
      expect(result.address).toBeNull();
    });

    it('clears meeting_link when place is in-person', () => {
      const result = preparePlanForDB({
        ...basePlan,
        place: 'in-person',
        meeting_link: 'https://meet.google.com/abc',
      });
      expect(result.meeting_link).toBeNull();
    });

    it('keeps both address and meeting_link when place is hybrid', () => {
      const result = preparePlanForDB({
        ...basePlan,
        place: 'hybrid',
        address: 'Calle Gran Vía 1',
        meeting_link: 'https://meet.google.com/abc',
      });
      expect(result.address).toBe('Calle Gran Vía 1');
      expect(result.meeting_link).toBe('https://meet.google.com/abc');
    });
  });

  describe('frequency rules', () => {
    it('clears end_date and recurrency when frequency is once', () => {
      const result = preparePlanForDB({
        ...basePlan,
        frequency: 'once',
        end_date: '2026-04-10',
        recurrency: [1, 3],
      });
      expect(result.end_date).toBeNull();
      expect(result.recurrency).toBeNull();
    });

    it('preserves end_date and recurrency when frequency is recurring', () => {
      const result = preparePlanForDB({
        ...basePlan,
        frequency: 'recurring',
        end_date: '2026-04-10',
        recurrency: [1, 3],
      });
      expect(result.end_date).toBe('2026-04-10');
      expect(result.recurrency).toEqual([1, 3]);
    });
  });

  describe('cost rules', () => {
    it('clears price when cost is free', () => {
      const result = preparePlanForDB({ ...basePlan, cost: 'free', price: 50 });
      expect(result.price).toBeNull();
    });

    it('preserves price when cost is fixed-price', () => {
      const result = preparePlanForDB({
        ...basePlan,
        cost: 'fixed-price',
        price: 50,
      });
      expect(result.price).toBe(50);
    });

    it('preserves price when cost is pay-what-you-want', () => {
      const result = preparePlanForDB({
        ...basePlan,
        cost: 'pay-what-you-want',
        price: 10,
      });
      expect(result.price).toBe(10);
    });
  });

  it('does not mutate the original plan object', () => {
    const original = { ...basePlan, place: 'online' as const, address: 'Somewhere' };
    preparePlanForDB(original);
    expect(original.address).toBe('Somewhere');
  });
});
