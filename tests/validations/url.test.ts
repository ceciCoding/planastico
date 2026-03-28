import { describe, it, expect } from 'vitest';
import { isValidUrl, validateLink } from '~/validations/url';

describe('isValidUrl', () => {
  it('returns true for empty string', () => {
    expect(isValidUrl('')).toBe(true);
  });

  it('returns true for whitespace-only string', () => {
    expect(isValidUrl('   ')).toBe(true);
  });

  it('returns true for a valid https URL', () => {
    expect(isValidUrl('https://google.com')).toBe(true);
  });

  it('returns true for a valid http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  it('returns true for a URL without protocol (prepends https://)', () => {
    expect(isValidUrl('google.com')).toBe(true);
  });

  it('returns true for a URL with path and query', () => {
    expect(isValidUrl('https://maps.google.com/maps?q=granada')).toBe(true);
  });

  it('returns false for a string with no dot in hostname', () => {
    expect(isValidUrl('notaurl')).toBe(false);
  });

  it('returns false for a malformed URL', () => {
    expect(isValidUrl('://broken')).toBe(false);
  });
});

describe('validateLink', () => {
  it('returns empty string for an empty link', () => {
    expect(validateLink('')).toBe('');
  });

  it('returns empty string for whitespace-only link', () => {
    expect(validateLink('   ')).toBe('');
  });

  it('returns empty string for a valid link', () => {
    expect(validateLink('https://example.com')).toBe('');
  });

  it('returns error message for an invalid link', () => {
    expect(validateLink('notaurl')).toBe('El enlace no es válido');
  });
});
