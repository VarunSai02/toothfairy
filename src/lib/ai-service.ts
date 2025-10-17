import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '')

export interface ChatResponse {
  response: string
  recommendations?: Array<{
    plan: string
    reason: string
    monthlyCost: string
    coverage: string
  }>
}

export interface PlanRecommendation {
  plan: string
  reason: string
  monthlyCost: string
  coverage: string
  pros: string[]
  cons: string[]
}

export async function generateChatResponse(
  userMessage: string,
  userInfo: any,
  conversationHistory: any[]
): Promise<ChatResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

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

Please provide a helpful, conversational response. If the user is asking for specific recommendations, suggest 2-3 dental insurance plans from this list:
- Delta Dental PPO
- Aetna Dental PPO  
- Cigna Dental PPO
- MetLife PDP Plus
- Guardian DentalGuard Preferred
- Humana Dental PPO
- UnitedHealthcare Dental PPO

For each recommendation, provide:
- Plan name
- Why it fits their needs
- Estimated monthly cost
- Key coverage highlights

Guidelines:
1. Be conversational and helpful
2. Ask follow-up questions if you need more information
3. Only recommend specific plans if the user is asking for recommendations
4. Keep responses concise but informative
5. If you don't have enough information, ask clarifying questions

Respond in JSON format:
{
  "response": "Your conversational response here",
  "recommendations": [
    {
      "plan": "Plan Name",
      "reason": "Why this plan fits",
      "monthlyCost": "$XX/month",
      "coverage": "Key coverage highlights"
    }
  ]
}

If no specific recommendations are needed, omit the recommendations array.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to parse JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
    }

    // Fallback to plain text response
    return {
      response: text,
      recommendations: []
    }

  } catch (error) {
    console.error('Error generating chat response:', error)
    return {
      response: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
      recommendations: []
    }
  }
}

export async function generatePlanRecommendations(
  userInfo: {
    age?: number
    location?: string
    budget?: string
    dentalNeeds?: string
    preferences?: string[]
    currentInsurance?: string
  }
): Promise<{ recommendations: PlanRecommendation[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Netlify Functions have strict time limits. Timebox the LLM call so
    // server actions return promptly instead of hitting a 504.
    const TIMEOUT_MS = 8000
    const withTimeout = <T>(p: Promise<T>, ms: number, onTimeout: () => T): Promise<T> => {
      return new Promise<T>((resolve) => {
        let settled = false
        const timer = setTimeout(() => {
          if (settled) return
          settled = true
          resolve(onTimeout())
        }, ms)
        p.then((val) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          resolve(val)
        }).catch(() => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          // Treat errors like timeouts and fall back
          resolve(onTimeout())
        })
      })
    }

    const prompt = `
You are a dental insurance expert. Generate personalized plan recommendations based on user information.

User Information:
- Age: ${userInfo.age || 'Not specified'}
- Location: ${userInfo.location || 'Not specified'}
- Budget: ${userInfo.budget || 'Not specified'}
- Dental needs: ${userInfo.dentalNeeds || 'Not specified'}
- Current insurance: ${userInfo.currentInsurance || 'Not specified'}
- Preferences: ${userInfo.preferences?.join(', ') || 'None specified'}

Available plans:
- Delta Dental PPO
- Aetna Dental PPO  
- Cigna Dental PPO
- MetLife PDP Plus
- Guardian DentalGuard Preferred
- Humana Dental PPO
- UnitedHealthcare Dental PPO

Provide 3 personalized recommendations in JSON format:
{
  "recommendations": [
    {
      "plan": "Plan Name",
      "reason": "Why this plan fits their needs",
      "monthlyCost": "$XX/month",
      "coverage": "Key coverage highlights",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"]
    }
  ]
}
`

    const result = await withTimeout(
      model.generateContent(prompt),
      TIMEOUT_MS,
      () => ({
        // Minimal shape to satisfy downstream usage when timing out
        response: {
          text: () => JSON.stringify({
            recommendations: [
              {
                plan: 'Delta Dental PPO',
                reason: 'Comprehensive coverage with large network',
                monthlyCost: '$45/month',
                coverage: 'Preventive, basic, and major dental services',
                pros: ['Large network', 'No waiting period for preventive', 'Good coverage'],
                cons: ['Higher premium', 'Limited orthodontics'],
              },
              {
                plan: 'Aetna Dental PPO',
                reason: 'Good balance of cost and coverage',
                monthlyCost: '$35/month',
                coverage: 'Preventive and basic services',
                pros: ['Affordable', 'Good preventive coverage', 'Easy claims'],
                cons: ['Limited major coverage', 'Smaller network'],
              },
              {
                plan: 'Cigna Dental PPO',
                reason: 'Flexible options for different needs',
                monthlyCost: '$40/month',
                coverage: 'Comprehensive dental and vision',
                pros: ['Includes vision', 'Flexible plans', 'Good customer service'],
                cons: ['Higher deductibles', 'Limited orthodontics'],
              },
            ],
          })
        }
      } as any)
    )
    const response = await result.response
    const text = response.text()

    // Try to parse JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
    }

    // Fallback recommendations
    return {
      recommendations: [
        {
          plan: "Delta Dental PPO",
          reason: "Comprehensive coverage with large network",
          monthlyCost: "$45/month",
          coverage: "Preventive, basic, and major dental services",
          pros: ["Large network", "No waiting period for preventive", "Good coverage"],
          cons: ["Higher premium", "Limited orthodontics"]
        },
        {
          plan: "Aetna Dental PPO",
          reason: "Good balance of cost and coverage",
          monthlyCost: "$35/month",
          coverage: "Preventive and basic services",
          pros: ["Affordable", "Good preventive coverage", "Easy claims"],
          cons: ["Limited major coverage", "Smaller network"]
        },
        {
          plan: "Cigna Dental PPO",
          reason: "Flexible options for different needs",
          monthlyCost: "$40/month",
          coverage: "Comprehensive dental and vision",
          pros: ["Includes vision", "Flexible plans", "Good customer service"],
          cons: ["Higher deductibles", "Limited orthodontics"]
        }
      ]
    }

  } catch (error) {
    console.error('Error generating plan recommendations:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      apiKey: process.env.GOOGLE_GENAI_API_KEY ? 'Present' : 'Missing',
      model: 'gemini-2.5-flash'
    })
    return {
      recommendations: []
    }
  }
}
