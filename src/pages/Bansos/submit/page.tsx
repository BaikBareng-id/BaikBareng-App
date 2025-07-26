/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Users,
  Home,
  DollarSign,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Save,
  X,
  ArrowRight,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useParams } from "react-router"

interface FormData {
  // Personal Information
  fullName: string
  nik: string
  birthPlace: string
  birthDate: string
  gender: string
  religion: string
  maritalStatus: string

  // Contact Information
  email: string
  phone: string
  address: string
  village: string
  district: string
  city: string
  province: string
  postalCode: string

  // Family Information
  familyMembers: number
  dependents: number
  pregnantMother: boolean
  childrenUnder6: number
  schoolAgeChildren: number
  elderlyMembers: number
  disabledMembers: number

  // Economic Information
  monthlyIncome: string
  occupation: string
  employmentStatus: string
  hasAssets: boolean
  assetDetails: string

  // Housing Information
  housingStatus: string
  housingType: string
  electricityAccess: boolean
  waterAccess: boolean
  sanitationAccess: boolean

  // Additional Information
  previousBeneficiary: boolean
  previousPrograms: string
  specialNeeds: string
  bankAccount: string
  bankName: string

  // Documents
  documents: {
    ktp: File | null
    kk: File | null
    sktm: File | null
    birthCertificate: File | null
    marriageCertificate: File | null
    incomeStatement: File | null
    bankStatement: File | null
    photo: File | null
  }

  // Agreement
  agreement: boolean
  dataConsent: boolean
}

const initialFormData: FormData = {
  fullName: "",
  nik: "",
  birthPlace: "",
  birthDate: "",
  gender: "",
  religion: "",
  maritalStatus: "",
  email: "",
  phone: "",
  address: "",
  village: "",
  district: "",
  city: "",
  province: "",
  postalCode: "",
  familyMembers: 1,
  dependents: 0,
  pregnantMother: false,
  childrenUnder6: 0,
  schoolAgeChildren: 0,
  elderlyMembers: 0,
  disabledMembers: 0,
  monthlyIncome: "",
  occupation: "",
  employmentStatus: "",
  hasAssets: false,
  assetDetails: "",
  housingStatus: "",
  housingType: "",
  electricityAccess: false,
  waterAccess: false,
  sanitationAccess: false,
  previousBeneficiary: false,
  previousPrograms: "",
  specialNeeds: "",
  bankAccount: "",
  bankName: "",
  documents: {
    ktp: null,
    kk: null,
    sktm: null,
    birthCertificate: null,
    marriageCertificate: null,
    incomeStatement: null,
    bankStatement: null,
    photo: null,
  },
  agreement: false,
  dataConsent: false,
}

const sections = [
  { id: "personal", title: "Data Pribadi", icon: User },
  { id: "contact", title: "Informasi Kontak", icon: Phone },
  { id: "family", title: "Data Keluarga", icon: Users },
  { id: "economic", title: "Kondisi Ekonomi", icon: DollarSign },
  { id: "housing", title: "Kondisi Tempat Tinggal", icon: Home },
  { id: "additional", title: "Informasi Tambahan", icon: FileText },
  { id: "documents", title: "Dokumen Pendukung", icon: Upload },
  { id: "confirmation", title: "Konfirmasi", icon: CheckCircle },
]

const requiredDocuments = [
  { key: "ktp", label: "KTP Elektronik", required: true },
  { key: "kk", label: "Kartu Keluarga", required: true },
  { key: "sktm", label: "Surat Keterangan Tidak Mampu", required: true },
  { key: "birthCertificate", label: "Akta Kelahiran Anak", required: false },
  { key: "marriageCertificate", label: "Akta Nikah", required: false },
  { key: "incomeStatement", label: "Surat Keterangan Penghasilan", required: false },
  { key: "bankStatement", label: "Rekening Koran Bank", required: false },
  { key: "photo", label: "Foto Terbaru 4x6", required: true },
]

