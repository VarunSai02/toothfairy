'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

export function SupabaseDebug() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setConnectionStatus('error')
          setError(error.message)
        } else {
          setConnectionStatus('connected')
          setError(null)
        }
      } catch (err) {
        setConnectionStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    checkConnection()
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-3 shadow-lg text-xs">
      <div className="font-semibold mb-1">Supabase Connection:</div>
      <div className={`flex items-center gap-2 ${
        connectionStatus === 'connected' ? 'text-green-600' : 
        connectionStatus === 'error' ? 'text-red-600' : 
        'text-yellow-600'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' : 
          connectionStatus === 'error' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`} />
        {connectionStatus === 'checking' && 'Checking...'}
        {connectionStatus === 'connected' && 'Connected'}
        {connectionStatus === 'error' && 'Error'}
      </div>
      {error && (
        <div className="text-red-600 mt-1 max-w-xs break-words">
          {error}
        </div>
      )}
      <div className="mt-2 text-gray-500">
        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}
      </div>
      <div className="text-gray-500">
        Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
      </div>
    </div>
  )
}
