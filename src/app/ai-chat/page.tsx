import { AIChatInterface } from '@/components/ai/ai-chat-interface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, MessageCircle, Brain, Zap } from 'lucide-react'

export const metadata = {
  title: "AI Dental Advisor | Tooth Fairy",
  description: "Chat with our AI to get personalized dental insurance recommendations.",
};

export default function AIChatPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">AI Dental Advisor</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get personalized dental insurance recommendations through our intelligent AI assistant. 
          Ask questions, share your needs, and discover the perfect plan for you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI
              </CardTitle>
              <CardDescription>
                Start a conversation to get personalized dental insurance recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIChatInterface />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Features */}
        <div className="space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-start">
                  <Zap className="h-3 w-3 mr-2" />
                  Personalized Recommendations
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Get plans tailored to your specific needs and budget
                </p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-start">
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Natural Conversation
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Chat naturally - no forms or complex questionnaires
                </p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-start">
                  <Brain className="h-3 w-3 mr-2" />
                  Smart Analysis
                </Badge>
                <p className="text-sm text-muted-foreground">
                  AI analyzes your needs to find the best matches
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Share your situation</p>
                <p className="text-xs text-muted-foreground">
                  "I'm 28, live in California, and need coverage for regular checkups"
                </p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Ask about specific needs</p>
                <p className="text-xs text-muted-foreground">
                  "What's the best plan for orthodontic treatment?"
                </p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Compare options</p>
                <p className="text-xs text-muted-foreground">
                  "Show me plans under $50/month with good coverage"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Popular Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                "What's the best dental plan for families?"
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                "How much does dental insurance cost?"
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                "What's covered in a typical plan?"
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                "Are there waiting periods?"
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded text-sm">
                "Can I keep my current dentist?"
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Start a Conversation</h3>
              <p className="text-sm text-muted-foreground">
                Tell our AI about your dental insurance needs, budget, and preferences
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your needs and searches through available plans
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Get Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Receive personalized plan recommendations with detailed explanations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
