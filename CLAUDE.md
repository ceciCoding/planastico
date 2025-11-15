# CLAUDE.md - Planastico Codebase Guide

**Project**: Planastico - Tu app de planes en Granada
**Last Updated**: 2025-11-15
**Framework**: Nuxt 3.17.5 + Vue 3.5.17

This document serves as a comprehensive guide for AI assistants working with the Planastico codebase.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Code Conventions](#code-conventions)
5. [Design System](#design-system)
6. [Component Architecture](#component-architecture)
7. [Development Workflow](#development-workflow)
8. [Key Patterns](#key-patterns)
9. [Testing & Quality](#testing--quality)
10. [Common Tasks](#common-tasks)

---

## Project Overview

Planastico is a Nuxt 3 application designed for planning and organizing activities in Granada, Spain. The project emphasizes:
- Accessible, user-friendly forms and interfaces
- A distinctive visual design with custom color palette and bold borders
- Component reusability through Reka UI and custom components
- Type-safe development with proper prop validation

## Tech Stack

### Core Technologies
- **Nuxt**: 3.17.5 (SSR/Static Site Generation framework)
- **Vue**: 3.5.17 (Progressive JavaScript framework)
- **Vue Router**: 4.5.1 (Official router)

### UI & Styling
- **Reka UI**: 2.5.1 (Headless UI component library)
- **SCSS**: CSS preprocessor with nested syntax support
- **PostCSS**: With `postcss-nested` and `autoprefixer` plugins
- **CSS Custom Properties**: For design token system

### Development Tools
- **ESLint**: 9.30.0 with @nuxt/eslint integration
- **Prettier**: 3.6.2 (Code formatter)
- **EditorConfig**: Consistent coding styles across editors

### Utilities
- **nanoid**: 5.1.5 (Unique ID generation)
- **@internationalized/date**: 3.5.0 (Date/time handling)
- **@nuxt/image**: 1.10.0 (Image optimization)

## Directory Structure

```
planastico/
├── .vscode/              # VS Code workspace settings
│   └── settings.json     # Format on save, Prettier config
├── assets/
│   └── css/
│       └── main.css      # Global styles, CSS variables, resets
├── components/
│   ├── Form/             # Form-related components
│   │   ├── Timepicker/   # Nested timepicker components
│   │   ├── FormBaseInput.vue
│   │   ├── FormDatepicker.vue
│   │   ├── FormInputLabel.vue
│   │   ├── FormSelect.vue
│   │   ├── FormTextarea.vue
│   │   ├── FormActionButton.vue
│   │   ├── FormActionsGroup.vue
│   │   └── FormButtonNew.vue
│   └── Icon/             # SVG icon components
│       ├── IconArrow.vue
│       ├── IconClock.vue
│       ├── IconEdit.vue
│       └── ... (other icons)
├── composables/          # Reusable composition functions
│   ├── uuid.js           # Generate unique IDs with nanoid
│   └── timeParser.js     # Time parsing utilities
├── pages/                # Nuxt pages (file-based routing)
│   ├── index.vue         # Home page
│   └── componentes.vue   # Components showcase page
├── public/               # Static assets (served as-is)
├── server/               # Server-side code (API routes, etc.)
├── app.vue               # Root component
├── nuxt.config.ts        # Nuxt configuration
├── eslint.config.mjs     # ESLint configuration
├── .prettierrc           # Prettier configuration
└── .editorconfig         # EditorConfig settings
```

### Component Organization

Components are organized by **feature/domain**:
- **Form/**: All form-related components with descriptive names
  - Nested folders for complex components (e.g., `Timepicker/`)
- **Icon/**: SVG icon components following `Icon{Name}.vue` pattern

**Naming Convention**: `{Category}{ComponentName}.vue` (e.g., `FormBaseInput.vue`, `IconArrow.vue`)

## Code Conventions

### Formatting Standards

**Indentation & Spacing** (.editorconfig + .prettierrc):
```
- Indent: 2 spaces (no tabs)
- Line endings: LF (Unix-style)
- Final newline: Required
- Trailing whitespace: Remove
- Print width: 80 characters
```

**JavaScript/TypeScript** (.prettierrc):
```javascript
{
  "semi": true,                      // Always use semicolons
  "singleQuote": true,               // Use single quotes
  "trailingComma": "es5",           // Trailing commas where valid in ES5
  "bracketSpacing": true             // Spaces in object literals
}
```

**Vue Specific** (.prettierrc):
```javascript
{
  "vueIndentScriptAndStyle": true,   // Indent <script> and <style>
  "singleAttributePerLine": true,    // One attribute per line
  "htmlWhitespaceSensitivity": "ignore"
}
```

### File Naming

- **Components**: PascalCase with feature prefix (e.g., `FormBaseInput.vue`)
- **Pages**: kebab-case (e.g., `componentes.vue`, `index.vue`)
- **Composables**: camelCase with `.js` extension (e.g., `uuid.js`)
- **Config files**: Standard names (e.g., `nuxt.config.ts`, `eslint.config.mjs`)

### Import Conventions

Use Nuxt's auto-import features:
```vue
<script setup>
  // ✓ Composables auto-imported
  const id = useUuid();

  // ✓ Components auto-imported
  // No need to import FormInputLabel

  // ✗ Manual imports only when necessary
  import { nanoid } from 'nanoid';
</script>
```

### CSS Naming: BEM-Like Approach

Use a modified BEM (Block Element Modifier) pattern with SCSS nesting:

```scss
.form-base-input {                    // Block
  &__wrapper {                         // Element
    /* styles */
  }

  &__input {                           // Element
    &--left {                          // Modifier
      /* styles */
    }

    &--has-error {                     // State modifier
      /* styles */
    }
  }
}
```

**Pattern**: `{component-name}__{element}--{modifier}`

## Design System

### CSS Custom Properties

Located in `assets/css/main.css`:

**Colors**:
```css
--planastico-cold-black: #20263a        /* Primary text/borders */
--planastico-white: #ffffff             /* Backgrounds */
--planastico-soft-yellow: #fff373       /* Light accent */
--planastico-yellow: #ffea00            /* Primary accent */
--planastico-yellow-shade: #f6e200      /* Hover/active states */
--planastico-warm-soft-gray: #f0f0f0    /* Input backgrounds */
--planastico-soft-gray-shade: #d3d2cb   /* Borders/dividers */
--planastico-cold-black-shade: #5c6274  /* Secondary text */
--planastico-error-red: #e20c00         /* Error states */
```

**Spacing & Borders**:
```css
--planastico-border-radius-s: 14px      /* Small radius */
--planastico-border-radius-m: 20px      /* Medium radius */
--planastico-border-s: 2px solid var(--planastico-cold-black)
--planastico-border-m: 3px solid var(--planastico-cold-black)
--planastico-border-l: 4px solid var(--planastico-cold-black)
--planastico-border-xl: 6px solid var(--planastico-cold-black)
--planastico-shadow: 0 4px 0 var(--planastico-cold-black)
```

**Z-Index**:
```css
--planastico-max-z-index: 9999          /* Modal/overlay layer */
```

### Typography

**Font Family**: Atkinson Hyperlegible (Google Fonts)
- Accessible, highly legible typeface
- Weights: 400 (regular), 700 (bold)
- Applied globally to body, inputs, buttons, etc.

### Accessibility

**Focus States**:
```css
:focus-visible {
  outline: 2px dashed var(--planastico-cold-black);
  outline-offset: 2px;
}
```

**Screen Reader Only** (`.sr-only`):
```css
.sr-only {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

**Labels**: Always provide labels for form inputs (use `FormInputLabel` component)

### Scrollbars

Custom styled scrollbars for both Firefox and Webkit browsers:
- Track: White background
- Thumb: Yellow (`--planastico-yellow`)
- Width: 16px

## Component Architecture

### Vue 3 Composition API

All components use the `<script setup>` syntax:

```vue
<script setup>
  import { ref } from 'vue';

  // Props
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
      required: true,
    },
  });

  // Events
  const emit = defineEmits(['update:model-value']);

  // Reactive state
  const isOpen = ref(false);
</script>
```

### Props Pattern

**Always include**:
- Type validation
- Default values (when optional)
- `required: true` for mandatory props

**Common prop shapes**:

```javascript
// Simple types
modelValue: {
  type: String,
  default: '',
}

// Objects
field: {
  type: Object,
  required: true,
}

// Booleans
isVisible: {
  type: Boolean,
  default: true,
}

// With validator
color: {
  type: String,
  default: '',
  validator: (value) => ['red', 'blue', 'green'].includes(value)
}
```

### v-model Pattern

Use `modelValue` prop + `update:model-value` emit:

```vue
<script setup>
  const props = defineProps({
    modelValue: { type: String, default: '' }
  });
  const emit = defineEmits(['update:model-value']);
</script>

<template>
  <input
    :value="props.modelValue"
    @input="(e) => emit('update:model-value', e.target.value)"
  />
</template>
```

Usage:
```vue
<FormBaseInput v-model="formData.title" :field="titleField" />
```

### Composables

Located in `/composables`, auto-imported by Nuxt.

**Example: uuid.js**
```javascript
import { nanoid } from 'nanoid';
import { ref, onMounted } from 'vue';

export function useUuid() {
  const id = ref('');

  onMounted(() => {
    if (import.meta.client) {
      id.value = nanoid();
    }
  });

  return id;
}
```

**Usage**:
```vue
<script setup>
  const id = useUuid(); // Auto-imported
</script>

<template>
  <input :id="id" />
  <label :for="id">Name</label>
</template>
```

**Why client-only check?** Nuxt SSR generates HTML on server; unique IDs must be generated client-side to avoid hydration mismatches.

### Icon Components

SVG icons as Vue components:
- Located in `components/Icon/`
- Named `Icon{Name}.vue`
- Accept props for size, color, etc.
- Use semantic `<title>` for accessibility

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Generate Nuxt types and .nuxt directory
npm run postinstall
```

### Development Server

```bash
npm run dev
# Server runs on http://localhost:3000
```

**Features**:
- Hot Module Replacement (HMR)
- Auto-import components, composables, and utilities
- TypeScript support
- DevTools enabled

### Building for Production

```bash
# Build application
npm run build

# Preview production build locally
npm run preview

# Generate static site (SSG)
npm run generate
```

### Code Quality

**Format code**:
```bash
# Prettier runs on save (VS Code)
# Manual format (if needed):
npx prettier --write .
```

**Lint code**:
```bash
# ESLint
npx eslint .

# Auto-fix issues
npx eslint . --fix
```

### Git Workflow

**Conventional Commits** (inferred from recent commits):
- Use emoji prefixes: `:lipstick:`, `:truck:`, etc.
- Examples:
  - `:lipstick: add scrollbar styles`
  - `:truck: rename form input label`
  - `add textarea`

## Key Patterns

### Form Input Pattern

**Standard structure for form inputs**:

1. **Wrapper** (`<div class="{component-name}">`)
2. **Label** (using `FormInputLabel`)
3. **Input wrapper** (for positioning icons, currency symbols)
4. **Input element** (with error states, modifiers)
5. **Character count or error message**

**Example**:
```vue
<template>
  <div class="form-base-input">
    <FormInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <div class="form-base-input__wrapper">
      <input
        :id="id"
        :value="props.modelValue"
        class="form-base-input__input"
        :class="{
          'form-base-input__input--has-error': props.error.length
        }"
        @input="(e) => emit('update:model-value', e.target.value)"
      />
    </div>
    <span v-if="props.error.length" class="form-base-input__error">
      {{ props.error }}
    </span>
  </div>
</template>
```

### Field Configuration Object

Form components accept a `field` prop with this structure:

```javascript
{
  label: {
    name: String,      // Display text
    isVisible: Boolean // Show/hide (accessibility maintained)
  },
  inputType: String,   // 'text', 'number', 'email', etc.
  placeholder: String,
  roundedCorner: String, // 'left' | 'right' (for grouped inputs)
  isCurrency: Boolean,   // Show € symbol
  isErasable: Boolean,   // Show clear button
  maxLength: Number      // Character limit
}
```

### Error Handling

```vue
<script setup>
  const props = defineProps({
    error: {
      type: String,
      default: '',
    },
  });
</script>

<template>
  <!-- Input with error state -->
  <input
    :class="{
      'form-base-input__input--has-error': props.error.length
    }"
  />

  <!-- Error message -->
  <span v-if="props.error.length" class="form-base-input__error">
    {{ props.error }}
  </span>
</template>

<style scoped lang="scss">
  .form-base-input {
    &__input--has-error {
      border-color: var(--planastico-error-red);
      color: var(--planastico-error-red);

      &:focus-visible {
        outline-color: var(--planastico-error-red);
      }
    }

    &__error {
      font-size: 0.875rem;
      padding-top: 0.5rem;
      color: var(--planastico-error-red);
    }
  }
</style>
```

### Conditional Rendering

Use `v-if` for conditional rendering:

```vue
<template>
  <!-- Show/hide based on condition -->
  <span v-if="props.field.maxLength && !props.error.length">
    {{ props.modelValue.length }}/{{ props.field.maxLength }}
  </span>

  <!-- Toggle visibility with class -->
  <label :class="{ 'sr-only': !props.isVisible }">
    {{ label }}
  </label>
</template>
```

### Scoped Styles

**Always use scoped styles** to prevent CSS leakage:

```vue
<style scoped lang="scss">
  /* Styles only apply to this component */
</style>
```

**Global styles** only in `assets/css/main.css`.

## Testing & Quality

### Type Safety

- Use proper TypeScript types in `.ts` files
- Validate Vue component props with runtime types
- Nuxt auto-generates TypeScript declarations

### Accessibility Checklist

When creating components:

- [ ] Provide labels for all inputs (visible or `.sr-only`)
- [ ] Use semantic HTML (`<button>`, `<label>`, etc.)
- [ ] Ensure keyboard navigation works (focus states)
- [ ] Add ARIA attributes when necessary
- [ ] Test with screen readers
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features (Vite transpiles as needed)
- Custom scrollbar styles for Firefox and Webkit
- CSS custom properties (no IE11 support)

## Common Tasks

### Creating a New Form Component

1. **Create file**: `components/Form/Form{Name}.vue`
2. **Setup structure**:

```vue
<script setup>
  import { useUuid } from '~/composables/uuid';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:model-value']);
  const id = useUuid();
</script>

<template>
  <div class="form-{name}">
    <FormInputLabel
      :input-id="id"
      :label="props.field.label.name"
      :is-visible="props.field.label.isVisible"
    />
    <!-- Input element -->
  </div>
</template>

<style scoped lang="scss">
  .form-{name} {
    display: flex;
    flex-direction: column;
    width: 100%;

    // Element and modifier styles
  }
</style>
```

3. **Test**: Add to `pages/componentes.vue` showcase

### Adding a New Icon

1. **Create file**: `components/Icon/Icon{Name}.vue`
2. **Structure**:

```vue
<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: '24',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  });
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{Icon Name}</title>
    <!-- SVG paths -->
  </svg>
</template>
```

3. **Usage**: `<IconName :size="32" color="#20263a" />`

### Creating a New Page

1. **Create file**: `pages/{route-name}.vue`
2. **Basic structure**:

```vue
<template>
  <div class="page-{name}">
    <h1>Page Title</h1>
    <!-- Page content -->
  </div>
</template>

<style scoped lang="scss">
  .page-{name} {
    /* Page-specific styles */
  }
</style>
```

3. **Route**: Automatically available at `/{route-name}`

### Adding a New Composable

1. **Create file**: `composables/{name}.js`
2. **Export function**:

```javascript
import { ref } from 'vue';

export function use{Name}() {
  const state = ref(null);

  function doSomething() {
    // Logic
  }

  return {
    state,
    doSomething,
  };
}
```

3. **Usage**: Auto-imported as `use{Name}()`

### Updating CSS Variables

Edit `assets/css/main.css`:

```css
:root {
  --planastico-new-color: #hexvalue;
}
```

Use in components:
```scss
.my-component {
  color: var(--planastico-new-color);
}
```

### Working with Reka UI

Reka UI provides headless components (logic without styling):

```vue
<script setup>
  // Example: Using a Reka UI component
  import { Popover, PopoverTrigger, PopoverContent } from 'reka-ui';
</script>

<template>
  <Popover>
    <PopoverTrigger>Click me</PopoverTrigger>
    <PopoverContent>
      <!-- Custom styled content -->
    </PopoverContent>
  </Popover>
</template>
```

Apply custom styles matching Planastico design system.

---

## Key Reminders for AI Assistants

1. **Always format on save**: Code should match Prettier config
2. **Use BEM-like naming**: `{component}__{element}--{modifier}`
3. **Validate props**: Include type, default/required
4. **Accessibility first**: Labels, semantic HTML, focus states
5. **Scoped styles**: Prevent CSS leakage
6. **CSS variables**: Use design tokens from `main.css`
7. **Auto-imports**: Leverage Nuxt's auto-import for components/composables
8. **UUID for IDs**: Use `useUuid()` composable for input IDs
9. **v-model pattern**: `modelValue` prop + `update:model-value` emit
10. **Client-side checks**: Use `import.meta.client` for browser-only code

---

## Questions or Updates?

When in doubt:
- Check existing components for patterns (e.g., `FormBaseInput.vue`)
- Review `main.css` for available design tokens
- Consult Nuxt 3 documentation: https://nuxt.com/docs
- Verify Reka UI components: https://reka-ui.com

**Update this document** as the codebase evolves to ensure AI assistants have accurate, up-to-date guidance.
