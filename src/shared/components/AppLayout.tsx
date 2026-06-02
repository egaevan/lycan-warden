'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Moon, Home, Settings } from 'lucide-react'
import { ROUTES } from '@/src/shared/constants/app'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  showHeader?: boolean
  showFooter?: boolean
}

export function AppLayout({
  children,
  title,
  showHeader = true,
  showFooter = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col">
      {showHeader && (
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href={ROUTES.HOME} className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-600/20 border border-amber-600/50">
                <Moon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="font-black text-amber-100 text-lg">
                  Lycan Warden
                </h1>
                {title && (
                  <p className="text-xs text-gray-400 leading-none">{title}</p>
                )}
              </div>
            </Link>

            <div className="flex gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-amber-100"
              >
                <Link href={ROUTES.HELP}>Guide</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-amber-100"
              >
                <Link href={ROUTES.SETTINGS}>Settings</Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {showFooter && (
        <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <p>Lycan Warden © 2024 • Version 1.0.0</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-amber-400 transition">
                  Privacy
                </a>
                <a href="#" className="hover:text-amber-400 transition">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
