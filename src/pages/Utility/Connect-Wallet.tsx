"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  CreditCard,
  Scan,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  User,
  Smartphone,
  ExternalLink,
  AlertCircle,
  Info,
} from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Kunjungi Website IDRX",
    description: "Buka browser dan kunjungi situs resmi IDRX untuk memulai proses registrasi",
    icon: ExternalLink,
    details: [
      "Pastikan koneksi internet stabil",
      "Gunakan browser terbaru (Chrome, Firefox, Safari)",
      'Klik tombol "Daftar" atau "Register"',
    ],
    estimatedTime: "2 menit",
    image: "/Images/Placeholder/idrx.png?height=300&width=500&text=IDRX+Website",
  },
  {
    id: 2,
    title: "Login dengan Email",
    description: "Masukkan alamat email yang valid dan buat password yang kuat",
    icon: Mail,
    details: [
      "Gunakan email yang aktif dan mudah diakses",
      "Buat password minimal 8 karakter",
      "Kombinasikan huruf besar, kecil, angka, dan simbol",
      "Verifikasi email melalui link yang dikirim",
    ],
    estimatedTime: "3 menit",
    image: "/Images/Placeholder/idrx.png?height=300&width=500&text=Email+Login+Form",
  },
  {
    id: 3,
    title: "Scan Kartu Identitas Digital",
    description: "Upload dan scan KTP atau kartu identitas digital elektronik Anda",
    icon: CreditCard,
    details: [
      "Siapkan KTP atau e-KTP dalam kondisi baik",
      "Pastikan pencahayaan cukup saat foto",
      "Posisikan kartu dalam frame yang disediakan",
      "Tunggu proses verifikasi otomatis",
    ],
    estimatedTime: "5 menit",
    image: "/Images/Placeholder/idrx.png?height=300&width=500&text=ID+Card+Scanner",
  },
  {
    id: 4,
    title: "Verifikasi Wajah (Face Scan)",
    description: "Lakukan pemindaian wajah untuk verifikasi biometrik",
    icon: Scan,
    details: [
      "Pastikan wajah terlihat jelas di kamera",
      "Hindari penggunaan kacamata atau masker",
      "Ikuti instruksi gerakan kepala yang diminta",
      "Proses akan otomatis mencocokkan dengan foto KTP",
    ],
    estimatedTime: "3 menit",
    image: "/Images/Placeholder/idrx.png?height=300&width=500&text=Face+Recognition",
  },
  {
    id: 5,
    title: "Selesai & Dapatkan Wallet",
    description: "Akun dan wallet IDRX Anda berhasil dibuat dan siap digunakan",
    icon: CheckCircle,
    details: [
      "Akun IDRX berhasil terverifikasi",
      "Wallet digital sudah aktif",
      "Dapat digunakan untuk transaksi BaikBareng",
      "Simpan informasi login dengan aman",
    ],
    estimatedTime: "1 menit",
    image: "/Images/Placeholder/idrx.png?height=300&width=500&text=Wallet+Success",
  },
]

const features = [
  {
    icon: Shield,
    title: "Keamanan Tinggi",
    description: "Dilindungi dengan enkripsi bank-grade dan verifikasi biometrik",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description: "Registrasi hanya membutuhkan waktu 10-15 menit",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Dapat diakses melalui smartphone atau desktop",
  },
  {
    icon: User,
    title: "Verifikasi KYC",
    description: "Memenuhi standar Know Your Customer Indonesia",
  },
]

export default function ConnectWalletPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Progress Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Progress Registrasi</h2>
                  <p className="text-blue-100">
                    Langkah {currentStep} dari {steps.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{Math.round((completedSteps.length / steps.length) * 100)}%</div>
                  <div className="text-blue-100">Selesai</div>
                </div>
              </div>

              <div className="flex space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      completedSteps.includes(step.id)
                        ? "bg-white"
                        : step.id === currentStep
                          ? "bg-blue-200"
                          : "bg-blue-400"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Menggunakan Wallet IDRX?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              IDRX adalah wallet digital terpercaya yang terintegrasi dengan sistem BaikBareng untuk memberikan
              pengalaman transaksi yang aman dan mudah.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step-by-Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Panduan Langkah demi Langkah</h2>
            <p className="text-gray-600">Ikuti panduan berikut untuk membuat wallet IDRX Anda</p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`overflow-hidden transition-all duration-300 ${
                    step.id === currentStep
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : completedSteps.includes(step.id)
                        ? "bg-green-50 border-green-200"
                        : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Step Content */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-3 rounded-xl ${
                              completedSteps.includes(step.id)
                                ? "bg-green-100"
                                : step.id === currentStep
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            {completedSteps.includes(step.id) ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <step.icon
                                className={`h-6 w-6 ${step.id === currentStep ? "text-blue-600" : "text-gray-600"}`}
                              />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge
                                variant={
                                  completedSteps.includes(step.id)
                                    ? "default"
                                    : step.id === currentStep
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                Langkah {step.id}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {step.estimatedTime}
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 mb-4">{step.description}</p>

                            <div className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{detail}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex space-x-3">
                              {!completedSteps.includes(step.id) && step.id === currentStep && (
                                <Button
                                  onClick={() => handleStepComplete(step.id)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Tandai Selesai
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              )}

                              <Button variant="outline" onClick={() => window.open("https://idrx.id", "_blank")}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Buka IDRX
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step Image */}
                      <div className="lg:w-96 bg-gray-50">
                        <img
                          src={step.image || "/Images/Placeholder/idrx.png"}
                          alt={step.title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <AlertCircle className="mr-2 h-5 w-5" />
                Catatan Penting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-800">
                  Pastikan data yang Anda masukkan sesuai dengan dokumen resmi
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-800">Proses verifikasi dapat memakan waktu 1-24 jam kerja</span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-800">
                  Simpan informasi login Anda dengan aman dan jangan bagikan kepada siapapun
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-800">
                  Hubungi customer service jika mengalami kesulitan dalam proses registrasi
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Message */}
        {completedSteps.length === steps.length && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Selamat! Wallet IDRX Berhasil Dibuat</h3>
                <p className="text-green-700 mb-6">
                  Anda sekarang dapat menggunakan wallet IDRX untuk bertransaksi di BaikBareng
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="/dashboard">
                    <Button className="bg-green-600 hover:bg-green-700">Kembali ke Dashboard</Button>
                  </a>
                  <a href="/bansos">
                    <Button variant="outline">Jelajahi Program</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
