import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Moon, ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/shared/config/routes'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  showBack?: boolean
}

export function AppLayout({ children, title, showBack }: AppLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-background to-background flex flex-col">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-400 hover:text-amber-100"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-600/20 border border-amber-600/50">
                <Moon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="font-black text-amber-100 text-lg">Lycan Warden</h1>
                {title && <p className="text-xs text-gray-400 leading-none">{title}</p>}
              </div>
            </Link>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-100" asChild>
              <Link to={ROUTES.HELP}>Guide</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-100" asChild>
              <Link to={ROUTES.SETTINGS}>Settings</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <p>Lycan Warden &copy; 2024 &bull; Version 1.0.0</p>
            <div className="flex gap-4">
              <span className="hover:text-amber-400 transition cursor-pointer">Privacy</span>
              <span className="hover:text-amber-400 transition cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
