interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

const validFormats = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/avif',
];

const maxSize = 5 * 1024 * 1024;

export const useImageValidation = () => {
  const validateImage = (file: File): ImageValidationResult => {
    if (!validFormats.includes(file.type)) {
      return { valid: false, error: 'Formato no soportado' };
    }
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'La imagen supera el tamaño máximo permitido (5MB)',
      };
    }
    return { valid: true };
  };

  return { validateImage };
};
