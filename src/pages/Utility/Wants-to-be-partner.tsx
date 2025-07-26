/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building,
  Users,
  Globe,
  Mail,
  Phone,
  Upload,
  CheckCircle,
  Target,
  Handshake,
  Award,
  Zap,
  Shield,
  Heart,
  Briefcase,
  DollarSign,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface PartnershipFormData {
  // Organization Information
  organizationName: string
  organizationType: string
  partnershipType: string
  establishedYear: string
  registrationNumber: string
  taxNumber: string

  // Contact Information
  contactPersonName: string
  contactPersonPosition: string
  email: string
  phone: string
  website: string

  // Address Information
  address: string
  city: string
  province: string
  country: string
  postalCode: string

  // Organization Details
  organizationSize: string
  annualRevenue: string
  businessSector: string
  description: string
  mission: string
  vision: string

  // Partnership Details
  partnershipGoals: string[]
  proposedContribution: string
  expectedBenefits: string
  partnershipDuration: string
  budget: string
  targetAudience: string

  // Experience & Capabilities
  previousPartnerships: string
  relevantExperience: string
  capabilities: string[]
  certifications: string

  // Commitment & Resources
  dedicatedTeam: string
  availableResources: string
  marketingSupport: boolean
  technicalSupport: boolean
  financialContribution: boolean

  // Documents
  documents: {
    companyProfile: File | null
    registrationCertificate: File | null
    taxCertificate: File | null
    financialStatement: File | null
    portfolio: File | null
    proposal: File | null
  }

  // Agreement
  termsAgreement: boolean
  dataConsent: boolean
  marketingConsent: boolean
}

const initialFormData: PartnershipFormData = {
  organizationName: "",
  organizationType: "",
  partnershipType: "",
  establishedYear: "",
  registrationNumber: "",
  taxNumber: "",
  contactPersonName: "",
  contactPersonPosition: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  province: "",
  country: "Indonesia",
  postalCode: "",
  organizationSize: "",
  annualRevenue: "",
  businessSector: "",
  description: "",
  mission: "",
  vision: "",
  partnershipGoals: [],
  proposedContribution: "",
  expectedBenefits: "",
  partnershipDuration: "",
  budget: "",
  targetAudience: "",
  previousPartnerships: "",
  relevantExperience: "",
  capabilities: [],
  certifications: "",
  dedicatedTeam: "",
  availableResources: "",
  marketingSupport: false,
  technicalSupport: false,
  financialContribution: false,
  documents: {
    companyProfile: null,
    registrationCertificate: null,
    taxCertificate: null,
    financialStatement: null,
    portfolio: null,
    proposal: null,
  },
  termsAgreement: false,
  dataConsent: false,
  marketingConsent: false,
}

const partnershipTypes = [
  { value: "media", label: "Media Partner", icon: Globe, description: "Kerjasama dalam publikasi dan promosi" },
  { value: "ngo", label: "NGO Partner", icon: Heart, description: "Organisasi non-profit untuk program sosial" },
  { value: "sponsor", label: "Sponsor", icon: DollarSign, description: "Dukungan finansial untuk program" },
  { value: "technology", label: "Technology Partner", icon: Zap, description: "Kerjasama teknologi dan inovasi" },
  {
    value: "government",
    label: "Government Partner",
    icon: Building,
    description: "Kerjasama dengan instansi pemerintah",
  },
  { value: "corporate", label: "Corporate Partner", icon: Briefcase, description: "Kerjasama strategis perusahaan" },
]

const partnershipGoals = [
  "Meningkatkan jangkauan program bantuan sosial",
  "Mengembangkan teknologi dan inovasi",
  "Memperkuat kapasitas organisasi",
  "Meningkatkan kesadaran masyarakat",
  "Mengoptimalkan distribusi bantuan",
  "Membangun ekosistem digital",
  "Meningkatkan transparansi program",
  "Mengembangkan sumber daya manusia",
]

