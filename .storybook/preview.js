// Importar estilos globales
import '../assets/css/main.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      language: 'javascript',
      format: 'dedent',
    },
  },
};

// Configuración global para todas las historias
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light' },
        { value: 'dark', icon: 'circle', title: 'Dark' },
      ],
    },
  },
};

// Decorador para aplicar estilos globales
export const decorators = [
  (story) => ({
    components: { story },
    template: `
      <div style="padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
        <story />
      </div>
    `,
  }),
];
