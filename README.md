# Planástico

> Your go-to community plans platform for Granada, Spain

Planástico is a web application that helps people discover, create, and manage local plans and activities in Granada.

## Features

- **Plan Discovery**: Browse upcoming plans and activities happening in Granada
- **Plan Creation**: Multi-step wizard to create and publish plans
- **Flexible Plan Types**: Support for in-person, online, and hybrid plans
- **Smart Scheduling**: Single-date or recurring plans with custom weekday selection
- **Multiple Pricing Models**: Free plans, pay-what-you-want, or fixed pricing
- **Rich Media**: Upload up to 3 images per plan with automatic compression
- **Category System**: Organize plans with customizable categories
- **Image Optimization**: Automatic WebP conversion and compression for optimal performance

## Tech Stack

### Frontend

- **[Nuxt 3](https://nuxt.com/)** - Vue.js meta-framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety with strict mode
- **[Pinia](https://pinia.vuejs.org/)** - State management
- **[Reka UI](https://reka-ui.com/)** - Headless UI component library
- **[Sass](https://sass-lang.com/)** - CSS preprocessing

### Backend & Services

- **[Supabase](https://supabase.com/)** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Storage for event images
  - Real-time capabilities
- **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)** - Bot protection on plan creation

### Utilities

- **[VueUse](https://vueuse.org/)** - Collection of Vue composition utilities
- **[Axios](https://axios-http.com/)** - HTTP client
- **[async-validator](https://github.com/yiminghe/async-validator)** - Form validation
- **[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)** - Client-side image optimization
- **[nanoid](https://github.com/ai/nanoid)** - Unique ID generation
- **[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/)** - Date and time manipulation

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- [Supabase account](https://supabase.com/) (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ceciCoding/planastico.git
   cd planastico
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase backend**

   Follow the detailed setup guide in [supabase/README.md](supabase/README.md). You'll need to:
   - Create a Supabase project
   - Run the database schema from [supabase/schema.sql](supabase/schema.sql)
   - Create the `plan-images` storage bucket
   - Get your API credentials

4. **Configure environment variables**

   Copy the example file and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |----------|-------------|
   | `SUPABASE_URL` | Your Supabase project URL |
   | `SUPABASE_KEY` | Supabase anon/public key |
   | `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public) |
   | `NUXT_TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-only) |

   > For local development use the [Cloudflare test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Plan Creation Workflow

The plan creation process is divided into 4 intuitive steps:

1. **Basic Information**
   - Plan title and description
   - Image uploads (up to 3 images)
   - Category selection (1-3 categories)

2. **Location & Timing**
   - Plan type (in-person, online, or hybrid)
   - Date selection (single or recurring)
   - Start and end times
   - Weekday selection for recurring plans

3. **Pricing**
   - Free plans
   - Pay-what-you-want with suggested amount
   - Fixed price

4. **Contact & Validation**
   - Management email (for plan ownership)
   - Public contact email
   - Cloudflare Turnstile captcha (bot protection)

## Design Philosophy

Planástico features a bold, accessible design with:

- **Brutalist aesthetic** with strong borders and shadow effects
- **High contrast** for excellent readability
- **Atkinson Hyperlegible font** for accessibility
- **Custom CSS** design system (no framework dependencies)
- **Mobile-first** responsive approach
- **Playful interactions** with press-down button states and animations

### Color Palette

- **Primary Yellow**: `#ffea00` - Main accent color
- **Soft Yellow**: `#fff373` - Secondary highlights
- **Cold Black**: `#20263a` - Text and borders
- **White**: `#ffffff` - Backgrounds
- **Gray variations**: For subtle UI elements

## Database Schema

### Main Tables

- **plans** - Core plan data
- **categories** - Plan categories
- **plan_categories** - Many-to-many relationship between plans and categories
- **plan_images** - Image metadata and URLs

### Storage Buckets

- **plan-images** - Stores compressed plan photos in WebP format

## Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
npm run lint
```

### TypeScript

Strict mode is enabled for maximum type safety. Check types with:

```bash
npx nuxi typecheck
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Nuxt 3](https://nuxt.com/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [Reka UI](https://reka-ui.com/)
- Font: [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible) by Braille Institute

---

₊˚⊹ᰔ Made with love for the Granada community ₊˚⊹ᰔ
