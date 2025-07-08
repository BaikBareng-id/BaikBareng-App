"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-200 dark:bg-orange-800 rounded-full opacity-15 animate-float-fast"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-300 dark:bg-green-700 rounded-full opacity-25 animate-float-slow"></div>
      </div>

      {/* Back to Login Button */}
      <div className="absolute top-6 left-6 z-50">
        <a href="/login">
          <Button
            variant="ghost"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Login
          </Button>
        </a>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lupa Kata Sandi?</h1>
            <p className="text-gray-600 dark:text-gray-300">Masukkan email Anda untuk reset kata sandi</p>
          </div>

          {/* Forgot Password Card */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-0 shadow-2xl animate-fade-in-up delay-200">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengirim...</span>
                      </div>
                    ) : (
                      "Kirim a Reset"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6 animate-fade-in-up">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Terkirim!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Kami telah mengirim a reset kata sandi ke <strong>{email}</strong>. Silakan cek email Anda dan
                      ikuti instruksi yang diberikan.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tidak menerima email?</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                      Kirim Ulang
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
