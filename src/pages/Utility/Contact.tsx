"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Star,
  Send,
  ChevronDown,
  ChevronUp,
  Headphones,
  Users,
  FileText,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"

const supportTeam = [
  {
    name: "Tim Customer Service",
    role: "Bantuan Umum & Pendaftaran",
    phone: "021-1234-5678",
    email: "support@baikbareng.go.id",
    hours: "Senin - Jumat: 08:00 - 17:00 WIB",
    icon: Headphones,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    name: "Tim Teknis",
    role: "Masalah Teknis & Bug Report",
    phone: "021-1234-5679",
    email: "tech@baikbareng.go.id",
    hours: "24/7 (Emergency Support)",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    name: "Tim Legal",
    role: "Pertanyaan Hukum & Kebijakan",
    phone: "021-1234-5680",
    email: "legal@baikbareng.go.id",
    hours: "Senin - Jumat: 09:00 - 16:00 WIB",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  {
    name: "Tim Program",
    role: "Informasi Program Bantuan",
    phone: "021-1234-5681",
    email: "program@baikbareng.go.id",
    hours: "Senin - Jumat: 08:00 - 17:00 WIB",
    icon: HelpCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900",
  },
]

const faqs = [
  {
    question: "Bagaimana cara mendaftar di BaikBareng?",
    answer:
      "Anda dapat mendaftar melalui website atau aplikasi mobile dengan menyiapkan KTP, KK, dan dokumen pendukung lainnya. Proses pendaftaran hanya membutuhkan waktu 5-10 menit. Setelah mendaftar, Anda akan menerima email konfirmasi dan dapat langsung mengakses dashboard untuk mengajukan bantuan sosial.",
    category: "Pendaftaran",
  },
  {
    question: "Berapa lama proses verifikasi data?",
    answer:
      "Proses verifikasi data biasanya memakan waktu 3-7 hari kerja. Tim kami akan melakukan pengecekan dokumen dan validasi data dengan database pemerintah. Anda akan mendapatkan notifikasi melalui SMS, email, dan push notification di aplikasi setelah verifikasi selesai.",
    category: "Verifikasi",
  },
  {
    question: "Apa saja program bantuan yang tersedia?",
    answer:
      "BaikBareng menyediakan akses ke berbagai program bantuan sosial seperti PKH (Program Keluarga Harapan), BPNT (Bantuan Pangan Non Tunai), BLT (Bantuan Langsung Tunai), PIP (Program Indonesia Pintar), PBI JKN (Bantuan Iuran Jaminan Kesehatan), dan program bantuan sosial lainnya sesuai dengan kriteria dan kebutuhan masing-masing.",
    category: "Program",
  },
  {
    question: "Bagaimana cara mengecek status aplikasi bantuan?",
    answer:
      "Anda dapat mengecek status aplikasi melalui dashboard akun Anda di website atau aplikasi mobile. Status akan diperbarui secara real-time dan Anda akan menerima notifikasi setiap ada perubahan status. Anda juga dapat menghubungi customer service untuk informasi lebih detail.",
    category: "Status",
  },
  {
    question: "Apakah data pribadi saya aman?",
    answer:
      "Ya, keamanan data pribadi adalah prioritas utama kami. Kami menggunakan enkripsi tingkat militer, sistem autentikasi berlapis, dan mematuhi standar keamanan internasional. Data Anda hanya digunakan untuk keperluan program bantuan sosial dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.",
    category: "Keamanan",
  },
  {
    question: "Bagaimana jika aplikasi saya ditolak?",
    answer:
      "Jika aplikasi ditolak, Anda akan menerima notifikasi dengan alasan penolakan yang jelas. Anda dapat mengajukan banding atau memperbaiki dokumen yang kurang sesuai. Tim customer service kami siap membantu Anda memahami alasan penolakan dan langkah-langkah yang perlu diambil untuk aplikasi selanjutnya.",
    category: "Penolakan",
  },
  {
    question: "Apakah ada biaya untuk menggunakan BaikBareng?",
    answer:
      "Tidak, BaikBareng adalah platform gratis yang disediakan oleh pemerintah. Tidak ada biaya pendaftaran, biaya aplikasi, atau biaya tersembunyi lainnya. Jika ada pihak yang meminta bayaran untuk menggunakan BaikBareng, segera laporkan kepada kami karena itu adalah penipuan.",
    category: "Biaya",
  },
  {
    question: "Bagaimana cara melaporkan masalah atau bug?",
    answer:
      "Anda dapat melaporkan masalah teknis melalui formulir feedback di halaman ini, menghubungi tim teknis di tech@baikbareng.go.id, atau menggunakan fitur 'Laporkan Masalah' di aplikasi. Sertakan screenshot dan deskripsi detail masalah untuk membantu kami menyelesaikan masalah dengan cepat.",
    category: "Teknis",
  },
]

const feedbackCategories = [
  "Umum",
  "Masalah Teknis",
  "Saran Perbaikan",
  "Keluhan Layanan",
  "Pujian",
  "Bug Report",
  "Fitur Baru",
  "Lainnya",
]

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
    rating: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRating = (rating: number) => {
    setFeedbackForm((prev) => ({
      ...prev,
      rating,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Support Team Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tim Support BaikBareng</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tim profesional kami siap membantu Anda 24/7 untuk semua kebutuhan terkait BaikBareng
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supportTeam.map((team, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${team.bgColor} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <team.icon className={`w-8 h-8 ${team.color}`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{team.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{team.role}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">{team.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">{team.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700 dark:text-gray-300">{team.hours}</span>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Location & Map */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <MapPin className="w-6 h-6 text-green-600 mr-2" />
                Lokasi Kantor Pusat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Kementerian Sosial RI</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Jl. Salemba Raya No. 28
                    <br />
                    Jakarta Pusat 10430
                    <br />
                    DKI Jakarta, Indonesia
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Telepon</div>
                    <div className="text-gray-600 dark:text-gray-300">021-3103591</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Fax</div>
                    <div className="text-gray-600 dark:text-gray-300">021-3103592</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-gray-600 dark:text-gray-300">info@kemsos.go.id</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Website</div>
                    <div className="text-gray-600 dark:text-gray-300">kemsos.go.id</div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sKementerian%20Sosial%20Republik%20Indonesia!5e0!3m2!1sen!2sid!4v1635123456789!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kementerian Sosial RI"
                ></iframe>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Ikuti Kami</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="p-2 bg-transparent">
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 bg-transparent">
                    <Twitter className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 bg-transparent">
                    <Instagram className="w-4 h-4 text-pink-600" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 bg-transparent">
                    <Youtube className="w-4 h-4 text-red-600" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 bg-transparent">
                    <Globe className="w-4 h-4 text-green-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <MessageCircle className="w-6 h-6 text-green-600 mr-2" />
                Feedback & Rating
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Berikan feedback Anda untuk membantu kami meningkatkan layanan
              </p>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        value={feedbackForm.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={feedbackForm.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={feedbackForm.phone}
                      onChange={handleInputChange}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={feedbackForm.category}
                      onValueChange={(value) => setFeedbackForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori feedback" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={feedbackForm.subject}
                      onChange={handleInputChange}
                      placeholder="Ringkasan feedback Anda"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={feedbackForm.message}
                      onChange={handleInputChange}
                      placeholder="Jelaskan feedback Anda secara detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rating Layanan</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(star)}
                          className={`p-1 transition-colors ${
                            star <= feedbackForm.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        {feedbackForm.rating > 0 && `${feedbackForm.rating}/5`}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengirim...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Feedback
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4 py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Terima Kasih!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Feedback Anda telah berhasil dikirim. Tim kami akan merespons dalam 24 jam.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFeedbackForm({
                        name: "",
                        email: "",
                        phone: "",
                        category: "",
                        subject: "",
                        message: "",
                        rating: 0,
                      })
                    }}
                    variant="outline"
                  >
                    Kirim Feedback Lain
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <HelpCircle className="w-6 h-6 text-green-600 mr-2" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">Temukan jawaban untuk pertanyaan umum tentang BaikBareng</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                      </div>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="animate-fade-in-up">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="mt-8 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Kontak Darurat</h3>
                <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed mb-4">
                  Untuk masalah mendesak atau darurat yang memerlukan penanganan segera, hubungi hotline darurat kami:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-red-800 dark:text-red-200">119 (24/7)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-red-800 dark:text-red-200">emergency@baikbareng.go.id</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
