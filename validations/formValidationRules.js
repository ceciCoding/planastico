const step1Rules = {
  name: [
    { required: true, message: 'El título es obligatorio' },
    { max: 70, message: 'El título no puede superar los 70 caracteres' },
  ],
  description: [
    { required: true, message: 'La descripción es obligatoria' },
    {
      max: 3000,
      message: 'La descripción no puede superar los 3000 caracteres',
    },
  ],
  image_urls: [
    {
      type: 'array',
      max: 3,
      message: 'Máximo 3 imágenes',
    },
  ],
  categories: [
    {
      type: 'array',
      required: true,
      min: 1,
      max: 3,
      message: 'Debes seleccionar entre 1 y 3 categorías',
    },
  ],
};

const step2Rules = {
  place: [
    { required: true, message: 'Debes seleccionar un tipo de lugar' },
    {
      type: 'enum',
      enum: ['in-person', 'online', 'hybrid'],
      message: 'Tipo de lugar no válido',
    },
  ],
  address: [
    {
      validator: (rule, value, callback, source) => {
        if (
          (source.place === 'in-person' || source.place === 'hybrid') &&
          !value
        ) {
          callback(new Error('La dirección es obligatoria'));
        } else if (value && value.length > 400) {
          callback(
            new Error('La dirección no puede superar los 400 caracteres')
          );
        } else {
          callback();
        }
      },
    },
  ],
  meeting_link: [
    {
      validator: (rule, value, callback, source) => {
        if (source.place === 'online' || source.place === 'hybrid') {
          if (!value) {
            callback(new Error('El enlace de la reunión es obligatorio'));
          } else {
            try {
              new URL(value);
              callback();
            } catch {
              callback(new Error('El enlace no es válido'));
            }
          }
        } else {
          callback();
        }
      },
    },
  ],
  frequency: [
    { required: true, message: 'Debes seleccionar la frecuencia' },
    {
      type: 'enum',
      enum: ['once', 'recurring'],
      message: 'Frecuencia no válida',
    },
  ],
  start_date: [{ required: true, message: 'La fecha es obligatoria' }],
  end_date: [
    {
      validator: (rule, value, callback, source) => {
        if (source.frequency === 'recurring') {
          if (!value) {
            callback(new Error('La fecha de fin es obligatoria'));
          } else if (new Date(value) <= new Date(source.start_date)) {
            callback(
              new Error('La fecha de fin debe ser posterior a la de inicio')
            );
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    },
  ],
  recurrency: [
    {
      validator: (rule, value, callback, source) => {
        if (source.frequency === 'recurring') {
          if (!value || value.length === 0) {
            callback(
              new Error('Debes seleccionar al menos un día de la semana')
            );
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    },
  ],
  start_time: [{ required: true, message: 'La hora de inicio es obligatoria' }],
  end_time: [{ required: true, message: 'La hora de fin es obligatoria' }],
};

const step3Rules = {
  cost: [
    { required: true, message: 'Debes seleccionar el tipo de coste' },
    {
      type: 'enum',
      enum: ['free', 'pay-what-you-want', 'fixed-price'],
      message: 'Tipo de coste no válido',
    },
  ],
  price: [
    {
      validator: (rule, value, callback, source) => {
        if (source.cost !== 'free') {
          if (!value && value !== 0) {
            callback(new Error('El precio es obligatorio'));
          } else if (isNaN(Number(value))) {
            callback(new Error('El precio debe ser un número'));
          } else if (Number(value) <= 0) {
            callback(new Error('El precio debe ser mayor a 0'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    },
  ],
};

const step4Rules = {
  contact_email: [
    { required: true, message: 'El correo de contacto es obligatorio' },
    { type: 'email', message: 'El correo de contacto no es válido' },
  ],
  validation_email: [
    {
      validator: (rule, value, callback, source) => {
        if (!source.useContactEmailForManagement) {
          if (!value) {
            callback(new Error('El correo de gestión es obligatorio'));
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            callback(new Error('El correo de gestión no es válido'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    },
  ],
  // TODO: Captcha comentado temporalmente
  // captchaToken: [
  //   { required: true, message: 'Debes completar el captcha' },
  // ],
};

export const stepsRulesMap = {
  1: step1Rules,
  2: step2Rules,
  3: step3Rules,
  4: step4Rules,
};
