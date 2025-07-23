"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for transparency logs
const transparencyLogs = [
  {
    id: "TXN-2024-001",
    timestamp: "2024-01-15T10:30:00Z",
    userName: "Siti Nurhaliza",
    userKTP: "3201234567890123",
    programId: "PKH-2024-001",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "APPLICATION_SUBMITTED",
    status: "approved",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Jakarta Pusat, DKI Jakarta",
    verifiedBy: "Admin Kemensos",
    blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    details: "Aplikasi bantuan PKH untuk keluarga dengan 2 anak usia sekolah",
  },
  {
    id: "TXN-2024-002",
    timestamp: "2024-01-15T11:45:00Z",
    userName: "Ahmad Wijaya",
    userKTP: "3301234567890124",
    programId: "BST-2024-002",
    programName: "Bantuan Sosial Tunai (BST)",
    programCategory: "Bantuan Tunai",
    action: "PAYMENT_DISBURSED",
    status: "completed",
    amount: "Rp 300.000",
    organization: "Pemerintah Daerah Jawa Tengah",
    location: "Semarang, Jawa Tengah",
    verifiedBy: "Admin Pemda Jateng",
    blockHash: "0x2b3c4d5e6f7890ab1234567890cdef12",
    details: "Pencairan bantuan BST bulan Januari 2024",
  },
  {
    id: "TXN-2024-003",
    timestamp: "2024-01-15T14:20:00Z",
    userName: "Maria Gonzalez",
    userKTP: "5101234567890125",
    programId: "BPNT-2024-003",
    programName: "Bantuan Pangan Non Tunai (BPNT)",
    programCategory: "Bantuan Pangan",
    action: "BENEFIT_RECEIVED",
    status: "completed",
    amount: "Rp 200.000",
    organization: "Bulog",
    location: "Denpasar, Bali",
    verifiedBy: "Admin Bulog",
    blockHash: "0x3c4d5e6f7890ab12345678901234cdef",
    details: "Penerimaan bantuan pangan melalui e-Warong",
  },
  {
    id: "TXN-2024-004",
    timestamp: "2024-01-15T16:10:00Z",
    userName: "Budi Santoso",
    userKTP: "3501234567890126",
    programId: "KIP-2024-004",
    programName: "Kartu Indonesia Pintar (KIP)",
    programCategory: "Bantuan Pendidikan",
    action: "APPLICATION_REJECTED",
    status: "rejected",
    amount: "Rp 450.000",
    organization: "Kemendikbud RI",
    location: "Surabaya, Jawa Timur",
    verifiedBy: "Admin Kemendikbud",
    blockHash: "0x4d5e6f7890ab123456789012345cdef1",
    details: "Aplikasi ditolak karena tidak memenuhi kriteria usia",
  },
  {
    id: "TXN-2024-005",
    timestamp: "2024-01-15T17:30:00Z",
    userName: "Dewi Sartika",
    userKTP: "1201234567890127",
    programId: "KIS-2024-005",
    programName: "Kartu Indonesia Sehat (KIS)",
    programCategory: "Bantuan Kesehatan",
    action: "CARD_ACTIVATED",
    status: "active",
    amount: "Unlimited",
    organization: "BPJS Kesehatan",
    location: "Medan, Sumatera Utara",
    verifiedBy: "Admin BPJS",
    blockHash: "0x5e6f7890ab1234567890123456cdef12",
    details: "Aktivasi kartu KIS untuk layanan kesehatan gratis",
  },
  {
    id: "TXN-2024-006",
    timestamp: "2024-01-15T19:15:00Z",
    userName: "Rudi Hartono",
    userKTP: "6401234567890128",
    programId: "PKH-2024-006",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "VERIFICATION_PENDING",
    status: "pending",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Pontianak, Kalimantan Barat",
    verifiedBy: "Pending Verification",
    blockHash: "0x6f7890ab123456789012345678cdef12",
    details: "Menunggu verifikasi dokumen kelengkapan",
  },
    {
    id: "TXN-2024-004",
    timestamp: "2024-01-15T16:10:00Z",
    userName: "Budi Santoso",
    userKTP: "3501234567890126",
    programId: "KIP-2024-004",
    programName: "Kartu Indonesia Pintar (KIP)",
    programCategory: "Bantuan Pendidikan",
    action: "APPLICATION_REJECTED",
    status: "rejected",
    amount: "Rp 450.000",
    organization: "Kemendikbud RI",
    location: "Surabaya, Jawa Timur",
    verifiedBy: "Admin Kemendikbud",
    blockHash: "0x4d5e6f7890ab123456789012345cdef1",
    details: "Aplikasi ditolak karena tidak memenuhi kriteria usia",
  },
  {
    id: "TXN-2024-005",
    timestamp: "2024-01-15T17:30:00Z",
    userName: "Dewi Sartika",
    userKTP: "1201234567890127",
    programId: "KIS-2024-005",
    programName: "Kartu Indonesia Sehat (KIS)",
    programCategory: "Bantuan Kesehatan",
    action: "CARD_ACTIVATED",
    status: "active",
    amount: "Unlimited",
    organization: "BPJS Kesehatan",
    location: "Medan, Sumatera Utara",
    verifiedBy: "Admin BPJS",
    blockHash: "0x5e6f7890ab1234567890123456cdef12",
    details: "Aktivasi kartu KIS untuk layanan kesehatan gratis",
  },
  {
    id: "TXN-2024-006",
    timestamp: "2024-01-15T19:15:00Z",
    userName: "Rudi Hartono",
    userKTP: "6401234567890128",
    programId: "PKH-2024-006",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "VERIFICATION_PENDING",
    status: "pending",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Pontianak, Kalimantan Barat",
    verifiedBy: "Pending Verification",
    blockHash: "0x6f7890ab123456789012345678cdef12",
    details: "Menunggu verifikasi dokumen kelengkapan",
  },
  {
    id: "TXN-2024-001",
    timestamp: "2024-01-15T10:30:00Z",
    userName: "Siti Nurhaliza",
    userKTP: "3201234567890123",
    programId: "PKH-2024-001",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "APPLICATION_SUBMITTED",
    status: "approved",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Jakarta Pusat, DKI Jakarta",
    verifiedBy: "Admin Kemensos",
    blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    details: "Aplikasi bantuan PKH untuk keluarga dengan 2 anak usia sekolah",
  },
  {
    id: "TXN-2024-002",
    timestamp: "2024-01-15T11:45:00Z",
    userName: "Ahmad Wijaya",
    userKTP: "3301234567890124",
    programId: "BST-2024-002",
    programName: "Bantuan Sosial Tunai (BST)",
    programCategory: "Bantuan Tunai",
    action: "PAYMENT_DISBURSED",
    status: "completed",
    amount: "Rp 300.000",
    organization: "Pemerintah Daerah Jawa Tengah",
    location: "Semarang, Jawa Tengah",
    verifiedBy: "Admin Pemda Jateng",
    blockHash: "0x2b3c4d5e6f7890ab1234567890cdef12",
    details: "Pencairan bantuan BST bulan Januari 2024",
  },
  {
    id: "TXN-2024-003",
    timestamp: "2024-01-15T14:20:00Z",
    userName: "Maria Gonzalez",
    userKTP: "5101234567890125",
    programId: "BPNT-2024-003",
    programName: "Bantuan Pangan Non Tunai (BPNT)",
    programCategory: "Bantuan Pangan",
    action: "BENEFIT_RECEIVED",
    status: "completed",
    amount: "Rp 200.000",
    organization: "Bulog",
    location: "Denpasar, Bali",
    verifiedBy: "Admin Bulog",
    blockHash: "0x3c4d5e6f7890ab12345678901234cdef",
    details: "Penerimaan bantuan pangan melalui e-Warong",
  },
  {
    id: "TXN-2024-004",
    timestamp: "2024-01-15T16:10:00Z",
    userName: "Budi Santoso",
    userKTP: "3501234567890126",
    programId: "KIP-2024-004",
    programName: "Kartu Indonesia Pintar (KIP)",
    programCategory: "Bantuan Pendidikan",
    action: "APPLICATION_REJECTED",
    status: "rejected",
    amount: "Rp 450.000",
    organization: "Kemendikbud RI",
    location: "Surabaya, Jawa Timur",
    verifiedBy: "Admin Kemendikbud",
    blockHash: "0x4d5e6f7890ab123456789012345cdef1",
    details: "Aplikasi ditolak karena tidak memenuhi kriteria usia",
  },
  {
    id: "TXN-2024-005",
    timestamp: "2024-01-15T17:30:00Z",
    userName: "Dewi Sartika",
    userKTP: "1201234567890127",
    programId: "KIS-2024-005",
    programName: "Kartu Indonesia Sehat (KIS)",
    programCategory: "Bantuan Kesehatan",
    action: "CARD_ACTIVATED",
    status: "active",
    amount: "Unlimited",
    organization: "BPJS Kesehatan",
    location: "Medan, Sumatera Utara",
    verifiedBy: "Admin BPJS",
    blockHash: "0x5e6f7890ab1234567890123456cdef12",
    details: "Aktivasi kartu KIS untuk layanan kesehatan gratis",
  },
  {
    id: "TXN-2024-006",
    timestamp: "2024-01-15T19:15:00Z",
    userName: "Rudi Hartono",
    userKTP: "6401234567890128",
    programId: "PKH-2024-006",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "VERIFICATION_PENDING",
    status: "pending",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Pontianak, Kalimantan Barat",
    verifiedBy: "Pending Verification",
    blockHash: "0x6f7890ab123456789012345678cdef12",
    details: "Menunggu verifikasi dokumen kelengkapan",
  },
    {
    id: "TXN-2024-004",
    timestamp: "2024-01-15T16:10:00Z",
    userName: "Budi Santoso",
    userKTP: "3501234567890126",
    programId: "KIP-2024-004",
    programName: "Kartu Indonesia Pintar (KIP)",
    programCategory: "Bantuan Pendidikan",
    action: "APPLICATION_REJECTED",
    status: "rejected",
    amount: "Rp 450.000",
    organization: "Kemendikbud RI",
    location: "Surabaya, Jawa Timur",
    verifiedBy: "Admin Kemendikbud",
    blockHash: "0x4d5e6f7890ab123456789012345cdef1",
    details: "Aplikasi ditolak karena tidak memenuhi kriteria usia",
  },
  {
    id: "TXN-2024-005",
    timestamp: "2024-01-15T17:30:00Z",
    userName: "Dewi Sartika",
    userKTP: "1201234567890127",
    programId: "KIS-2024-005",
    programName: "Kartu Indonesia Sehat (KIS)",
    programCategory: "Bantuan Kesehatan",
    action: "CARD_ACTIVATED",
    status: "active",
    amount: "Unlimited",
    organization: "BPJS Kesehatan",
    location: "Medan, Sumatera Utara",
    verifiedBy: "Admin BPJS",
    blockHash: "0x5e6f7890ab1234567890123456cdef12",
    details: "Aktivasi kartu KIS untuk layanan kesehatan gratis",
  },
  {
    id: "TXN-2024-006",
    timestamp: "2024-01-15T19:15:00Z",
    userName: "Rudi Hartono",
    userKTP: "6401234567890128",
    programId: "PKH-2024-006",
    programName: "Program Keluarga Harapan (PKH)",
    programCategory: "Bantuan Tunai",
    action: "VERIFICATION_PENDING",
    status: "pending",
    amount: "Rp 750.000",
    organization: "Kementerian Sosial RI",
    location: "Pontianak, Kalimantan Barat",
    verifiedBy: "Pending Verification",
    blockHash: "0x6f7890ab123456789012345678cdef12",
    details: "Menunggu verifikasi dokumen kelengkapan",
  },
]

