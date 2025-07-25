"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Heart, ArrowLeft, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router"

export default function LoginPage() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (formData.email === "user@gmail.com" && formData.password === "user123"){
      navigate("/user-dashboard")
    }
    
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-200 dark:bg-orange-800 rounded-full opacity-15 animate-float-fast"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-300 dark:bg-green-700 rounded-full opacity-25 animate-float-slow"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 opacity-20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 opacity-30 rotate-12 animate-pulse"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/5 w-64 h-64 bg-gradient-to-r from-green-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <a href="/">
          <Button
            variant="ghost"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selamat Datang Kembali</h1>
            <p className="text-gray-600 dark:text-gray-300">Masuk ke akun BaikBareng Anda</p>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-0 shadow-2xl animate-fade-in-up delay-200">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Masuk</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                    Kata Sandi
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Ingat saya</span>
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  >
                    Lupa kata sandi?
                  </a>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    "Masuk"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">atau</span>
                  </div>
                </div>

                {/* Register a */}
                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-300">Belum punya akun? </span>
                  <a
                    href="/register"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                  >
                    Daftar sekarang
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center animate-fade-in-up delay-400">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dengan masuk, Anda menyetujui{" "}
              <a href="/terms" className="text-green-600 dark:text-green-400 hover:underline">
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">
                Kebijakan Privasi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
