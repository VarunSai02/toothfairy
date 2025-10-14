import { NextRequest, NextResponse } from 'next/server'
import { generateChatRecommendation } from '@/ai/flows/chat-recommendation'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Analyze the user's message to extract relevant information
    const userInfo = analyzeUserMessage(message, conversationHistory)
    
    // Generate AI response and recommendations using the new flow
    const aiResult = await generateChatRecommendation(message, userInfo, conversationHistory)
    
    return NextResponse.json({
      response: aiResult.response,
      recommendations: aiResult.recommendations || []
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function analyzeUserMessage(message: string, conversationHistory: any[]) {
  const info: any = {}
  
  // Extract age
  const ageMatch = message.match(/(\d+)\s*(?:years?\s*old|age)/i)
  if (ageMatch) {
    info.age = parseInt(ageMatch[1])
  }
  
  // Extract location
  const locationMatch = message.match(/(?:in|from|live in)\s+([A-Za-z\s,]+)/i)
  if (locationMatch) {
    info.location = locationMatch[1].trim()
  }
  
  // Extract budget
  if (message.match(/cheap|low|budget|affordable/i)) {
    info.budget = 'low'
  } else if (message.match(/expensive|premium|high|best/i)) {
    info.budget = 'high'
  } else if (message.match(/moderate|middle|average/i)) {
    info.budget = 'moderate'
  }
  
  // Extract dental needs
  if (message.match(/orthodont|braces|invisalign/i)) {
    info.dentalNeeds = 'orthodontic'
  } else if (message.match(/implant|crown|major/i)) {
    info.dentalNeeds = 'major'
  } else if (message.match(/cleaning|checkup|preventive/i)) {
    info.dentalNeeds = 'preventive'
  } else {
    info.dentalNeeds = 'general'
  }
  
  // Extract current insurance status
  if (message.match(/no insurance|uninsured|don't have/i)) {
    info.currentInsurance = 'none'
  } else if (message.match(/current|existing|have insurance/i)) {
    info.currentInsurance = 'existing'
  }
  
  // Extract preferences
  const preferences = []
  if (message.match(/network|in-network/i)) {
    preferences.push('network')
  }
  if (message.match(/no waiting|immediate/i)) {
    preferences.push('no_waiting')
  }
  if (message.match(/family|children/i)) {
    preferences.push('family')
  }
  
  info.preferences = preferences
  
  return info
}

