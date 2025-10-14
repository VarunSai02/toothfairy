# Tooth Fairy Authentication Setup

This guide will help you set up Supabase authentication for the Tooth Fairy application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. The Tooth Fairy project dependencies installed

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `tooth-fairy` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key
   - Service role key (keep this secret!)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Replace the placeholder values with your actual Supabase credentials.

### 4. Enable Authentication Providers

1. In your Supabase dashboard, go to Authentication > Providers
2. Enable Email authentication (it's enabled by default)
3. To enable Google OAuth:
   - Toggle "Enable email confirmations" if desired
   - Go to Authentication > Providers > Google
   - Enable Google provider
   - Add your Google OAuth credentials:
     - Client ID
     - Client Secret
   - Set the redirect URL to: `https://your-domain.com/auth/callback`

### 5. Configure Email Templates (Optional)

1. Go to Authentication > Email Templates
2. Customize the email templates for:
   - Confirm signup
   - Reset password
   - Magic link
   - Change email address

## Database Schema (Optional)

If you want to store additional user data, you can create custom tables in Supabase:

```sql
-- Create a profiles table to store additional user information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_type TEXT DEFAULT 'partner',
  full_name TEXT,
  practice_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Testing the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:9002/login`

3. Test the following features:
   - Email/password signup
   - Email/password login
   - Google OAuth (if configured)
   - Protected route access (try accessing `/dashboard` without logging in)
   - User menu and logout functionality

## Features Implemented

### Authentication Features
- ✅ Email/password authentication
- ✅ Google OAuth integration
- ✅ User session management
- ✅ Protected routes with middleware
- ✅ Automatic redirects
- ✅ User context and state management

### UI Components
- ✅ Login/signup form with validation
- ✅ User avatar and dropdown menu
- ✅ Mobile-responsive navigation
- ✅ Loading states and error handling
- ✅ Toast notifications

### Protected Routes
- ✅ Dashboard (`/dashboard`)
- ✅ Settings (`/dashboard/settings`)
- ✅ Automatic redirect to login for unauthenticated users
- ✅ Redirect to dashboard for authenticated users accessing login

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check that your environment variables are correctly set
   - Ensure you're using the correct project URL and keys

2. **Google OAuth not working**
   - Verify your Google OAuth credentials
   - Check that the redirect URL is correctly configured
   - Ensure your domain is added to Google OAuth settings

3. **Middleware not working**
   - Check that `middleware.ts` is in the root directory
   - Verify the matcher pattern in the middleware config

4. **Session not persisting**
   - Check browser cookies are enabled
   - Verify Supabase URL and keys are correct
   - Check browser console for errors

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Authentication Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Discord Community](https://discord.supabase.com)

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Service Role Key**: Keep this secret and only use it server-side
3. **Row Level Security**: Enable RLS on any custom tables
4. **HTTPS**: Always use HTTPS in production
5. **Email Verification**: Consider enabling email confirmation for signups

## Next Steps

After setting up authentication, you can:

1. Add more OAuth providers (GitHub, LinkedIn, etc.)
2. Implement user roles and permissions
3. Add user profile management
4. Set up email notifications
5. Add two-factor authentication
6. Implement password reset functionality
