# Tooth Fairy - Dental Care Platform

A comprehensive dental care platform that connects patients with affordable dental insurance plans and provides AI-powered insights for dental practices.

## Features

### For Patients
- **Plan Recommender**: AI-powered dental insurance plan recommendations
- **Provider Finder**: Find dental providers in your area
- **Free Visit Program**: Qualify for free dental visits
- **Educational Resources**: Learn about dental care and insurance

### For Dental Partners
- **Partner Dashboard**: Comprehensive practice management
- **Revenue Analytics**: Track financial performance and growth metrics
- **AI Opportunities**: AI-powered recommendations for practice growth
- **Patient Management**: Track patient matches and conversions
- **Settings Management**: Account and notification preferences

## Technology Stack

- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with Radix UI components
- **Authentication**: Supabase Auth with Google OAuth
- **Database**: Supabase PostgreSQL
- **AI Integration**: Google Genkit for AI-powered features
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud account (for AI features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tooth-fairy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Partner dashboard pages
│   ├── login/              # Authentication pages
│   └── auth/               # Auth callback handlers
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components
│   └── homepage/           # Homepage-specific components
├── contexts/               # React contexts
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
└── ai/                     # AI integration and flows
```

## Authentication Setup

This project uses Supabase for authentication. See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed setup instructions.

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy automatically on every push

### Environment Variables for Production

Set these in your Netlify dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@toothfairy.com or join our Discord community.