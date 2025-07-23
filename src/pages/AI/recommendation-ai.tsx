"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  DollarSign,
  Star,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react"

interface FormData {
  // Personal Information
  fullName: string
  age: string
  gender: string
  maritalStatus: string
  phoneNumber: string
  email: string

  // Location Information
  province: string
  city: string
  district: string
  village: string
  address: string
  postalCode: string

  // Family Information
  familySize: string
  dependents: string
  childrenCount: string
  elderlyCount: string
  disabledMembers: string
  pregnantMembers: string

  // Economic Information
  monthlyIncome: string
  employmentStatus: string
  occupation: string
  hasAssets: string
  assetDetails: string
  monthlyExpenses: string

  // Education Information
  educationLevel: string
  childrenInSchool: string
  educationExpenses: string

  // Health Information
  healthCondition: string
  chronicIllness: string
  healthcareAccess: string
  healthExpenses: string

  // Housing Information
  housingStatus: string
  housingCondition: string
  utilities: string

  // Previous Program History
  previousPrograms: string
  programExperience: string

  // Special Circumstances
  emergencyNeeds: string
  priorityNeeds: string
  additionalInfo: string
}

interface Recommendation {
  id: string
  title: string
  category: string
  confidence: number
  matchReason: string
  benefits: string[]
  eligibilityMatch: number
  estimatedAmount: string
  processingTime: string
  organization: string
}