export default function BansosSubmitPage() {

  const { id } = useParams<{ id: string }>();
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const progress = ((currentSection + 1) / sections.length) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [documentType]: file },
    }))
  }

  const validateSection = (sectionIndex: number) => {
    const newErrors: Record<string, string> = {}

    switch (sectionIndex) {
      case 0: // Personal
        if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi"
        if (!formData.nik) newErrors.nik = "NIK wajib diisi"
        if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi"
        if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih"
        break
      case 1: // Contact
        if (!formData.email) newErrors.email = "Email wajib diisi"
        if (!formData.phone) newErrors.phone = "Nomor telepon wajib diisi"
        if (!formData.address) newErrors.address = "Alamat wajib diisi"
        break
      case 6: // Documents
        if (!formData.documents.ktp) newErrors.ktp = "KTP wajib diupload"
        if (!formData.documents.kk) newErrors.kk = "Kartu Keluarga wajib diupload"
        if (!formData.documents.sktm) newErrors.sktm = "SKTM wajib diupload"
        if (!formData.documents.photo) newErrors.photo = "Foto wajib diupload"
        break
      case 7: // Confirmation
        if (!formData.agreement) newErrors.agreement = "Persetujuan wajib dicentang"
        if (!formData.dataConsent) newErrors.dataConsent = "Persetujuan data wajib dicentang"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!validateSection(currentSection)) return

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
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Aplikasi Berhasil Dikirim!</h2>
              <p className="text-gray-600 mb-6">
                Terima kasih telah mengajukan aplikasi. Kami akan memproses aplikasi Anda dalam 2-4 minggu.
              </p>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <a href="/dashboard">Kembali ke Dashboard</a>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href={`/bansos/${id}`}>Lihat Detail Program</a>
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
        {/* Progress Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Formulir Aplikasi Bantuan</h1>
            <p className="text-gray-600">Lengkapi semua informasi yang diperlukan dengan benar</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Langkah {currentSection + 1} dari {sections.length}
              </span>
              <span>{Math.round(progress)}% Selesai</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 justify-center">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => index <= currentSection && setCurrentSection(index)}
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    index === currentSection
                      ? "bg-green-500 text-white"
                      : index < currentSection
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  } ${index <= currentSection ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"}`}
                  disabled={index > currentSection}
                >
                  <section.icon className="h-3 w-3 mr-1" />
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {React.createElement(sections[currentSection].icon, { className: "h-5 w-5 mr-2" })}
                  {sections[currentSection].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Personal Information */}
                    {currentSection === 0 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Nama Lengkap *</Label>
                            <Input
                              id="fullName"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              className={errors.fullName ? "border-red-500" : ""}
                              placeholder="Masukkan nama lengkap sesuai KTP"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                          </div>
                          <div>
                            <Label htmlFor="nik">NIK *</Label>
                            <Input
                              id="nik"
                              value={formData.nik}
                              onChange={(e) => handleInputChange("nik", e.target.value)}
                              className={errors.nik ? "border-red-500" : ""}
                              placeholder="16 digit NIK"
                              maxLength={16}
                            />
                            {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="birthPlace">Tempat Lahir</Label>
                            <Input
                              id="birthPlace"
                              value={formData.birthPlace}
                              onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                              placeholder="Kota tempat lahir"
                            />
                          </div>
                          <div>
                            <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                            <Input
                              id="birthDate"
                              type="date"
                              value={formData.birthDate}
                              onChange={(e) => handleInputChange("birthDate", e.target.value)}
                              className={errors.birthDate ? "border-red-500" : ""}
                            />
                            {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="gender">Jenis Kelamin *</Label>
                            <Select
                              value={formData.gender}
                              onValueChange={(value) => handleInputChange("gender", value)}
                            >
                              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                                <SelectValue placeholder="Pilih jenis kelamin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="L">Laki-laki</SelectItem>
                                <SelectItem value="P">Perempuan</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                          </div>
                          <div>
                            <Label htmlFor="religion">Agama</Label>
                            <Select
                              value={formData.religion}
                              onValueChange={(value) => handleInputChange("religion", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih agama" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="islam">Islam</SelectItem>
                                <SelectItem value="kristen">Kristen</SelectItem>
                                <SelectItem value="katolik">Katolik</SelectItem>
                                <SelectItem value="hindu">Hindu</SelectItem>
                                <SelectItem value="buddha">Buddha</SelectItem>
                                <SelectItem value="konghucu">Konghucu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="maritalStatus">Status Pernikahan</Label>
                            <Select
                              value={formData.maritalStatus}
                              onValueChange={(value) => handleInputChange("maritalStatus", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Status pernikahan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Belum Menikah</SelectItem>
                                <SelectItem value="married">Menikah</SelectItem>
                                <SelectItem value="divorced">Cerai</SelectItem>
                                <SelectItem value="widowed">Janda/Duda</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    {currentSection === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className={errors.email ? "border-red-500" : ""}
                              placeholder="email@example.com"
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
                              placeholder="08xxxxxxxxxx"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">Alamat Lengkap *</Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className={errors.address ? "border-red-500" : ""}
                            placeholder="Masukkan alamat lengkap sesuai KTP"
                            rows={3}
                          />
                          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="village">Desa/Kelurahan</Label>
                            <Input
                              id="village"
                              value={formData.village}
                              onChange={(e) => handleInputChange("village", e.target.value)}
                              placeholder="Nama desa/kelurahan"
                            />
                          </div>
                          <div>
                            <Label htmlFor="district">Kecamatan</Label>
                            <Input
                              id="district"
                              value={formData.district}
                              onChange={(e) => handleInputChange("district", e.target.value)}
                              placeholder="Nama kecamatan"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Kota/Kabupaten</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              placeholder="Nama kota/kabupaten"
                            />
                          </div>
                          <div>
                            <Label htmlFor="province">Provinsi</Label>
                            <Input
                              id="province"
                              value={formData.province}
                              onChange={(e) => handleInputChange("province", e.target.value)}
                              placeholder="Nama provinsi"
                            />
                          </div>
                        </div>

                        <div className="max-w-xs">
                          <Label htmlFor="postalCode">Kode Pos</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange("postalCode", e.target.value)}
                            placeholder="12345"
                            maxLength={5}
                          />
                        </div>
                      </div>
                    )}

                    {/* Family Information */}
                    {currentSection === 2 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="familyMembers">Jumlah Anggota Keluarga</Label>
                            <Input
                              id="familyMembers"
                              type="number"
                              min="1"
                              value={formData.familyMembers}
                              onChange={(e) => handleInputChange("familyMembers", Number.parseInt(e.target.value) || 1)}
                              placeholder="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dependents">Jumlah Tanggungan</Label>
                            <Input
                              id="dependents"
                              type="number"
                              min="0"
                              value={formData.dependents}
                              onChange={(e) => handleInputChange("dependents", Number.parseInt(e.target.value) || 0)}
                              placeholder="0"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="pregnantMother"
                              checked={formData.pregnantMother}
                              onCheckedChange={(checked) => handleInputChange("pregnantMother", checked)}
                            />
                            <Label htmlFor="pregnantMother">Ada ibu hamil/menyusui</Label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="childrenUnder6">Anak Usia 0-6 Tahun</Label>
                            <Input
                              id="childrenUnder6"
                              type="number"
                              min="0"
                              value={formData.childrenUnder6}
                              onChange={(e) =>
                                handleInputChange("childrenUnder6", Number.parseInt(e.target.value) || 0)
                              }
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="schoolAgeChildren">Anak Usia Sekolah</Label>
                            <Input
                              id="schoolAgeChildren"
                              type="number"
                              min="0"
                              value={formData.schoolAgeChildren}
                              onChange={(e) =>
                                handleInputChange("schoolAgeChildren", Number.parseInt(e.target.value) || 0)
                              }
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="elderlyMembers">Anggota Lansia (60+)</Label>
                            <Input
                              id="elderlyMembers"
                              type="number"
                              min="0"
                              value={formData.elderlyMembers}
                              onChange={(e) =>
                                handleInputChange("elderlyMembers", Number.parseInt(e.target.value) || 0)
                              }
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="disabledMembers">Anggota Disabilitas</Label>
                            <Input
                              id="disabledMembers"
                              type="number"
                              min="0"
                              value={formData.disabledMembers}
                              onChange={(e) =>
                                handleInputChange("disabledMembers", Number.parseInt(e.target.value) || 0)
                              }
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Economic Information */}
                    {currentSection === 3 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="monthlyIncome">Penghasilan Bulanan</Label>
                            <Select
                              value={formData.monthlyIncome}
                              onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih range penghasilan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-500000">Kurang dari Rp 500.000</SelectItem>
                                <SelectItem value="500000-1000000">Rp 500.000 - Rp 1.000.000</SelectItem>
                                <SelectItem value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</SelectItem>
                                <SelectItem value="2000000+">Lebih dari Rp 2.000.000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="occupation">Pekerjaan</Label>
                            <Input
                              id="occupation"
                              value={formData.occupation}
                              onChange={(e) => handleInputChange("occupation", e.target.value)}
                              placeholder="Jenis pekerjaan"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="employmentStatus">Status Pekerjaan</Label>
                          <Select
                            value={formData.employmentStatus}
                            onValueChange={(value) => handleInputChange("employmentStatus", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status pekerjaan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unemployed">Tidak Bekerja</SelectItem>
                              <SelectItem value="informal">Pekerja Informal</SelectItem>
                              <SelectItem value="formal">Pekerja Formal</SelectItem>
                              <SelectItem value="entrepreneur">Wirausaha</SelectItem>
                              <SelectItem value="farmer">Petani/Nelayan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hasAssets"
                              checked={formData.hasAssets}
                              onCheckedChange={(checked) => handleInputChange("hasAssets", checked)}
                            />
                            <Label htmlFor="hasAssets">Memiliki aset (tanah, kendaraan, dll)</Label>
                          </div>

                          {formData.hasAssets && (
                            <div>
                              <Label htmlFor="assetDetails">Detail Aset</Label>
                              <Textarea
                                id="assetDetails"
                                value={formData.assetDetails}
                                onChange={(e) => handleInputChange("assetDetails", e.target.value)}
                                placeholder="Sebutkan aset yang dimiliki"
                                rows={3}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Housing Information */}
                    {currentSection === 4 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="housingStatus">Status Tempat Tinggal</Label>
                            <Select
                              value={formData.housingStatus}
                              onValueChange={(value) => handleInputChange("housingStatus", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih status tempat tinggal" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="owned">Milik Sendiri</SelectItem>
                                <SelectItem value="rented">Sewa/Kontrak</SelectItem>
                                <SelectItem value="family">Milik Keluarga</SelectItem>
                                <SelectItem value="other">Lainnya</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="housingType">Jenis Tempat Tinggal</Label>
                            <Select
                              value={formData.housingType}
                              onValueChange={(value) => handleInputChange("housingType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis tempat tinggal" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="permanent">Rumah Permanen</SelectItem>
                                <SelectItem value="semi-permanent">Semi Permanen</SelectItem>
                                <SelectItem value="temporary">Tidak Permanen</SelectItem>
                                <SelectItem value="apartment">Apartemen/Rusun</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Akses Fasilitas</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="electricityAccess"
                                checked={formData.electricityAccess}
                                onCheckedChange={(checked) => handleInputChange("electricityAccess", checked)}
                              />
                              <Label htmlFor="electricityAccess">Akses Listrik</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="waterAccess"
                                checked={formData.waterAccess}
                                onCheckedChange={(checked) => handleInputChange("waterAccess", checked)}
                              />
                              <Label htmlFor="waterAccess">Akses Air Bersih</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="sanitationAccess"
                                checked={formData.sanitationAccess}
                                onCheckedChange={(checked) => handleInputChange("sanitationAccess", checked)}
                              />
                              <Label htmlFor="sanitationAccess">Sanitasi Layak</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional Information */}
                    {currentSection === 5 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="previousBeneficiary"
                              checked={formData.previousBeneficiary}
                              onCheckedChange={(checked) => handleInputChange("previousBeneficiary", checked)}
                            />
                            <Label htmlFor="previousBeneficiary">Pernah menerima bantuan sosial sebelumnya</Label>
                          </div>

                          {formData.previousBeneficiary && (
                            <div>
                              <Label htmlFor="previousPrograms">Program Bantuan Sebelumnya</Label>
                              <Textarea
                                id="previousPrograms"
                                value={formData.previousPrograms}
                                onChange={(e) => handleInputChange("previousPrograms", e.target.value)}
                                placeholder="Sebutkan program bantuan yang pernah diterima"
                                rows={3}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="specialNeeds">Kebutuhan Khusus</Label>
                          <Textarea
                            id="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
                            placeholder="Jelaskan jika ada kebutuhan khusus atau kondisi tertentu"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bankAccount">Nomor Rekening</Label>
                            <Input
                              id="bankAccount"
                              value={formData.bankAccount}
                              onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                              placeholder="Nomor rekening bank"
                            />
                          </div>
                          <div>
                            <Label htmlFor="bankName">Nama Bank</Label>
                            <Select
                              value={formData.bankName}
                              onValueChange={(value) => handleInputChange("bankName", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih bank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bri">Bank BRI</SelectItem>
                                <SelectItem value="bni">Bank BNI</SelectItem>
                                <SelectItem value="mandiri">Bank Mandiri</SelectItem>
                                <SelectItem value="bca">Bank BCA</SelectItem>
                                <SelectItem value="btn">Bank BTN</SelectItem>
                                <SelectItem value="other">Bank Lainnya</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    {currentSection === 6 && (
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Petunjuk Upload Dokumen</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Format file: JPG, PNG, atau PDF</li>
                            <li>• Ukuran maksimal: 5MB per file</li>
                            <li>• Pastikan dokumen terlihat jelas dan tidak buram</li>
                            <li>• Dokumen harus masih berlaku</li>
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
                                    <div className="flex justify-center space-x-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleFileUpload(doc.key, null)}
                                      >
                                        <X className="h-3 w-3 mr-1" />
                                        Hapus
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                                    <p className="text-sm text-gray-600">Klik untuk upload {doc.label.toLowerCase()}</p>
                                    <input
                                      type="file"
                                      accept="image/*,.pdf"
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
                      </div>
                    )}

                    {/* Confirmation */}
                    {currentSection === 7 && (
                      <div className="space-y-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-800 mb-2">Periksa Kembali Data Anda</h4>
                          <p className="text-sm text-yellow-700">
                            Pastikan semua informasi yang Anda berikan sudah benar dan lengkap sebelum mengirim
                            aplikasi.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="agreement"
                              checked={formData.agreement}
                              onCheckedChange={(checked) => handleInputChange("agreement", checked)}
                              className={errors.agreement ? "border-red-500" : ""}
                            />
                            <div className="space-y-1">
                              <Label htmlFor="agreement" className="text-sm">
                                Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan dapat
                                dipertanggungjawabkan
                              </Label>
                              {errors.agreement && <p className="text-red-500 text-xs">{errors.agreement}</p>}
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
                                Saya memberikan persetujuan untuk pemrosesan data pribadi sesuai dengan kebijakan
                                privasi BaikBareng
                              </Label>
                              {errors.dataConsent && <p className="text-red-500 text-xs">{errors.dataConsent}</p>}
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">Langkah Selanjutnya</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Aplikasi akan diproses dalam 2-4 minggu</li>
                            <li>• Anda akan menerima notifikasi melalui email dan SMS</li>
                            <li>• Petugas mungkin akan melakukan kunjungan verifikasi</li>
                            <li>• Pantau status aplikasi melalui dashboard</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sebelumnya
                  </Button>

                  {currentSection === sections.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Mengirim Aplikasi...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Kirim Aplikasi
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600"
                    >
                      Selanjutnya
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ringkasan Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`flex items-center space-x-2 text-xs ${
                        index === currentSection
                          ? "text-green-600 font-medium"
                          : index < currentSection
                            ? "text-green-600"
                            : "text-gray-400"
                      }`}
                    >
                      {index < currentSection ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : index === currentSection ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <span>{section.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-600">Jika Anda mengalami kesulitan dalam mengisi formulir, hubungi kami:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>021-3103591</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>support@baikbareng.id</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href="/contact">Hubungi Support</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-sm text-yellow-800">Catatan Penting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Pastikan semua data yang diisi benar</li>
                  <li>• Dokumen yang diupload harus jelas</li>
                  <li>• Simpan nomor referensi aplikasi</li>
                  <li>• Periksa email secara berkala</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
