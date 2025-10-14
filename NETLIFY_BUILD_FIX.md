# 🚨 Netlify Build Fix - Environment Variables Setup

Your Netlify build is failing because the Supabase environment variables are not configured. Here's how to fix it:

## 🔧 Step 1: Set Environment Variables in Netlify

1. **Go to your Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Sign in to your account
   - Click on your `toothfairy` site

2. **Navigate to Site Settings**
   - Click "Site settings" in the top navigation
   - Click "Environment variables" in the left sidebar

3. **Add the Required Environment Variables**
   Click "Add variable" and add each of these:

   ```
   Variable name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://dkbrmdhlbxylscuugaxk.supabase.co
   ```

   ```
   Variable name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYnJtZGhsYnh5bHNjdXVnYXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODE1MzMsImV4cCI6MjA3NTk1NzUzM30.V81ZKu5herzb1Hwy3KT7XLj4bdihPNyJuGI5BXQ4qcY
   ```

   ```
   Variable name: SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYnJtZGhsYnh5bHNjdXVnYXhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDM4MTUzMywiZXhwIjoyMDc1OTU3NTMzfQ.QEilcOYqJEomsSaoZHgbeLw4o3fJ0XkKGuS8rOLufT4
   ```

4. **Save the Variables**
   - Click "Save" after adding each variable
   - Make sure all three variables are listed

## 🔧 Step 2: Update Supabase Settings

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in and select your project

2. **Update Authentication Settings**
   - Go to Authentication → URL Configuration
   - Add your Netlify URL to:
     - **Site URL**: `https://your-site-name.netlify.app`
     - **Redirect URLs**: 
       - `https://your-site-name.netlify.app/auth/callback`
       - `https://your-site-name.netlify.app/dashboard`

## 🔧 Step 3: Trigger a New Build

1. **In Netlify Dashboard**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

2. **Or Push a New Commit**
   ```bash
   git add .
   git commit -m "Update Netlify configuration"
   git push
   ```

## 🔧 Step 4: Alternative - Use Netlify CLI

If you prefer using the command line:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://dkbrmdhlbxylscuugaxk.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYnJtZGhsYnh5bHNjdXVnYXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODE1MzMsImV4cCI6MjA3NTk1NzUzM30.V81ZKu5herzb1Hwy3KT7XLj4bdihPNyJuGI5BXQ4qcY"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYnJtZGhsYnh5bHNjdXVnYXhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDM4MTUzMywiZXhwIjoyMDc1OTU3NTMzfQ.QEilcOYqJEomsSaoZHgbeLw4o3fJ0XkKGuS8rOLufT4"

# Deploy
netlify deploy --prod
```

## 🐛 Troubleshooting

### If Build Still Fails:

1. **Check Environment Variables**
   - Make sure all three variables are set
   - Verify the values are correct (no extra spaces)
   - Check that variable names match exactly

2. **Check Supabase Project**
   - Ensure your Supabase project is active
   - Verify the URL and keys are current
   - Check if your project has any restrictions

3. **Check Build Logs**
   - Look for specific error messages
   - Check if Node.js version is correct (should be 20)
   - Verify all dependencies are installed

### Common Issues:

- **"Repository not found"**: Check GitHub repository permissions
- **"Build timeout"**: Increase build timeout in Netlify settings
- **"Memory limit exceeded"**: Upgrade Netlify plan or optimize build

## ✅ Success Indicators

When the build succeeds, you should see:
- ✅ Build completed successfully
- ✅ Site deployed to your Netlify URL
- ✅ Authentication working on the live site
- ✅ Dashboard accessible after login

## 📞 Need Help?

If you're still having issues:
1. Check the Netlify build logs for specific errors
2. Verify your Supabase project is active
3. Make sure all environment variables are set correctly
4. Try redeploying after making changes

Your site should be live at: `https://your-site-name.netlify.app`