export default function AIRecommendationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    gender: "",
    maritalStatus: "",
    phoneNumber: "",
    email: "",
    province: "",
    city: "",
    district: "",
    village: "",
    address: "",
    postalCode: "",
    familySize: "",
    dependents: "",
    childrenCount: "",
    elderlyCount: "",
    disabledMembers: "",
    pregnantMembers: "",
    monthlyIncome: "",
    employmentStatus: "",
    occupation: "",
    hasAssets: "",
    assetDetails: "",
    monthlyExpenses: "",
    educationLevel: "",
    childrenInSchool: "",
    educationExpenses: "",
    healthCondition: "",
    chronicIllness: "",
    healthcareAccess: "",
    healthExpenses: "",
    housingStatus: "",
    housingCondition: "",
    utilities: "",
    previousPrograms: "",
    programExperience: "",
    emergencyNeeds: "",
    priorityNeeds: "",
    additionalInfo: "",
  })

  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const totalSteps = 8

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock AI recommendations based on form data
    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        title: "Program Keluarga Harapan (PKH)",
        category: "Bantuan Tunai",
        confidence: 95,
        matchReason: "Sangat cocok berdasarkan jumlah keluarga, pendapatan, dan kebutuhan pendidikan anak",
        benefits: ["Bantuan tunai bulanan", "Dukungan pendidikan", "Akses kesehatan"],
        eligibilityMatch: 98,
        estimatedAmount: "Rp 750.000 - Rp 1.200.000/bulan",
        processingTime: "2-4 minggu",
        organization: "Kementerian Sosial RI",
      },
      {
        id: "2",
        title: "Bantuan Pangan Non Tunai (BPNT)",
        category: "Bantuan Pangan",
        confidence: 88,
        matchReason: "Sesuai dengan kondisi ekonomi dan kebutuhan pangan keluarga",
        benefits: ["Bantuan pangan elektronik", "Akses ke pasar modern", "Nutrisi terjamin"],
        eligibilityMatch: 92,
        estimatedAmount: "Rp 200.000/bulan",
        processingTime: "1-2 minggu",
        organization: "Kementerian Sosial RI",
      },
      {
        id: "3",
        title: "Kartu Indonesia Pintar (KIP)",
        category: "Bantuan Pendidikan",
        confidence: 82,
        matchReason: "Cocok untuk mendukung pendidikan anak-anak dalam keluarga",
        benefits: ["Biaya sekolah gratis", "Bantuan seragam", "Akses pendidikan berkualitas"],
        eligibilityMatch: 85,
        estimatedAmount: "Rp 450.000 - Rp 1.000.000/tahun",
        processingTime: "3-6 minggu",
        organization: "Kemendikbud RI",
      },
    ]

    setRecommendations(mockRecommendations)
    setIsLoading(false)
    setShowResults(true)
  }

  const resetForm = () => {
    setShowResults(false)
    setCurrentStep(1)
    setFormData({
      fullName: "",
      age: "",
      gender: "",
      maritalStatus: "",
      phoneNumber: "",
      email: "",
      province: "",
      city: "",
      district: "",
      village: "",
      address: "",
      postalCode: "",
      familySize: "",
      dependents: "",
      childrenCount: "",
      elderlyCount: "",
      disabledMembers: "",
      pregnantMembers: "",
      monthlyIncome: "",
      employmentStatus: "",
      occupation: "",
      hasAssets: "",
      assetDetails: "",
      monthlyExpenses: "",
      educationLevel: "",
      childrenInSchool: "",
      educationExpenses: "",
      healthCondition: "",
      chronicIllness: "",
      healthcareAccess: "",
      healthExpenses: "",
      housingStatus: "",
      housingCondition: "",
      utilities: "",
      previousPrograms: "",
      programExperience: "",
      emergencyNeeds: "",
      priorityNeeds: "",
      additionalInfo: "",
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Informasi Pribadi
              </CardTitle>
              <CardDescription>Masukkan informasi dasar tentang diri Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Usia *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Masukkan usia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Status Pernikahan *</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status pernikahan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="belum-menikah">Belum Menikah</SelectItem>
                      <SelectItem value="menikah">Menikah</SelectItem>
                      <SelectItem value="cerai">Cerai</SelectItem>
                      <SelectItem value="janda-duda">Janda/Duda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Nomor Telepon *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Masukkan email (opsional)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Informasi Lokasi
              </CardTitle>
              <CardDescription>Masukkan informasi tempat tinggal Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi *</Label>
                  <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jawa-barat">Jawa Barat</SelectItem>
                      <SelectItem value="jawa-tengah">Jawa Tengah</SelectItem>
                      <SelectItem value="jawa-timur">Jawa Timur</SelectItem>
                      <SelectItem value="dki-jakarta">DKI Jakarta</SelectItem>
                      <SelectItem value="banten">Banten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Kota/Kabupaten *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Masukkan kota/kabupaten"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">Kecamatan *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="Masukkan kecamatan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Kelurahan/Desa *</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                    placeholder="Masukkan kelurahan/desa"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="Masukkan kode pos"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Informasi Keluarga
              </CardTitle>
              <CardDescription>Masukkan informasi tentang anggota keluarga Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familySize">Jumlah Anggota Keluarga *</Label>
                  <Input
                    id="familySize"
                    type="number"
                    value={formData.familySize}
                    onChange={(e) => handleInputChange("familySize", e.target.value)}
                    placeholder="Masukkan jumlah anggota keluarga"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents">Jumlah Tanggungan *</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={formData.dependents}
                    onChange={(e) => handleInputChange("dependents", e.target.value)}
                    placeholder="Masukkan jumlah tanggungan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childrenCount">Jumlah Anak</Label>
                  <Input
                    id="childrenCount"
                    type="number"
                    value={formData.childrenCount}
                    onChange={(e) => handleInputChange("childrenCount", e.target.value)}
                    placeholder="Masukkan jumlah anak"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="elderlyCount">Jumlah Lansia</Label>
                  <Input
                    id="elderlyCount"
                    type="number"
                    value={formData.elderlyCount}
                    onChange={(e) => handleInputChange("elderlyCount", e.target.value)}
                    placeholder="Masukkan jumlah lansia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabledMembers">Anggota Keluarga Disabilitas</Label>
                  <Input
                    id="disabledMembers"
                    type="number"
                    value={formData.disabledMembers}
                    onChange={(e) => handleInputChange("disabledMembers", e.target.value)}
                    placeholder="Masukkan jumlah anggota disabilitas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pregnantMembers">Anggota Keluarga Hamil</Label>
                  <Input
                    id="pregnantMembers"
                    type="number"
                    value={formData.pregnantMembers}
                    onChange={(e) => handleInputChange("pregnantMembers", e.target.value)}
                    placeholder="Masukkan jumlah anggota hamil"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Informasi Ekonomi
              </CardTitle>
              <CardDescription>Masukkan informasi tentang kondisi ekonomi keluarga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Pendapatan Bulanan *</Label>
                  <Select
                    value={formData.monthlyIncome}
                    onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rentang pendapatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500000">Rp 0 - Rp 500.000</SelectItem>
                      <SelectItem value="500000-1000000">Rp 500.000 - Rp 1.000.000</SelectItem>
                      <SelectItem value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</SelectItem>
                      <SelectItem value="2000000-3000000">Rp 2.000.000 - Rp 3.000.000</SelectItem>
                      <SelectItem value="3000000+">Lebih dari Rp 3.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Status Pekerjaan *</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => handleInputChange("employmentStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status pekerjaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bekerja-tetap">Bekerja Tetap</SelectItem>
                      <SelectItem value="bekerja-tidak-tetap">Bekerja Tidak Tetap</SelectItem>
                      <SelectItem value="wiraswasta">Wiraswasta</SelectItem>
                      <SelectItem value="tidak-bekerja">Tidak Bekerja</SelectItem>
                      <SelectItem value="pensiunan">Pensiunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Pekerjaan</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Masukkan jenis pekerjaan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Pengeluaran Bulanan</Label>
                  <Select
                    value={formData.monthlyExpenses}
                    onValueChange={(value) => handleInputChange("monthlyExpenses", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rentang pengeluaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500000">Rp 0 - Rp 500.000</SelectItem>
                      <SelectItem value="500000-1000000">Rp 500.000 - Rp 1.000.000</SelectItem>
                      <SelectItem value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</SelectItem>
                      <SelectItem value="2000000+">Lebih dari Rp 2.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hasAssets">Kepemilikan Aset</Label>
                  <Select value={formData.hasAssets} onValueChange={(value) => handleInputChange("hasAssets", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Apakah memiliki aset?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tidak">Tidak Ada</SelectItem>
                      <SelectItem value="rumah">Rumah</SelectItem>
                      <SelectItem value="kendaraan">Kendaraan</SelectItem>
                      <SelectItem value="tanah">Tanah</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetDetails">Detail Aset</Label>
                  <Textarea
                    id="assetDetails"
                    value={formData.assetDetails}
                    onChange={(e) => handleInputChange("assetDetails", e.target.value)}
                    placeholder="Jelaskan detail aset yang dimiliki"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Informasi Pendidikan
              </CardTitle>
              <CardDescription>Masukkan informasi tentang pendidikan keluarga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Tingkat Pendidikan Terakhir *</Label>
                  <Select
                    value={formData.educationLevel}
                    onValueChange={(value) => handleInputChange("educationLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tidak-sekolah">Tidak Sekolah</SelectItem>
                      <SelectItem value="sd">SD/Sederajat</SelectItem>
                      <SelectItem value="smp">SMP/Sederajat</SelectItem>
                      <SelectItem value="sma">SMA/Sederajat</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="sarjana">Sarjana</SelectItem>
                      <SelectItem value="pascasarjana">Pascasarjana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childrenInSchool">Anak yang Bersekolah</Label>
                  <Input
                    id="childrenInSchool"
                    type="number"
                    value={formData.childrenInSchool}
                    onChange={(e) => handleInputChange("childrenInSchool", e.target.value)}
                    placeholder="Jumlah anak yang bersekolah"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="educationExpenses">Biaya Pendidikan Bulanan</Label>
                  <Select
                    value={formData.educationExpenses}
                    onValueChange={(value) => handleInputChange("educationExpenses", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rentang biaya pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100000">Rp 0 - Rp 100.000</SelectItem>
                      <SelectItem value="100000-300000">Rp 100.000 - Rp 300.000</SelectItem>
                      <SelectItem value="300000-500000">Rp 300.000 - Rp 500.000</SelectItem>
                      <SelectItem value="500000+">Lebih dari Rp 500.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                Informasi Kesehatan & Perumahan
              </CardTitle>
              <CardDescription>Masukkan informasi tentang kesehatan dan kondisi rumah</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Kesehatan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="healthCondition">Kondisi Kesehatan Umum</Label>
                    <Select
                      value={formData.healthCondition}
                      onValueChange={(value) => handleInputChange("healthCondition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kondisi kesehatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sehat">Sehat</SelectItem>
                        <SelectItem value="kurang-sehat">Kurang Sehat</SelectItem>
                        <SelectItem value="sakit-kronis">Sakit Kronis</SelectItem>
                        <SelectItem value="disabilitas">Disabilitas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chronicIllness">Penyakit Kronis</Label>
                    <Input
                      id="chronicIllness"
                      value={formData.chronicIllness}
                      onChange={(e) => handleInputChange("chronicIllness", e.target.value)}
                      placeholder="Sebutkan penyakit kronis (jika ada)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthcareAccess">Akses Layanan Kesehatan</Label>
                    <Select
                      value={formData.healthcareAccess}
                      onValueChange={(value) => handleInputChange("healthcareAccess", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih akses kesehatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mudah">Mudah</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="sulit">Sulit</SelectItem>
                        <SelectItem value="tidak-ada">Tidak Ada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="healthExpenses">Biaya Kesehatan Bulanan</Label>
                    <Select
                      value={formData.healthExpenses}
                      onValueChange={(value) => handleInputChange("healthExpenses", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih rentang biaya kesehatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100000">Rp 0 - Rp 100.000</SelectItem>
                        <SelectItem value="100000-300000">Rp 100.000 - Rp 300.000</SelectItem>
                        <SelectItem value="300000-500000">Rp 300.000 - Rp 500.000</SelectItem>
                        <SelectItem value="500000+">Lebih dari Rp 500.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Perumahan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="housingStatus">Status Kepemilikan Rumah</Label>
                    <Select
                      value={formData.housingStatus}
                      onValueChange={(value) => handleInputChange("housingStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status rumah" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milik-sendiri">Milik Sendiri</SelectItem>
                        <SelectItem value="sewa">Sewa</SelectItem>
                        <SelectItem value="kontrak">Kontrak</SelectItem>
                        <SelectItem value="menumpang">Menumpang</SelectItem>
                        <SelectItem value="bebas-sewa">Bebas Sewa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="housingCondition">Kondisi Rumah</Label>
                    <Select
                      value={formData.housingCondition}
                      onValueChange={(value) => handleInputChange("housingCondition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kondisi rumah" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baik">Baik</SelectItem>
                        <SelectItem value="sedang">Sedang</SelectItem>
                        <SelectItem value="rusak-ringan">Rusak Ringan</SelectItem>
                        <SelectItem value="rusak-berat">Rusak Berat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="utilities">Fasilitas Rumah</Label>
                    <Textarea
                      id="utilities"
                      value={formData.utilities}
                      onChange={(e) => handleInputChange("utilities", e.target.value)}
                      placeholder="Sebutkan fasilitas yang tersedia (listrik, air, toilet, dll)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 7:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                Riwayat Program & Kebutuhan Khusus
              </CardTitle>
              <CardDescription>Masukkan informasi tentang program sebelumnya dan kebutuhan khusus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Riwayat Program Bantuan</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousPrograms">Program yang Pernah Diikuti</Label>
                    <Textarea
                      id="previousPrograms"
                      value={formData.previousPrograms}
                      onChange={(e) => handleInputChange("previousPrograms", e.target.value)}
                      placeholder="Sebutkan program bantuan yang pernah diikuti (PKH, BPNT, KIP, dll)"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="programExperience">Pengalaman Program</Label>
                    <Textarea
                      id="programExperience"
                      value={formData.programExperience}
                      onChange={(e) => handleInputChange("programExperience", e.target.value)}
                      placeholder="Ceritakan pengalaman Anda dengan program bantuan sebelumnya"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Kebutuhan Khusus</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyNeeds">Kebutuhan Mendesak</Label>
                    <Textarea
                      id="emergencyNeeds"
                      value={formData.emergencyNeeds}
                      onChange={(e) => handleInputChange("emergencyNeeds", e.target.value)}
                      placeholder="Sebutkan kebutuhan yang mendesak saat ini"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priorityNeeds">Prioritas Kebutuhan</Label>
                    <Select
                      value={formData.priorityNeeds}
                      onValueChange={(value) => handleInputChange("priorityNeeds", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih prioritas utama" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pangan">Kebutuhan Pangan</SelectItem>
                        <SelectItem value="kesehatan">Kesehatan</SelectItem>
                        <SelectItem value="pendidikan">Pendidikan</SelectItem>
                        <SelectItem value="perumahan">Perumahan</SelectItem>
                        <SelectItem value="pekerjaan">Pekerjaan</SelectItem>
                        <SelectItem value="modal-usaha">Modal Usaha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 8:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-600" />
                Informasi Tambahan
              </CardTitle>
              <CardDescription>Masukkan informasi tambahan yang ingin Anda sampaikan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Informasi Tambahan</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Sampaikan informasi tambahan yang menurut Anda penting untuk diketahui dalam menentukan rekomendasi program bantuan"
                  rows={5}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Catatan Penting:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pastikan semua informasi yang Anda berikan adalah benar dan akurat</li>
                  <li>• Data Anda akan digunakan untuk memberikan rekomendasi program yang paling sesuai</li>
                  <li>• Informasi pribadi Anda akan dijaga kerahasiaannya</li>
                  <li>• Rekomendasi yang diberikan bersifat saran dan tidak mengikat</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-24">

          {/* Results */}
          <div className="space-y-6 mb-8">
            {recommendations.map((rec, index) => (
              <Card key={rec.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          #{index + 1} Rekomendasi
                        </Badge>
                        <Badge variant="outline">{rec.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{rec.title}</h3>
                      <p className="text-gray-600 mb-3">{rec.matchReason}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-lg">{rec.confidence}%</span>
                      </div>
                      <p className="text-sm text-gray-500">Tingkat Kesesuaian</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Kelayakan</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={rec.eligibilityMatch} className="flex-1" />
                        <span className="text-sm font-semibold">{rec.eligibilityMatch}%</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Estimasi Bantuan</p>
                      <p className="font-semibold text-sm mt-1">{rec.estimatedAmount}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">Waktu Proses</p>
                      <p className="font-semibold text-sm mt-1">{rec.processingTime}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm text-orange-600 font-medium">Penyelenggara</p>
                      <p className="font-semibold text-sm mt-1">{rec.organization}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Manfaat yang Akan Diperoleh:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={`/bansos/${rec.id}`} className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Lihat Detail Program
                      </Button>
                    </a>
                    <Button variant="outline" className="px-6 bg-transparent">
                      <Target className="h-4 w-4 mr-2" />
                      Ajukan Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={resetForm} variant="outline" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Coba Lagi
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Simpan Rekomendasi
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-24">

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Langkah {currentStep} dari {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Selesai</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              Sebelumnya
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                className="bg-green-600 hover:bg-green-700"
              >
                Selanjutnya
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Dapatkan Rekomendasi AI
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Menganalisis Data Anda</h3>
                <p className="text-gray-600 mb-4">
                  AI sedang memproses informasi Anda untuk memberikan rekomendasi terbaik...
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>✓ Menganalisis kondisi ekonomi</p>
                  <p>✓ Mengevaluasi kebutuhan keluarga</p>
                  <p>✓ Mencocokkan dengan program tersedia</p>
                  <p>✓ Menghitung tingkat kesesuaian</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
