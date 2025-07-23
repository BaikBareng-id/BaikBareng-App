"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  SortAsc,
  Calendar,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Bookmark,
  MoreHorizontal,
  RefreshCw,
  Plus,
} from "lucide-react"

// Mock programs data
const programs = [
  {
    id: 1,
    name: "Program Keluarga Harapan (PKH)",
    category: "Bantuan Tunai",
    status: "Aktif",
    amount: "Rp 750.000",
    appliedDate: "2024-01-15",
    approvedDate: "2024-01-20",
    nextPayment: "2024-02-15",
    progress: 75,
    description: "Bantuan tunai bersyarat untuk keluarga miskin dengan komponen kesehatan dan pendidikan.",
    image: "/placeholder.svg?height=100&width=150&text=PKH",
    saved: true,
    priority: "high",
  },
  {
    id: 2,
    name: "Bantuan Pangan Non Tunai (BPNT)",
    category: "Bantuan Pangan",
    status: "Aktif",
    amount: "Rp 200.000",
    appliedDate: "2024-01-10",
    approvedDate: "2024-01-18",
    nextPayment: "2024-02-01",
    progress: 60,
    description: "Bantuan pangan dalam bentuk non tunai melalui Kartu Keluarga Sejahtera.",
    image: "/placeholder.svg?height=100&width=150&text=BPNT",
    saved: false,
    priority: "medium",
  },
  {
    id: 3,
    name: "Program Indonesia Pintar (PIP)",
    category: "Bantuan Pendidikan",
    status: "Aktif",
    amount: "Rp 450.000",
    appliedDate: "2024-01-05",
    approvedDate: "2024-01-12",
    nextPayment: "2024-03-01",
    progress: 90,
    description: "Bantuan pendidikan untuk anak usia sekolah dari keluarga kurang mampu.",
    image: "/placeholder.svg?height=100&width=150&text=PIP",
    saved: true,
    priority: "high",
  },
  {
    id: 4,
    name: "Bantuan Langsung Tunai (BLT)",
    category: "Bantuan Tunai",
    status: "Selesai",
    amount: "Rp 600.000",
    appliedDate: "2023-12-01",
    approvedDate: "2023-12-05",
    completedDate: "2024-01-15",
    progress: 100,
    description: "Bantuan tunai langsung untuk masyarakat terdampak pandemi.",
    image: "/placeholder.svg?height=100&width=150&text=BLT",
    saved: false,
    priority: "medium",
  },
  {
    id: 5,
    name: "Bantuan Sosial Anak Terlantar",
    category: "Bantuan Sosial",
    status: "Pending",
    amount: "Rp 300.000",
    appliedDate: "2024-01-18",
    progress: 25,
    description: "Bantuan untuk anak-anak terlantar dan yatim piatu.",
    image: "/placeholder.svg?height=100&width=150&text=Anak+Terlantar",
    saved: true,
    priority: "low",
  },
  {
    id: 6,
    name: "Bantuan Usaha Mikro (BUM)",
    category: "Bantuan Usaha",
    status: "Ditolak",
    amount: "Rp 2.400.000",
    appliedDate: "2023-11-15",
    rejectedDate: "2023-12-01",
    rejectionReason: "Tidak memenuhi kriteria usaha mikro",
    description: "Bantuan modal usaha untuk pelaku usaha mikro dan kecil.",
    image: "/placeholder.svg?height=100&width=150&text=BUM",
    saved: false,
    priority: "low",
  },
  {
    id: 7,
    name: "Bantuan Iuran Jaminan Kesehatan (PBI JKN)",
    category: "Bantuan Kesehatan",
    status: "Aktif",
    amount: "Rp 42.000",
    appliedDate: "2024-01-01",
    approvedDate: "2024-01-03",
    nextPayment: "2024-02-01",
    progress: 50,
    description: "Bantuan iuran jaminan kesehatan untuk fakir miskin dan orang tidak mampu.",
    image: "/placeholder.svg?height=100&width=150&text=PBI+JKN",
    saved: true,
    priority: "high",
  },
  {
    id: 8,
    name: "Bantuan Sosial Lanjut Usia",
    category: "Bantuan Sosial",
    status: "Selesai",
    amount: "Rp 600.000",
    appliedDate: "2023-10-01",
    approvedDate: "2023-10-05",
    completedDate: "2024-01-01",
    progress: 100,
    description: "Bantuan untuk lansia terlantar dan tidak mampu.",
    image: "/placeholder.svg?height=100&width=150&text=Lansia",
    saved: false,
    priority: "medium",
  },
]

