import { generateObject } from '@genkit-ai/googleai/genkit-ai-googleai'
import { z } from 'zod'

const ChatRecommendationSchema = z.object({
  response: z.string().describe('The AI assistant response to the user'),
  recommendations: z.array(z.object({
    plan: z.string().describe('Name of the dental insurance plan'),
    reason: z.string().describe('Why this plan is recommended for the user'),
    monthlyCost: z.string().describe('Estimated monthly cost'),
    coverage: z.string().describe('Key coverage highlights')
  })).optional().describe('Specific plan recommendations if applicable')
})

export type ChatRecommendationOutput = z.infer<typeof ChatRecommendationSchema>

export async function generateChatRecommendation(
  userMessage: string,
  userInfo: any,
  conversationHistory: any[]
): Promise<ChatRecommendationOutput> {
  const prompt = `
You are an expert dental insurance advisor AI assistant. A user is asking about dental insurance plans.

User's current message: "${userMessage}"

User information gathered so far:
- Age: ${userInfo.age || 'Not specified'}
- Location: ${userInfo.location || 'Not specified'}
- Budget: ${userInfo.budget || 'Not specified'}
- Dental needs: ${userInfo.dentalNeeds || 'Not specified'}
- Current insurance: ${userInfo.currentInsurance || 'Not specified'}
- Preferences: ${userInfo.preferences?.join(', ') || 'None specified'}

Recent conversation context:
${conversationHistory.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Please provide a helpful, conversational response and if appropriate, recommend specific dental insurance plans from this list:
- Delta Dental PPO
- Aetna Dental PPO  
- Cigna Dental PPO
- MetLife PDP Plus
- Guardian DentalGuard Preferred
- Humana Dental PPO
- UnitedHealthcare Dental PPO

Guidelines:
1. Be conversational and helpful
2. Ask follow-up questions if you need more information
3. Only recommend specific plans if the user is asking for recommendations
4. Explain why each recommended plan fits their needs
5. Keep responses concise but informative
6. If you don't have enough information, ask clarifying questions

Respond naturally as if you're having a conversation with a friend who needs dental insurance advice.
`

  const result = await generateObject({
    model: 'gemini-1.5-flash',
    prompt: prompt,
    schema: ChatRecommendationSchema,
    config: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  })

  return result.output
}
