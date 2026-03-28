import { describe, it, expect } from 'vitest';
import { useImageValidation } from '~/composables/imageValidation';

const { validateImage } = useImageValidation();

function makeFile(type: string, sizeInBytes: number): File {
  const blob = new Blob([new Uint8Array(sizeInBytes)], { type });
  return new File([blob], 'test-file', { type });
}

const MB = 1024 * 1024;

describe('validateImage', () => {
  describe('format validation', () => {
    it.each(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'])(
      'accepts %s format',
      (type) => {
        const result = validateImage(makeFile(type, 1 * MB));
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      }
    );

    it('rejects an unsupported format', () => {
      const result = validateImage(makeFile('image/gif', 1 * MB));
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Formato no soportado');
    });

    it('rejects a non-image file', () => {
      const result = validateImage(makeFile('application/pdf', 1 * MB));
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Formato no soportado');
    });
  });

  describe('size validation', () => {
    it('accepts a file exactly at the 5MB limit', () => {
      const result = validateImage(makeFile('image/jpeg', 5 * MB));
      expect(result.valid).toBe(true);
    });

    it('rejects a file exceeding 5MB', () => {
      const result = validateImage(makeFile('image/jpeg', 5 * MB + 1));
      expect(result.valid).toBe(false);
      expect(result.error).toBe('La imagen supera el tamaño máximo permitido (5MB)');
    });
  });
});
