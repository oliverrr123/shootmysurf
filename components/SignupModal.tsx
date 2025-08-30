"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface SignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin?: () => void
}

export function SignupModal({ open, onOpenChange, onSwitchToLogin }: SignupModalProps) {
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ fullName, email, password })
  }

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log("Google signup")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogContent className="fixed left-[50%] top-[5vh] z-50 w-full max-w-md translate-x-[-50%] bg-white rounded-3xl shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] border-0 p-0 max-h-[90vh] overflow-y-auto sm:top-[50%] sm:translate-y-[-50%]">
          <div className="relative p-8">
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </button>

            {/* Header */}
            <div className="mb-8">
              <DialogTitle className="text-3xl font-bold text-[#163F69] mb-2">
                Create your account
              </DialogTitle>
              <p className="text-lg text-[#6B7582]">
                Join us in less than a minute.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-base text-[#163F69]">
                  Full name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10 px-4 text-base rounded-lg border border-gray-200 focus:border-[#163F69] focus:ring-2 focus:ring-[#163F69]/20 transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-base text-[#163F69]">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-4 text-base rounded-lg border border-gray-200 focus:border-[#163F69] focus:ring-2 focus:ring-[#163F69]/20 transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-base text-[#163F69]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-4 text-base rounded-lg border border-gray-200 focus:border-[#163F69] focus:ring-2 focus:ring-[#163F69]/20 transition-colors"
                  required
                />
                <p className="text-sm text-gray-400">At least 8 characters</p>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-[#163F69] hover:bg-[#163F69]/90 text-white text-base rounded-full transition-colors"
              >
                Sign up
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">Or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full h-12 border border-gray-200 hover:bg-gray-50 text-gray-700 text-base font-medium rounded-full transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

                          {/* Footer */}
              <div className="mt-8">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button 
                    onClick={onSwitchToLogin}
                    className="text-[#163F69] underline font-medium"
                  >
                    Log in
                  </button>
                </p>
              </div>

            {/* Terms */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                By signing up, you agree to our{" "}
                <Link 
                  href="/terms" 
                  className="text-[#163F69] hover:underline underline"
                  onClick={() => onOpenChange(false)}
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link 
                  href="/privacy" 
                  className="text-[#163F69] hover:underline underline"
                  onClick={() => onOpenChange(false)}
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