const statusConfig = {
  approved: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  completed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
  active: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertCircle },
  rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

const actionConfig = {
  APPLICATION_SUBMITTED: { label: "Aplikasi Diajukan", color: "text-blue-600" },
  PAYMENT_DISBURSED: { label: "Pembayaran Dicairkan", color: "text-green-600" },
  BENEFIT_RECEIVED: { label: "Bantuan Diterima", color: "text-emerald-600" },
  APPLICATION_REJECTED: { label: "Aplikasi Ditolak", color: "text-red-600" },
  CARD_ACTIVATED: { label: "Kartu Diaktivasi", color: "text-purple-600" },
  VERIFICATION_PENDING: { label: "Menunggu Verifikasi", color: "text-yellow-600" },
}

export default function TransparencyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const itemsPerPage = 10

  const filteredAndSortedLogs = useMemo(() => {
    const filtered = transparencyLogs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || log.status === statusFilter
      const matchesCategory = categoryFilter === "all" || log.programCategory === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        case "name":
          return a.userName.localeCompare(b.userName)
        case "program":
          return a.programName.localeCompare(b.programName)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, categoryFilter, sortBy])

  const totalPages = Math.ceil(filteredAndSortedLogs.length / itemsPerPage)
  const paginatedLogs = filteredAndSortedLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    })
  }

  const formatKTP = (ktp: string) => {
    return ktp.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4")
  }

  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Transaksi</p>
                  <p className="text-3xl font-bold">1,247</p>
                </div>
                <FileText className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Dana Tersalurkan</p>
                  <p className="text-3xl font-bold">Rp 2.1M</p>
                </div>
                <CheckCircle className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Penerima Aktif</p>
                  <p className="text-3xl font-bold">892</p>
                </div>
                <User className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Program Aktif</p>
                  <p className="text-3xl font-bold">15</p>
                </div>
                <Calendar className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari nama atau program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Bantuan Tunai">Bantuan Tunai</SelectItem>
                  <SelectItem value="Bantuan Pangan">Bantuan Pangan</SelectItem>
                  <SelectItem value="Bantuan Pendidikan">Bantuan Pendidikan</SelectItem>
                  <SelectItem value="Bantuan Kesehatan">Bantuan Kesehatan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                  <SelectItem value="name">Nama A-Z</SelectItem>
                  <SelectItem value="program">Program A-Z</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setCategoryFilter("all")
                  setSortBy("newest")
                  setCurrentPage(1)
                }}
              >
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transparency Log Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Log Transparansi ({filteredAndSortedLogs.length} transaksi)</span>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Live Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">ID Transaksi</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Waktu</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Penerima</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Program</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Aksi</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Jumlah</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => {
                    const StatusIcon = statusConfig[log.status as keyof typeof statusConfig]?.icon || AlertCircle
                    const isExpanded = expandedRow === log.id

                    return (
                      <>
                        <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-mono text-sm text-blue-600">{log.id}</div>
                            <div className="text-xs text-gray-500 font-mono">{log.blockHash.substring(0, 16)}...</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-900">{formatTimestamp(log.timestamp)}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{log.userName}</div>
                            <div className="text-xs text-gray-500">{formatKTP(log.userKTP)}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{log.programName}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {log.programCategory}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div
                              className={`text-sm font-medium ${actionConfig[log.action as keyof typeof actionConfig]?.color}`}
                            >
                              {actionConfig[log.action as keyof typeof actionConfig]?.label}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={`${statusConfig[log.status as keyof typeof statusConfig]?.color} flex items-center w-fit`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-green-600">{log.amount}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => toggleRowExpansion(log.id)}>
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                              <a href={`/bansos/${log.programId}`}>
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan={8} className="py-4 px-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-semibold text-gray-700">Organisasi:</span>
                                  <p className="text-gray-600">{log.organization}</p>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-700">Lokasi:</span>
                                  <p className="text-gray-600 flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {log.location}
                                  </p>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-700">Diverifikasi oleh:</span>
                                  <p className="text-gray-600">{log.verifiedBy}</p>
                                </div>
                                <div className="md:col-span-2 lg:col-span-3">
                                  <span className="font-semibold text-gray-700">Detail:</span>
                                  <p className="text-gray-600">{log.details}</p>
                                </div>
                                <div className="md:col-span-2 lg:col-span-3">
                                  <span className="font-semibold text-gray-700">Block Hash:</span>
                                  <p className="text-gray-600 font-mono text-xs break-all">{log.blockHash}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedLogs.length)} dari{" "}
                  {filteredAndSortedLogs.length} transaksi
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Sebelumnya
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