const statusOptions = ["Semua Status", "Aktif", "Pending", "Selesai", "Ditolak"]
const categoryOptions = [
  "Semua Kategori",
  "Bantuan Tunai",
  "Bantuan Pangan",
  "Bantuan Pendidikan",
  "Bantuan Kesehatan",
  "Bantuan Sosial",
  "Bantuan Usaha",
]
const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "name-asc", label: "Nama A-Z" },
  { value: "name-desc", label: "Nama Z-A" },
  { value: "amount-high", label: "Bantuan Tertinggi" },
  { value: "amount-low", label: "Bantuan Terendah" },
]

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [showSaved, setShowSaved] = useState(false)
  const itemsPerPage = 6

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    const filtered = programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "Semua Status" || program.status === selectedStatus
      const matchesCategory = selectedCategory === "Semua Kategori" || program.category === selectedCategory
      const matchesSaved = !showSaved || program.saved

      return matchesSearch && matchesStatus && matchesCategory && matchesSaved
    })

    // Sort programs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        case "oldest":
          return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "amount-high":
          return Number.parseInt(b.amount.replace(/\D/g, "")) - Number.parseInt(a.amount.replace(/\D/g, ""))
        case "amount-low":
          return Number.parseInt(a.amount.replace(/\D/g, "")) - Number.parseInt(b.amount.replace(/\D/g, ""))
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedStatus, selectedCategory, sortBy, showSaved])

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  useState(() => {
    setCurrentPage(1)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Selesai":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aktif":
        return <CheckCircle className="w-4 h-4" />
      case "Pending":
        return <AlertCircle className="w-4 h-4" />
      case "Selesai":
        return <CheckCircle className="w-4 h-4" />
      case "Ditolak":
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
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

  const statusCounts = {
    total: programs.length,
    active: programs.filter((p) => p.status === "Aktif").length,
    pending: programs.filter((p) => p.status === "Pending").length,
    completed: programs.filter((p) => p.status === "Selesai").length,
    rejected: programs.filter((p) => p.status === "Ditolak").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Program Saya</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Kelola dan pantau semua program bantuan sosial Anda</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm" className="bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <a href="/bansos">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Program Baru
            </Button>
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Program</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Aktif</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Pending</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Selesai</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Ditolak</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-40">
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

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
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

              <Button
                variant={showSaved ? "default" : "outline"}
                onClick={() => setShowSaved(!showSaved)}
                className={showSaved ? "bg-green-600 hover:bg-green-700 text-white" : "bg-transparent"}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Tersimpan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menampilkan {paginatedPrograms.length} dari {filteredPrograms.length} program
          </h2>
          {(searchTerm || selectedStatus !== "Semua Status" || selectedCategory !== "Semua Kategori" || showSaved) && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPrograms.map((program) => (
            <Card
              key={program.id}
              className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getPriorityColor(program.priority)} overflow-hidden cursor-pointer`}
            >
              <div className="relative">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.name}
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${getStatusColor(program.status)} flex items-center space-x-1`}>
                    {getStatusIcon(program.status)}
                    <span>{program.status}</span>
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-gray-700 p-1 h-auto">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                {program.saved && (
                  <div className="absolute bottom-3 right-3">
                    <div className="p-1 bg-white/90 rounded-full">
                      <Bookmark className="w-4 h-4 text-blue-600 fill-current" />
                    </div>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {program.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(program.appliedDate).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                  {program.name}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{program.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Program Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Bantuan:</span>
                    </div>
                    <span className="font-semibold text-green-600">{program.amount}</span>
                  </div>

                  {program.status === "Aktif" && program.nextPayment && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Pembayaran berikutnya:</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(program.nextPayment).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  )}

                  {program.status === "Ditolak" && program.rejectionReason && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <p className="text-xs text-red-700 dark:text-red-300">
                        <strong>Alasan penolakan:</strong> {program.rejectionReason}
                      </p>
                    </div>
                  )}

                  {(program.status === "Aktif" || program.status === "Pending") && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Progress:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <a href={`/bansos/${program.id}`} className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tidak ada program ditemukan</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedStatus("Semua Status")
              setSelectedCategory("Semua Kategori")
              setShowSaved(false)
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
  )
}