const capabilities = [
  "Manajemen Program",
  "Teknologi Informasi",
  "Marketing & Komunikasi",
  "Analisis Data",
  "Desain & Kreatif",
  "Keuangan & Akuntansi",
  "Hukum & Regulasi",
  "Logistik & Distribusi",
  "Pelatihan & Edukasi",
  "Penelitian & Pengembangan",
]

const requiredDocuments = [
  { key: "companyProfile", label: "Profil Perusahaan/Organisasi", required: true },
  { key: "registrationCertificate", label: "Akta Pendirian/Sertifikat Registrasi", required: true },
  { key: "taxCertificate", label: "NPWP/Sertifikat Pajak", required: false },
  { key: "financialStatement", label: "Laporan Keuangan Terakhir", required: false },
  { key: "portfolio", label: "Portfolio/Track Record", required: false },
  { key: "proposal", label: "Proposal Kerjasama", required: false },
]

export default function PartnershipPage() {
  const [formData, setFormData] = useState<PartnershipFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof PartnershipFormData] as string[]), value]
        : (prev[field as keyof PartnershipFormData] as string[]).filter((item) => item !== value),
    }))
  }

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [documentType]: file },
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.organizationName) newErrors.organizationName = "Nama organisasi wajib diisi"
    if (!formData.organizationType) newErrors.organizationType = "Jenis organisasi wajib dipilih"
    if (!formData.partnershipType) newErrors.partnershipType = "Jenis kemitraan wajib dipilih"
    if (!formData.contactPersonName) newErrors.contactPersonName = "Nama kontak person wajib diisi"
    if (!formData.email) newErrors.email = "Email wajib diisi"
    if (!formData.phone) newErrors.phone = "Nomor telepon wajib diisi"
    if (!formData.description) newErrors.description = "Deskripsi organisasi wajib diisi"
    if (!formData.proposedContribution) newErrors.proposedContribution = "Kontribusi yang diusulkan wajib diisi"
    if (!formData.documents.companyProfile) newErrors.companyProfile = "Profil perusahaan wajib diupload"
    if (!formData.documents.registrationCertificate)
      newErrors.registrationCertificate = "Sertifikat registrasi wajib diupload"
    if (!formData.termsAgreement) newErrors.termsAgreement = "Persetujuan syarat dan ketentuan wajib dicentang"
    if (!formData.dataConsent) newErrors.dataConsent = "Persetujuan pengolahan data wajib dicentang"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
          <Card className="text-center">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Handshake className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Aplikasi Kemitraan Berhasil Dikirim!</h2>
              <p className="text-gray-600 mb-6">
                Terima kasih atas minat Anda untuk bermitra dengan BaikBareng. Tim kami akan meninjau aplikasi Anda dan
                menghubungi dalam 5-7 hari kerja.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">Langkah Selanjutnya:</h3>
                <ul className="text-sm text-green-700 text-left space-y-1">
                  <li>• Tim kami akan meninjau aplikasi Anda</li>
                  <li>• Anda akan dihubungi untuk diskusi lebih lanjut</li>
                  <li>• Proses evaluasi memakan waktu 1-2 minggu</li>
                  <li>• Pantau email untuk update status aplikasi</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600"
                  asChild
                >
                  <a href="/">Kembali ke Beranda</a>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="/partners">Lihat Partner Lainnya</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-500 p-4 rounded-full">
              <Handshake className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mari Bermitra dengan BaikBareng</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Bergabunglah dengan ekosistem bantuan sosial digital terdepan di Indonesia. Bersama-sama kita wujudkan
            transparansi dan efektivitas program bantuan sosial.
          </p>
        </motion.div>

        {/* Partnership Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Jenis Kemitraan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.partnershipType === type.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => handleInputChange("partnershipType", type.value)}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      formData.partnershipType === type.value ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <type.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">{type.label}</h3>
                </div>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Organization Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Informasi Organisasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationName">Nama Organisasi *</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange("organizationName", e.target.value)}
                        className={errors.organizationName ? "border-red-500" : ""}
                        placeholder="PT. Contoh Indonesia"
                      />
                      {errors.organizationName && (
                        <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="organizationType">Jenis Organisasi *</Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) => handleInputChange("organizationType", value)}
                      >
                        <SelectTrigger className={errors.organizationType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Pilih jenis organisasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporation">Perusahaan/Korporasi</SelectItem>
                          <SelectItem value="ngo">NGO/Yayasan</SelectItem>
                          <SelectItem value="government">Instansi Pemerintah</SelectItem>
                          <SelectItem value="startup">Startup/Tech Company</SelectItem>
                          <SelectItem value="media">Media/Publisher</SelectItem>
                          <SelectItem value="educational">Institusi Pendidikan</SelectItem>
                          <SelectItem value="other">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.organizationType && (
                        <p className="text-red-500 text-xs mt-1">{errors.organizationType}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="establishedYear">Tahun Berdiri</Label>
                      <Input
                        id="establishedYear"
                        type="number"
                        min="1900"
                        max="2024"
                        value={formData.establishedYear}
                        onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationNumber">Nomor Registrasi</Label>
                      <Input
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                        placeholder="Nomor akta/sertifikat"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxNumber">NPWP</Label>
                      <Input
                        id="taxNumber"
                        value={formData.taxNumber}
                        onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                        placeholder="Nomor NPWP"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi Organisasi *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={errors.description ? "border-red-500" : ""}
                      placeholder="Jelaskan tentang organisasi Anda, bidang usaha, dan aktivitas utama"
                      rows={4}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mission">Misi Organisasi</Label>
                      <Textarea
                        id="mission"
                        value={formData.mission}
                        onChange={(e) => handleInputChange("mission", e.target.value)}
                        placeholder="Misi organisasi Anda"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vision">Visi Organisasi</Label>
                      <Textarea
                        id="vision"
                        value={formData.vision}
                        onChange={(e) => handleInputChange("vision", e.target.value)}
                        placeholder="Visi organisasi Anda"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPersonName">Nama Kontak Person *</Label>
                      <Input
                        id="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                        className={errors.contactPersonName ? "border-red-500" : ""}
                        placeholder="Nama lengkap"
                      />
                      {errors.contactPersonName && (
                        <p className="text-red-500 text-xs mt-1">{errors.contactPersonName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactPersonPosition">Jabatan</Label>
                      <Input
                        id="contactPersonPosition"
                        value={formData.contactPersonPosition}
                        onChange={(e) => handleInputChange("contactPersonPosition", e.target.value)}
                        placeholder="CEO, Director, Manager, dll"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="contact@company.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="+62 21 1234567"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Alamat kantor pusat"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Jakarta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Provinsi</Label>
                      <Input
                        id="province"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        placeholder="DKI Jakarta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Negara</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        placeholder="Indonesia"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partnership Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Handshake className="h-5 w-5 mr-2" />
                    Detail Kemitraan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Tujuan Kemitraan</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {partnershipGoals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${goal}`}
                            checked={formData.partnershipGoals.includes(goal)}
                            onCheckedChange={(checked) =>
                              handleArrayChange("partnershipGoals", goal, checked as boolean)
                            }
                          />
                          <Label htmlFor={`goal-${goal}`} className="text-sm">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="proposedContribution">Kontribusi yang Diusulkan *</Label>
                    <Textarea
                      id="proposedContribution"
                      value={formData.proposedContribution}
                      onChange={(e) => handleInputChange("proposedContribution", e.target.value)}
                      className={errors.proposedContribution ? "border-red-500" : ""}
                      placeholder="Jelaskan secara detail apa yang dapat Anda kontribusikan untuk kemitraan ini"
                      rows={4}
                    />
                    {errors.proposedContribution && (
                      <p className="text-red-500 text-xs mt-1">{errors.proposedContribution}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="expectedBenefits">Manfaat yang Diharapkan</Label>
                    <Textarea
                      id="expectedBenefits"
                      value={formData.expectedBenefits}
                      onChange={(e) => handleInputChange("expectedBenefits", e.target.value)}
                      placeholder="Jelaskan manfaat yang Anda harapkan dari kemitraan ini"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="partnershipDuration">Durasi Kemitraan</Label>
                      <Select
                        value={formData.partnershipDuration}
                        onValueChange={(value) => handleInputChange("partnershipDuration", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih durasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-months">3 Bulan</SelectItem>
                          <SelectItem value="6-months">6 Bulan</SelectItem>
                          <SelectItem value="1-year">1 Tahun</SelectItem>
                          <SelectItem value="2-years">2 Tahun</SelectItem>
                          <SelectItem value="long-term">Jangka Panjang</SelectItem>
                          <SelectItem value="project-based">Berdasarkan Proyek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Estimasi Budget</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih range budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10m">Di bawah Rp 10 Juta</SelectItem>
                          <SelectItem value="10m-50m">Rp 10 - 50 Juta</SelectItem>
                          <SelectItem value="50m-100m">Rp 50 - 100 Juta</SelectItem>
                          <SelectItem value="100m-500m">Rp 100 - 500 Juta</SelectItem>
                          <SelectItem value="above-500m">Di atas Rp 500 Juta</SelectItem>
                          <SelectItem value="non-monetary">Non-Moneter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="Siapa target audience yang ingin dijangkau?"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Experience & Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Pengalaman & Kemampuan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="previousPartnerships">Pengalaman Kemitraan Sebelumnya</Label>
                    <Textarea
                      id="previousPartnerships"
                      value={formData.previousPartnerships}
                      onChange={(e) => handleInputChange("previousPartnerships", e.target.value)}
                      placeholder="Jelaskan pengalaman kemitraan atau kolaborasi yang pernah dilakukan"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="relevantExperience">Pengalaman Relevan</Label>
                    <Textarea
                      id="relevantExperience"
                      value={formData.relevantExperience}
                      onChange={(e) => handleInputChange("relevantExperience", e.target.value)}
                      placeholder="Pengalaman yang relevan dengan program bantuan sosial atau CSR"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Kemampuan & Keahlian</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {capabilities.map((capability) => (
                        <div key={capability} className="flex items-center space-x-2">
                          <Checkbox
                            id={`capability-${capability}`}
                            checked={formData.capabilities.includes(capability)}
                            onCheckedChange={(checked) =>
                              handleArrayChange("capabilities", capability, checked as boolean)
                            }
                          />
                          <Label htmlFor={`capability-${capability}`} className="text-sm">
                            {capability}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="certifications">Sertifikasi & Penghargaan</Label>
                    <Textarea
                      id="certifications"
                      value={formData.certifications}
                      onChange={(e) => handleInputChange("certifications", e.target.value)}
                      placeholder="Sertifikasi, penghargaan, atau pengakuan yang dimiliki"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Commitment & Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Komitmen & Sumber Daya
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="dedicatedTeam">Tim Khusus</Label>
                    <Textarea
                      id="dedicatedTeam"
                      value={formData.dedicatedTeam}
                      onChange={(e) => handleInputChange("dedicatedTeam", e.target.value)}
                      placeholder="Jelaskan tim yang akan didedikasikan untuk kemitraan ini"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="availableResources">Sumber Daya yang Tersedia</Label>
                    <Textarea
                      id="availableResources"
                      value={formData.availableResources}
                      onChange={(e) => handleInputChange("availableResources", e.target.value)}
                      placeholder="Sumber daya (teknologi, infrastruktur, jaringan) yang dapat dialokasikan"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Jenis Dukungan yang Dapat Diberikan</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketingSupport"
                          checked={formData.marketingSupport}
                          onCheckedChange={(checked) => handleInputChange("marketingSupport", checked)}
                        />
                        <Label htmlFor="marketingSupport">Dukungan Marketing & Promosi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="technicalSupport"
                          checked={formData.technicalSupport}
                          onCheckedChange={(checked) => handleInputChange("technicalSupport", checked)}
                        />
                        <Label htmlFor="technicalSupport">Dukungan Teknis & Teknologi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financialContribution"
                          checked={formData.financialContribution}
                          onCheckedChange={(checked) => handleInputChange("financialContribution", checked)}
                        />
                        <Label htmlFor="financialContribution">Kontribusi Finansial</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Dokumen Pendukung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Petunjuk Upload Dokumen</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Format file: PDF, DOC, DOCX, JPG, PNG</li>
                      <li>• Ukuran maksimal: 10MB per file</li>
                      <li>• Pastikan dokumen terlihat jelas dan dapat dibaca</li>
                      <li>• Dokumen dalam bahasa Indonesia atau Inggris</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocuments.map((doc) => (
                      <div key={doc.key} className="space-y-2">
                        <Label className="flex items-center">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                            formData.documents[doc.key as keyof typeof formData.documents]
                              ? "border-green-300 bg-green-50"
                              : errors[doc.key]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {formData.documents[doc.key as keyof typeof formData.documents] ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                              <p className="text-sm text-green-700">
                                {(formData.documents[doc.key as keyof typeof formData.documents] as File)?.name}
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleFileUpload(doc.key, null)}
                              >
                                Hapus File
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                              <p className="text-sm text-gray-600">Upload {doc.label.toLowerCase()}</p>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleFileUpload(doc.key, file)
                                }}
                                className="hidden"
                                id={`file-${doc.key}`}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`file-${doc.key}`)?.click()}
                              >
                                Pilih File
                              </Button>
                            </div>
                          )}
                        </div>
                        {errors[doc.key] && <p className="text-red-500 text-xs">{errors[doc.key]}</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Agreement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Persetujuan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="termsAgreement"
                        checked={formData.termsAgreement}
                        onCheckedChange={(checked) => handleInputChange("termsAgreement", checked)}
                        className={errors.termsAgreement ? "border-red-500" : ""}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="termsAgreement" className="text-sm">
                          Saya menyetujui syarat dan ketentuan kemitraan dengan BaikBareng *
                        </Label>
                        {errors.termsAgreement && <p className="text-red-500 text-xs">{errors.termsAgreement}</p>}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="dataConsent"
                        checked={formData.dataConsent}
                        onCheckedChange={(checked) => handleInputChange("dataConsent", checked)}
                        className={errors.dataConsent ? "border-red-500" : ""}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="dataConsent" className="text-sm">
                          Saya memberikan persetujuan untuk pemrosesan data organisasi sesuai kebijakan privasi *
                        </Label>
                        {errors.dataConsent && <p className="text-red-500 text-xs">{errors.dataConsent}</p>}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => handleInputChange("marketingConsent", checked)}
                      />
                      <Label htmlFor="marketingConsent" className="text-sm">
                        Saya bersedia menerima informasi dan update terkait program kemitraan
                      </Label>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Proses Selanjutnya</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Tim kami akan meninjau aplikasi dalam 5-7 hari kerja</li>
                      <li>• Anda akan dihubungi untuk diskusi lebih lanjut</li>
                      <li>• Proses evaluasi dan negosiasi 1-2 minggu</li>
                      <li>• Penandatanganan MOU jika aplikasi disetujui</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Partnership Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Manfaat Kemitraan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Jangkauan Luas</h4>
                        <p className="text-xs text-gray-600">Akses ke jutaan penerima bantuan sosial</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Platform Terpercaya</h4>
                        <p className="text-xs text-gray-600">Sistem yang aman dan transparan</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Zap className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Inovasi Teknologi</h4>
                        <p className="text-xs text-gray-600">Teknologi terdepan untuk bantuan sosial</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Award className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Dampak Sosial</h4>
                        <p className="text-xs text-gray-600">Kontribusi nyata untuk masyarakat</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Butuh Bantuan?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600">Tim partnership kami siap membantu Anda:</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>partnership@baikbareng.id</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>021-3103591</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href="/contact">Hubungi Tim Partnership</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Success Stories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Partner Sukses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">50+</div>
                      <div className="text-xs text-gray-600">Partner Aktif</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1M+</div>
                      <div className="text-xs text-gray-600">Penerima Manfaat</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-xs text-gray-600">Tingkat Kepuasan</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 text-lg"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Mengirim Aplikasi...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Kirim Aplikasi Kemitraan
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
