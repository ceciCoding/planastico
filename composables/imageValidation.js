export const useImageValidation = () => {
  const validFormats = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/avif',
  ];
  const maxSize = 2 * 1024 * 1024; // 2MB

  const validateImage = (file) => {
    if (!validFormats.includes(file.type)) {
      return { valid: false, error: 'Formato no soportado' };
    }
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'La imagen supera el tamaño máximo permitido (2MB)',
      };
    }
    return { valid: true };
  };

  return { validateImage };
};
