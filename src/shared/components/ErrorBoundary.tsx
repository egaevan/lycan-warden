import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  handleHome = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4" role="alert">
          <Card className="bg-gray-900/50 border-gray-700 p-8 max-w-md w-full text-center space-y-4 backdrop-blur-sm">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
            <h1 className="text-2xl font-bold text-amber-100">Something went wrong</h1>
            <p className="text-sm text-gray-400">
              An unexpected error occurred. Please try again.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left text-red-300 bg-red-900/20 p-3 rounded border border-red-800/50 overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={this.handleReset}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-950"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={this.handleHome}
                variant="outline"
                className="flex-1 border-amber-700/50 text-amber-100"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
