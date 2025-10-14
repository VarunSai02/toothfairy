# 🚀 Tooth Fairy Deployment Guide

This guide will help you deploy your Tooth Fairy application to Netlify with GitHub integration.

## 📋 Prerequisites

- GitHub account
- Netlify account (free tier available)
- Supabase project set up
- Your local development environment working

## 🔧 Step 1: Push to GitHub

### Option A: Create a new repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `tooth-fairy` (or your preferred name)
   - **Description**: "Dental care platform with AI-powered insights"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Option B: Use GitHub CLI (if you have it installed)

```bash
gh repo create tooth-fairy --public --description "Dental care platform with AI-powered insights"
```

### Push your code to GitHub

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tooth-fairy.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy to Netlify

### Connect GitHub to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your `tooth-fairy` repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18` (in Environment variables)

### Set Environment Variables

1. In your Netlify dashboard, go to Site settings → Environment variables
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

### Deploy

1. Click "Deploy site"
2. Netlify will automatically build and deploy your site
3. You'll get a random URL like `https://amazing-name-123456.netlify.app`

## 🔧 Step 3: Configure Supabase for Production

### Update Supabase Settings

1. Go to your Supabase dashboard
2. Navigate to Authentication → URL Configuration
3. Add your Netlify URL to:
   - **Site URL**: `https://your-site-name.netlify.app`
   - **Redirect URLs**: 
     - `https://your-site-name.netlify.app/auth/callback`
     - `https://your-site-name.netlify.app/dashboard`

### Enable Google OAuth (Optional)

1. In Supabase, go to Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set redirect URL to: `https://your-site-name.netlify.app/auth/callback`

## 🎯 Step 4: Custom Domain (Optional)

### Add Custom Domain

1. In Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

## 🔄 Step 5: Continuous Deployment

Your site is now set up for continuous deployment! Every time you push to your main branch:

1. Netlify automatically detects changes
2. Builds your site
3. Deploys the new version
4. Your site updates automatically

## 🧪 Testing Your Deployment

1. Visit your Netlify URL
2. Test the following features:
   - Homepage loads correctly
   - Login/signup functionality
   - Dashboard access (requires authentication)
   - All navigation links work
   - Mobile responsiveness

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version is set to 18

2. **Authentication Not Working**
   - Verify environment variables are set correctly
   - Check Supabase URL configuration
   - Ensure redirect URLs match your domain

3. **Styling Issues**
   - Check if Tailwind CSS is building correctly
   - Verify all CSS files are included

4. **API Errors**
   - Check Supabase connection
   - Verify API keys are correct
   - Check browser console for errors

### Getting Help

- Check Netlify build logs for specific errors
- Use browser developer tools to debug client-side issues
- Check Supabase logs for authentication issues

## 📊 Monitoring

### Netlify Analytics
- View site performance metrics
- Monitor build times
- Track deployment history

### Supabase Dashboard
- Monitor authentication usage
- Check database performance
- View API usage statistics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to Git
2. **API Keys**: Keep service role keys secure
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure Supabase CORS settings for your domain

## 🎉 Success!

Your Tooth Fairy application is now live and accessible to users worldwide! 

- **Live URL**: `https://your-site-name.netlify.app`
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/tooth-fairy`
- **Netlify Dashboard**: Monitor and manage your deployment
- **Supabase Dashboard**: Manage your database and authentication

## 📈 Next Steps

1. **Analytics**: Add Google Analytics or similar
2. **Monitoring**: Set up error tracking (Sentry, etc.)
3. **Performance**: Optimize images and loading times
4. **SEO**: Add meta tags and sitemap
5. **Backup**: Set up database backups
6. **Scaling**: Consider upgrading hosting as you grow

Happy deploying! 🚀
