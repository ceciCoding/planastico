import { describe, it, expect } from 'vitest';
import { stepsRulesMap } from '~/validations/formValidationRules';

type Callback = (error?: Error) => void;
type ValidatorFn = (rule: unknown, value: unknown, callback: Callback, source: Record<string, unknown>) => void;

function getValidator(step: number, field: string): ValidatorFn {
  const rules = stepsRulesMap[step][field];
  const rule = rules.find((r): r is { validator: ValidatorFn } => 'validator' in r);
  if (!rule) throw new Error(`No custom validator found for step ${step} field "${field}"`);
  return rule.validator;
}

function runValidator(
  step: number,
  field: string,
  value: unknown,
  source: Record<string, unknown> = {}
): Error | undefined {
  let result: Error | undefined;
  getValidator(step, field)(null, value, (err) => { result = err; }, source);
  return result;
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

describe('step1 › extra_links validator', () => {
  it('passes when value is null', () => {
    expect(runValidator(1, 'extra_links', null)).toBeUndefined();
  });

  it('passes when all links are valid URLs', () => {
    expect(runValidator(1, 'extra_links', ['https://example.com', 'google.com'])).toBeUndefined();
  });

  it('passes when all links are empty strings', () => {
    expect(runValidator(1, 'extra_links', ['', '  '])).toBeUndefined();
  });

  it('fails when at least one link is invalid', () => {
    const err = runValidator(1, 'extra_links', ['https://valid.com', 'notaurl']);
    expect(err?.message).toBe('invalid');
  });
});

describe('step1 › categories validator', () => {
  it('passes with 1 category', () => {
    expect(runValidator(1, 'categories', [1])).toBeUndefined();
  });

  it('passes with 3 categories', () => {
    expect(runValidator(1, 'categories', [1, 2, 3])).toBeUndefined();
  });

  it('fails with 0 categories', () => {
    const err = runValidator(1, 'categories', []);
    expect(err?.message).toBe('Debes seleccionar al menos 1 categoría');
  });

  it('fails with more than 3 categories', () => {
    const err = runValidator(1, 'categories', [1, 2, 3, 4]);
    expect(err?.message).toBe('Puedes seleccionar máximo 3 categorías');
  });
});

// ─── Step 2 ───────────────────────────────────────────────────────────────────

describe('step2 › address validator', () => {
  it('passes when place is online (address not required)', () => {
    expect(runValidator(2, 'address', null, { place: 'online' })).toBeUndefined();
  });

  it('fails when place is in-person and address is empty', () => {
    const err = runValidator(2, 'address', null, { place: 'in-person' });
    expect(err?.message).toBe('La dirección es obligatoria');
  });

  it('fails when place is hybrid and address is empty', () => {
    const err = runValidator(2, 'address', null, { place: 'hybrid' });
    expect(err?.message).toBe('La dirección es obligatoria');
  });

  it('fails when address exceeds 400 characters', () => {
    const err = runValidator(2, 'address', 'a'.repeat(401), { place: 'online' });
    expect(err?.message).toBe('La dirección no puede superar los 400 caracteres');
  });

  it('passes when place is in-person and address is provided', () => {
    expect(runValidator(2, 'address', 'Calle Gran Vía 1', { place: 'in-person' })).toBeUndefined();
  });
});

describe('step2 › meeting_link validator', () => {
  it('passes when place is in-person (link not required)', () => {
    expect(runValidator(2, 'meeting_link', null, { place: 'in-person' })).toBeUndefined();
  });

  it('fails when place is online and link is empty', () => {
    const err = runValidator(2, 'meeting_link', null, { place: 'online' });
    expect(err?.message).toBe('El enlace de la reunión es obligatorio');
  });

  it('fails when place is hybrid and link is invalid', () => {
    const err = runValidator(2, 'meeting_link', 'notaurl', { place: 'hybrid' });
    expect(err?.message).toBe('El enlace no es válido');
  });

  it('passes when place is online and link is valid', () => {
    expect(runValidator(2, 'meeting_link', 'https://meet.google.com/abc', { place: 'online' })).toBeUndefined();
  });
});

describe('step2 › end_date validator', () => {
  it('passes when frequency is once (end_date not required)', () => {
    expect(runValidator(2, 'end_date', null, { frequency: 'once' })).toBeUndefined();
  });

  it('fails when frequency is recurring and end_date is missing', () => {
    const err = runValidator(2, 'end_date', null, { frequency: 'recurring' });
    expect(err?.message).toBe('La fecha de fin es obligatoria');
  });

  it('fails when end_date is not after start_date', () => {
    const err = runValidator(2, 'end_date', '2026-04-01', {
      frequency: 'recurring',
      start_date: '2026-04-01',
    });
    expect(err?.message).toBe('La fecha de fin debe ser posterior a la de inicio');
  });

  it('passes when end_date is after start_date', () => {
    expect(
      runValidator(2, 'end_date', '2026-04-10', {
        frequency: 'recurring',
        start_date: '2026-04-01',
      })
    ).toBeUndefined();
  });
});

describe('step2 › recurrency validator', () => {
  it('passes when frequency is once', () => {
    expect(runValidator(2, 'recurrency', [], { frequency: 'once' })).toBeUndefined();
  });

  it('fails when frequency is recurring and no days selected', () => {
    const err = runValidator(2, 'recurrency', [], { frequency: 'recurring' });
    expect(err?.message).toBe('Debes seleccionar al menos un día de la semana');
  });

  it('passes when frequency is recurring and days are selected', () => {
    expect(runValidator(2, 'recurrency', [1, 3], { frequency: 'recurring' })).toBeUndefined();
  });
});

// ─── Step 3 ───────────────────────────────────────────────────────────────────

describe('step3 › price validator', () => {
  it('passes when cost is free (price not required)', () => {
    expect(runValidator(3, 'price', null, { cost: 'free' })).toBeUndefined();
  });

  it('fails when cost is fixed-price and price is missing', () => {
    const err = runValidator(3, 'price', null, { cost: 'fixed-price' });
    expect(err?.message).toBe('El precio es obligatorio');
  });

  it('fails when price is not a number', () => {
    const err = runValidator(3, 'price', 'abc', { cost: 'fixed-price' });
    expect(err?.message).toBe('El precio debe ser un número');
  });

  it('fails when price is 0 or negative', () => {
    const zeroErr = runValidator(3, 'price', 0, { cost: 'fixed-price' });
    expect(zeroErr?.message).toBe('El precio debe ser mayor a 0');

    const negErr = runValidator(3, 'price', -5, { cost: 'fixed-price' });
    expect(negErr?.message).toBe('El precio debe ser mayor a 0');
  });

  it('passes when cost is fixed-price and price is valid', () => {
    expect(runValidator(3, 'price', 25, { cost: 'fixed-price' })).toBeUndefined();
  });
});

// ─── Step 4 ───────────────────────────────────────────────────────────────────

describe('step4 › validation_email validator', () => {
  it('passes when useContactEmailForManagement is true', () => {
    expect(
      runValidator(4, 'validation_email', null, { useContactEmailForManagement: true })
    ).toBeUndefined();
  });

  it('fails when useContactEmailForManagement is false and email is missing', () => {
    const err = runValidator(4, 'validation_email', null, { useContactEmailForManagement: false });
    expect(err?.message).toBe('El correo de gestión es obligatorio');
  });

  it('fails when email is invalid', () => {
    const err = runValidator(4, 'validation_email', 'notanemail', { useContactEmailForManagement: false });
    expect(err?.message).toBe('El correo de gestión no es válido');
  });

  it('passes with a valid email', () => {
    expect(
      runValidator(4, 'validation_email', 'admin@example.com', { useContactEmailForManagement: false })
    ).toBeUndefined();
  });
});
