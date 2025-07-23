"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  SortAsc,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { useNavigate } from "react-router"

// Mock data for bansos programs
const bansosPrograms = [
  {
    id: 1,
    title: "Program Keluarga Harapan (PKH)",
    description:
      "Bantuan tunai bersyarat untuk keluarga miskin dengan komponen kesehatan, pendidikan, dan kesejahteraan sosial.",
    category: "Bantuan Tunai",
    amount: "Rp 750.000 - 3.000.000",
    duration: "12 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "10.2 juta keluarga",
    status: "Aktif",
    deadline: "2024-12-31",
    requirements: ["KTP", "Kartu Keluarga", "Surat Keterangan Tidak Mampu"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=PKH",
    priority: "high",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Bantuan Pangan Non Tunai (BPNT)",
    description:
      "Bantuan pangan dalam bentuk non tunai melalui Kartu Keluarga Sejahtera (KKS) untuk memenuhi kebutuhan pangan pokok.",
    category: "Bantuan Pangan",
    amount: "Rp 200.000/bulan",
    duration: "12 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "15.6 juta keluarga",
    status: "Aktif",
    deadline: "2024-11-30",
    requirements: ["KTP", "Kartu Keluarga", "Kartu Keluarga Sejahtera"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=BPNT",
    priority: "high",
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    title: "Bantuan Langsung Tunai (BLT)",
    description: "Bantuan tunai langsung untuk masyarakat terdampak pandemi dan situasi darurat lainnya.",
    category: "Bantuan Tunai",
    amount: "Rp 600.000",
    duration: "3 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "12.8 juta keluarga",
    status: "Aktif",
    deadline: "2024-10-15",
    requirements: ["KTP", "Kartu Keluarga", "Surat Keterangan Domisili"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=BLT",
    priority: "medium",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    title: "Program Indonesia Pintar (PIP)",
    description:
      "Bantuan pendidikan untuk anak usia sekolah dari keluarga kurang mampu berupa uang tunai dan beasiswa.",
    category: "Bantuan Pendidikan",
    amount: "Rp 450.000 - 1.000.000",
    duration: "1 tahun ajaran",
    location: "Seluruh Indonesia",
    beneficiaries: "17.9 juta siswa",
    status: "Aktif",
    deadline: "2024-09-30",
    requirements: ["KTP Orang Tua", "Kartu Keluarga", "Surat Keterangan Sekolah"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=PIP",
    priority: "high",
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    title: "Bantuan Iuran Jaminan Kesehatan (PBI JKN)",
    description: "Bantuan iuran jaminan kesehatan untuk fakir miskin dan orang tidak mampu melalui BPJS Kesehatan.",
    category: "Bantuan Kesehatan",
    amount: "Rp 42.000/bulan",
    duration: "12 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "96.3 juta jiwa",
    status: "Aktif",
    deadline: "2024-12-31",
    requirements: ["KTP", "Kartu Keluarga", "Surat Keterangan Tidak Mampu"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=PBI+JKN",
    priority: "high",
    createdAt: "2024-01-01",
  },
  {
    id: 6,
    title: "Bantuan Sosial Anak Terlantar",
    description:
      "Bantuan untuk anak-anak terlantar, yatim piatu, dan anak jalanan untuk memenuhi kebutuhan dasar mereka.",
    category: "Bantuan Sosial",
    amount: "Rp 300.000/bulan",
    duration: "6 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "125.000 anak",
    status: "Aktif",
    deadline: "2024-08-31",
    requirements: ["Surat Keterangan Yatim/Piatu", "KTP Wali", "Surat Keterangan Domisili"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Anak+Terlantar",
    priority: "medium",
    createdAt: "2024-02-15",
  },
  {
    id: 7,
    title: "Bantuan Sosial Lanjut Usia",
    description: "Bantuan untuk lansia terlantar dan tidak mampu untuk memenuhi kebutuhan hidup sehari-hari.",
    category: "Bantuan Sosial",
    amount: "Rp 600.000/bulan",
    duration: "12 bulan",
    location: "Seluruh Indonesia",
    beneficiaries: "200.000 lansia",
    status: "Aktif",
    deadline: "2024-12-31",
    requirements: ["KTP", "Surat Keterangan Usia", "Surat Keterangan Tidak Mampu"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Lansia",
    priority: "medium",
    createdAt: "2024-01-10",
  },
  {
    id: 8,
    title: "Program Sembako Murah",
    description: "Program penyediaan sembilan bahan pokok dengan harga terjangkau untuk masyarakat kurang mampu.",
    category: "Bantuan Pangan",
    amount: "Subsidi 30-50%",
    duration: "12 bulan",
    location: "Kota Besar",
    beneficiaries: "5.2 juta keluarga",
    status: "Aktif",
    deadline: "2024-11-15",
    requirements: ["KTP", "Kartu Keluarga", "Surat Keterangan Penghasilan"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Sembako",
    priority: "low",
    createdAt: "2024-03-01",
  },
  {
    id: 9,
    title: "Bantuan Stimulan Perumahan Swadaya (BSPS)",
    description: "Bantuan untuk perbaikan dan pembangunan rumah layak huni bagi masyarakat berpenghasilan rendah.",
    category: "Bantuan Perumahan",
    amount: "Rp 17.500.000",
    duration: "Sekali pemberian",
    location: "Seluruh Indonesia",
    beneficiaries: "300.000 keluarga",
    status: "Terbatas",
    deadline: "2024-07-31",
    requirements: ["KTP", "Kartu Keluarga", "Sertifikat Tanah", "Surat Keterangan Penghasilan"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=BSPS",
    priority: "medium",
    createdAt: "2024-02-20",
  },
  {
    id: 10,
    title: "Bantuan Usaha Mikro (BUM)",
    description: "Bantuan modal usaha untuk pelaku usaha mikro dan kecil yang terdampak pandemi.",
    category: "Bantuan Usaha",
    amount: "Rp 2.400.000",
    duration: "Sekali pemberian",
    location: "Seluruh Indonesia",
    beneficiaries: "12.8 juta UMKM",
    status: "Nonaktif",
    deadline: "2024-06-30",
    requirements: ["KTP", "NPWP", "Surat Izin Usaha", "Laporan Keuangan"],
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=BUM",
    priority: "low",
    createdAt: "2024-01-05",
  },
]

const categories = [
  "Semua Kategori",
  "Bantuan Tunai",
  "Bantuan Pangan",
  "Bantuan Pendidikan",
  "Bantuan Kesehatan",
  "Bantuan Sosial",
  "Bantuan Perumahan",
  "Bantuan Usaha",
]

const statusOptions = ["Semua Status", "Aktif", "Terbatas", "Nonaktif"]
const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "name-asc", label: "Nama A-Z" },
  { value: "name-desc", label: "Nama Z-A" },
  { value: "deadline", label: "Deadline Terdekat" },
]

export default function BansosPage() {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 6

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    const filtered = bansosPrograms.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Semua Kategori" || program.category === selectedCategory
      const matchesStatus = selectedStatus === "Semua Status" || program.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort programs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Terbatas":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Nonaktif":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aktif":
        return <CheckCircle className="w-3 h-3" />
      case "Terbatas":
        return <AlertCircle className="w-3 h-3" />
      case "Nonaktif":
        return <X className="w-3 h-3" />
      default:
        return <Info className="w-3 h-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-green-600" />
                    Filter & Pencarian
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Search */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pencarian</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Cari program bantuan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Urutkan</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Semua Kategori")
                    setSelectedStatus("Semua Status")
                    setSortBy("newest")
                  }}
                  className="w-full"
                >
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menampilkan {paginatedPrograms.length} dari {filteredPrograms.length} program
                </h2>
                {(searchTerm || selectedCategory !== "Semua Kategori" || selectedStatus !== "Semua Status") && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Filter Aktif
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                </span>
              </div>
            </div>

            {/* Programs Grid */}
            {paginatedPrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedPrograms.map((program) => (
                  <Card
                    key={program.id}
                    className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getPriorityColor(program.priority)} overflow-hidden`}
                  >
                    <div className="relative">
                      <img
                        src={program.image || "/Images/Placeholder/logo.png"}
                        alt={program.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getStatusColor(program.status)} flex items-center space-x-1`}>
                          {getStatusIcon(program.status)}
                          <span>{program.status}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-white">
                          {program.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                        {program.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{program.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Program Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Bantuan</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{program.amount}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Durasi</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{program.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Lokasi</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{program.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Penerima</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{program.beneficiaries}</div>
                          </div>
                        </div>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Deadline:</span>
                        </div>
                        <span className="text-sm font-semibold text-red-600">
                          {new Date(program.deadline).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Requirements Preview */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Persyaratan:</div>
                        <div className="flex flex-wrap gap-1">
                          {program.requirements.slice(0, 2).map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {program.requirements.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.requirements.length - 2} lainnya
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          disabled={program.status === "Nonaktif"}
                          onClick={() => navigate("/bansos/1")}
                        >
                          {program.status === "Nonaktif" ? "Tidak Tersedia" : "Daftar Sekarang"}
                        </Button>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Tidak ada program ditemukan
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Semua Kategori")
                    setSelectedStatus("Semua Status")
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <span>•</span>
                  <span>{filteredPrograms.length} total program</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
