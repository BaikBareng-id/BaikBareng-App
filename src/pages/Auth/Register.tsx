"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Heart, ArrowLeft, Mail, Lock, User, Phone, MapPin } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-1/3 left-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-orange-200 dark:bg-orange-800 rounded-full opacity-15 animate-float-fast"></div>
        <div className="absolute bottom-1/3 left-1/5 w-36 h-36 bg-green-300 dark:bg-green-700 rounded-full opacity-25 animate-float-slow"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 opacity-20 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 opacity-30 rotate-12 animate-pulse"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-r from-green-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/5 right-1/5 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
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
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-20">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bergabung dengan BaikBareng</h1>
            <p className="text-gray-600 dark:text-gray-300">Daftar untuk mengakses bantuan sosial</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 animate-fade-in-up delay-100">
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 transition-colors ${
                  currentStep >= 2 ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Informasi Pribadi</span>
              <span>Keamanan Akun</span>
            </div>
          </div>

          {/* Register Card */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-0 shadow-2xl animate-fade-in-up delay-200">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                Daftar Akun Baru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300 font-medium">
                        Nama Lengkap
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Masukkan nama lengkap"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
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

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                        Nomor Telepon
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 dark:text-gray-300 font-medium">
                        Alamat
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Alamat lengkap"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Lanjutkan
                    </Button>
                  </div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    {/* Password */}
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
                          placeholder="Minimal 8 karakter"
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

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                        Konfirmasi Kata Sandi
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Ulangi kata sandi"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                          required
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          Saya menyetujui{" "}
                          <a href="/terms" className="text-green-600 dark:text-green-400 hover:underline">
                            Syarat & Ketentuan
                          </a>{" "}
                          dan{" "}
                          <a href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">
                            Kebijakan Privasi
                          </a>{" "}
                          BaikBareng
                        </span>
                      </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                      >
                        Kembali
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.agreeToTerms}
                        className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Mendaftar...</span>
                          </div>
                        ) : (
                          "Daftar"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Login a */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Sudah punya akun? </span>
                  <a
                    href="/login"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                  >
                    Masuk di sini
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
