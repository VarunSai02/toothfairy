# 🤖 Gemini API Key Setup Guide

Yes, you need to add your Gemini API key to make the AI chat feature work! Here's how to set it up:

## 🔑 Step 1: Get Your Gemini API Key

1. **Go to Google AI Studio**
   - Visit [aistudio.google.com](https://aistudio.google.com)
   - Sign in with your Google account

2. **Create an API Key**
   - Click "Get API key" in the left sidebar
   - Click "Create API key"
   - Choose "Create API key in new project" or select existing project
   - Copy the generated API key

## 🔧 Step 2: Add API Key to Environment Variables

### For Local Development (.env.local)

Add this line to your `.env.local` file:

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

### For Production (Netlify)

1. **Go to your Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com)
   - Click on your `toothfairy` site

2. **Add Environment Variable**
   - Go to Site settings → Environment variables
   - Click "Add variable"
   - Add:
     ```
     Variable name: GOOGLE_GENAI_API_KEY
     Value: your_gemini_api_key_here
     ```

## 🔧 Step 3: Update Genkit Configuration

The AI flows are already configured to use the Gemini API key from environment variables. The key is automatically loaded in:

- `src/ai/genkit.ts` - Main Genkit configuration
- `src/ai/flows/chat-recommendation.ts` - Chat AI flow
- `src/ai/flows/treatment-plan-recommendation.ts` - Plan recommendation flow

## 🧪 Step 4: Test the AI Chat

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the AI Chat page:**
   - Go to `http://localhost:9002/ai-chat`
   - Try asking: "I'm 28 years old and need dental insurance for regular checkups"

3. **Check for errors:**
   - If you see API errors, verify the API key is correct
   - Check the browser console for any error messages

## 🔒 Security Notes

- **Never commit API keys to Git** - They're already in `.gitignore`
- **Keep your API key secure** - Don't share it publicly
- **Monitor usage** - Google AI Studio shows your API usage and costs

## 💰 Pricing Information

- **Gemini API is free** for most usage levels
- **Rate limits apply** - Check Google AI Studio for current limits
- **Usage tracking** - Monitor your usage in Google AI Studio dashboard

## 🐛 Troubleshooting

### Common Issues:

1. **"API key not found" error**
   - Check that `GOOGLE_GENAI_API_KEY` is set correctly
   - Restart your development server after adding the key

2. **"Quota exceeded" error**
   - Check your API usage in Google AI Studio
   - You may need to upgrade your quota

3. **"Invalid API key" error**
   - Verify the API key is copied correctly
   - Make sure there are no extra spaces or characters

### Testing Commands:

```bash
# Check if environment variable is loaded
echo $GOOGLE_GENAI_API_KEY

# Test API key (replace YOUR_KEY with actual key)
curl -H "Authorization: Bearer YOUR_KEY" \
     -H "Content-Type: application/json" \
     "https://generativelanguage.googleapis.com/v1beta/models"
```

## 🚀 Next Steps

After setting up the API key:

1. **Test the AI chat** - Try different questions and scenarios
2. **Deploy to production** - Make sure to add the key to Netlify
3. **Monitor usage** - Keep an eye on API usage and costs
4. **Customize responses** - Modify the AI prompts in the flow files

## 📚 Additional Resources

- [Google AI Studio Documentation](https://ai.google.dev/docs)
- [Gemini API Reference](https://ai.google.dev/api/rest)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)

Your AI chat feature will be fully functional once you add the Gemini API key! 🎉
