'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Moon, Users, Crown } from 'lucide-react'

export default function Home() {
  const [showMenu, setShowMenu] = useState(true)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative moon background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-900/10 blur-3xl -z-10" />

      {showMenu && (
        <div className="w-full max-w-md animate-in fade-in duration-500">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Moon className="w-16 h-16 text-amber-400 drop-shadow-lg" />
                <Crown className="absolute -bottom-2 -right-2 w-8 h-8 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-2 text-amber-50 tracking-tight">
              Lycan Warden
            </h1>
            <p className="text-amber-300/80 text-sm font-medium">
              Werewolf Moderator Companion
            </p>
          </div>

          {/* Description */}
          <Card className="bg-gray-900/50 border-amber-700/30 mb-8 p-6 backdrop-blur-sm">
            <p className="text-gray-300 text-sm leading-relaxed">
              Master the shadows and guide your players through a night of intrigue,
              deception, and survival. Your role as moderator shapes every moment
              of the game.
            </p>
          </Card>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Role Management
                </p>
                <p className="text-xs text-gray-400">
                  Assign and track player roles
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Moon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Phase Management
                </p>
                <p className="text-xs text-gray-400">
                  Guide night, day, and voting phases
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Crown className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-100">
                  Victory Tracking
                </p>
                <p className="text-xs text-gray-400">
                  Monitor win conditions in real-time
                </p>
              </div>
            </div>
          </div>

          {/* Main Actions */}
          <div className="space-y-3 mb-6">
            <Link href="/new-game" className="block">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-amber-950 font-semibold py-6 text-base">
                New Game
              </Button>
            </Link>
            <Link href="/continue" className="block">
              <Button
                variant="outline"
                className="w-full border-amber-700/50 text-amber-100 hover:bg-amber-900/20 py-6 text-base"
              >
                Continue Game
              </Button>
            </Link>
          </div>

          {/* Settings & Info */}
          <div className="flex gap-3">
            <Link href="/settings" className="flex-1">
              <Button
                variant="ghost"
                className="w-full text-gray-400 hover:text-amber-100 hover:bg-gray-800/50 text-sm"
              >
                Settings
              </Button>
            </Link>
            <Link href="/help" className="flex-1">
              <Button
                variant="ghost"
                className="w-full text-gray-400 hover:text-amber-100 hover:bg-gray-800/50 text-sm"
              >
                Guide
              </Button>
            </Link>
          </div>

          {/* Version */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Lycan Warden v1.0
          </p>
        </div>
      )}
    </main>
  )
}
