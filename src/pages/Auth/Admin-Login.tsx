"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Building,
  Crown,
  ArrowRight,
  AlertCircle,
  Loader2,
  KeyRound,
  Users,
  Settings,
} from "lucide-react"

const adminFeatures = [
  {
    icon: Users,
    title: "Manajemen Pengguna",
    description: "Kelola data dan verifikasi pengguna",
  },
  {
    icon: Building,
    title: "Program Management",
    description: "Atur dan monitor program bantuan",
  },
  {
    icon: Settings,
    title: "Konfigurasi Sistem",
    description: "Pengaturan sistem dan organisasi",
  },
]

const superAdminFeatures = [
  {
    icon: Crown,
    title: "Full System Control",
    description: "Kontrol penuh atas seluruh sistem",
  },
  {
    icon: Shield,
    title: "Security Management",
    description: "Kelola keamanan dan akses sistem",
  },
  {
    icon: KeyRound,
    title: "Admin Management",
    description: "Kelola admin dan super admin lainnya",
  },
]

export default function AdminLoginPage() {
  const [activeTab, setActiveTab] = useState("admin")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    organizationCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!loginData.email) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!loginData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (loginData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    }

    if (activeTab === "admin" && !loginData.organizationCode) {
      newErrors.organizationCode = "Kode organisasi wajib diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect logic would go here
      console.log("Login attempt:", { ...loginData, type: activeTab })
    }, 2000)
  }

  const backgroundVariants = {
    admin: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    superadmin: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        variants={backgroundVariants}
        animate={activeTab}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="p-4 bg-white/20 rounded-2xl w-fit mb-6"
              >
                {activeTab === "admin" ? <Building className="h-12 w-12" /> : <Crown className="h-12 w-12" />}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                {activeTab === "admin" ? "Admin Portal" : "Super Admin Portal"}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/80 mb-8"
              >
                {activeTab === "admin"
                  ? "Kelola program bantuan sosial dan pengguna dengan mudah"
                  : "Kontrol penuh sistem BaikBareng dengan akses super admin"}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4">Fitur Utama:</h3>
              {(activeTab === "admin" ? adminFeatures : superAdminFeatures).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="backdrop-blur-xl bg-white/95 shadow-2xl border-0">
              <CardHeader className="text-center pb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mx-auto p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl w-fit mb-4"
                >
                  <Shield className="h-8 w-8 text-white" />
                </motion.div>

                <CardTitle className="text-2xl font-bold text-gray-900">Masuk ke Portal Admin</CardTitle>
                <CardDescription>Pilih jenis akses dan masukkan kredensial Anda</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="admin" className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Admin</span>
                    </TabsTrigger>
                    <TabsTrigger value="superadmin" className="flex items-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Super Admin</span>
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            value={loginData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm flex items-center space-x-1"
                            >
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.email}</span>
                            </motion.p>
                          )}
                        </div>

                        {/* Organization Code (Admin only) */}
                        <AnimatePresence>
                          {activeTab === "admin" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-2"
                            >
                              <Label htmlFor="orgCode" className="flex items-center space-x-2">
                                <Building className="h-4 w-4" />
                                <span>Kode Organisasi</span>
                              </Label>
                              <Input
                                id="orgCode"
                                type="text"
                                placeholder="ORG-12345"
                                value={loginData.organizationCode}
                                onChange={(e) => handleInputChange("organizationCode", e.target.value)}
                                className={errors.organizationCode ? "border-red-500" : ""}
                              />
                              {errors.organizationCode && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-sm flex items-center space-x-1"
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  <span>{errors.organizationCode}</span>
                                </motion.p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Password Field */}
                        <div className="space-y-2">
                          <Label htmlFor="password" className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Password</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={loginData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className={errors.password ? "border-red-500" : ""}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {errors.password && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm flex items-center space-x-1"
                            >
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.password}</span>
                            </motion.p>
                          )}
                        </div>

                        {/* Login Button */}
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Memverifikasi...
                            </>
                          ) : (
                            <>
                              Masuk sebagai {activeTab === "admin" ? "Admin" : "Super Admin"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                          <span>Koneksi aman dengan enkripsi SSL</span>
                        </div>
                      </form>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>

                {/* Footer Links */}
                <div className="pt-4 border-t text-center space-y-2">
                  <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline block">
                    Lupa password?
                  </a>
                  <a href="/" className="text-sm text-gray-600 hover:underline block">
                    Kembali ke beranda
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
