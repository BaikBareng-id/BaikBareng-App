/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Grid3X3,
  List,
  Brain,
  Shield,
  Users,
  BarChart3,
  MessageSquare,
  Bell,
  Smartphone,
  Globe,
  Lock,
  Zap,
  BookOpen,
  Handshake,
  Eye,
  HelpCircle,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Feature {
  id: string
  title: string
  description: string
  category: string
  status: "available" | "coming-soon" | "beta"
  icon: any
  color: string
  link: string
  tags: string[]
  rating: number
  users: string
}

const features: Feature[] = [
  {
    id: "1",
    title: "Rekomendasi AI",
    description:
      "Dapatkan rekomendasi program bantuan yang paling sesuai dengan kondisi Anda menggunakan teknologi AI canggih",
    category: "AI & Analytics",
    status: "available",
    icon: Brain,
    color: "bg-purple-500",
    link: "/ai-recommendation",
    tags: ["AI", "Machine Learning", "Personalisasi"],
    rating: 4.9,
    users: "15.2K",
  },
  {
    id: "2",
    title: "Transparansi Publik",
    description: "Akses log transparan semua aktivitas program bantuan sosial dengan teknologi blockchain",
    category: "Transparansi",
    status: "available",
    icon: Eye,
    color: "bg-blue-500",
    link: "/transparency",
    tags: ["Blockchain", "Transparansi", "Audit"],
    rating: 4.8,
    users: "8.7K",
  },
  {
    id: "3",
    title: "Dashboard Pengguna",
    description: "Kelola semua aplikasi bantuan, lacak status, dan pantau progress dalam satu dashboard terpusat",
    category: "Dashboard",
    status: "available",
    icon: BarChart3,
    color: "bg-green-500",
    link: "/dashboard",
    tags: ["Dashboard", "Analytics", "Monitoring"],
    rating: 4.7,
    users: "22.1K",
  },
  {
    id: "4",
    title: "Program Bantuan",
    description: "Jelajahi berbagai program bantuan sosial dari pemerintah dan organisasi terpercaya",
    category: "Program",
    status: "available",
    icon: Handshake,
    color: "bg-orange-500",
    link: "/bansos",
    tags: ["Program", "Bantuan Sosial", "Pemerintah"],
    rating: 4.6,
    users: "45.3K",
  },
  {
    id: "5",
    title: "Edukasi & Sumber Daya",
    description: "Akses artikel, video, dan materi edukasi untuk meningkatkan pemahaman tentang bantuan sosial",
    category: "Edukasi",
    status: "available",
    icon: BookOpen,
    color: "bg-indigo-500",
    link: "/education",
    tags: ["Edukasi", "Video", "Artikel"],
    rating: 4.5,
    users: "18.9K",
  },
  {
    id: "6",
    title: "Kemitraan & Organisasi",
    description: "Temukan dan terhubung dengan organisasi mitra yang menyediakan program bantuan",
    category: "Kemitraan",
    status: "available",
    icon: Users,
    color: "bg-pink-500",
    link: "/partners",
    tags: ["Kemitraan", "Organisasi", "Kolaborasi"],
    rating: 4.4,
    users: "12.6K",
  },
  {
    id: "7",
    title: "Autentikasi Aman",
    description: "Sistem login yang aman dengan berbagai opsi termasuk biometrik dan two-factor authentication",
    category: "Keamanan",
    status: "available",
    icon: Lock,
    color: "bg-red-500",
    link: "/auth/login",
    tags: ["Keamanan", "Biometrik", "2FA"],
    rating: 4.8,
    users: "35.7K",
  },
  {
    id: "8",
    title: "Notifikasi Real-time",
    description: "Dapatkan update instant tentang status aplikasi dan informasi program terbaru",
    category: "Komunikasi",
    status: "available",
    icon: Bell,
    color: "bg-yellow-500",
    link: "/dashboard",
    tags: ["Notifikasi", "Real-time", "Update"],
    rating: 4.3,
    users: "28.4K",
  },
  {
    id: "9",
    title: "Aplikasi Mobile",
    description: "Akses semua fitur BaikBareng melalui aplikasi mobile yang responsif dan user-friendly",
    category: "Mobile",
    status: "beta",
    icon: Smartphone,
    color: "bg-teal-500",
    link: "#",
    tags: ["Mobile", "Responsive", "PWA"],
    rating: 4.2,
    users: "9.8K",
  },
  {
    id: "10",
    title: "Dukungan Multibahasa",
    description: "Platform tersedia dalam berbagai bahasa daerah untuk kemudahan akses seluruh Indonesia",
    category: "Aksesibilitas",
    status: "coming-soon",
    icon: Globe,
    color: "bg-cyan-500",
    link: "#",
    tags: ["Multibahasa", "Aksesibilitas", "Inklusif"],
    rating: 0,
    users: "0",
  },
  {
    id: "11",
    title: "Live Chat Support",
    description: "Dapatkan bantuan langsung dari tim support melalui live chat 24/7",
    category: "Dukungan",
    status: "available",
    icon: MessageSquare,
    color: "bg-emerald-500",
    link: "/contact",
    tags: ["Support", "Live Chat", "24/7"],
    rating: 4.6,
    users: "16.3K",
  },
  {
    id: "12",
    title: "Sistem Verifikasi",
    description: "Verifikasi dokumen dan identitas dengan teknologi OCR dan AI untuk proses yang lebih cepat",
    category: "Verifikasi",
    status: "beta",
    icon: Shield,
    color: "bg-violet-500",
    link: "#",
    tags: ["Verifikasi", "OCR", "AI"],
    rating: 4.1,
    users: "7.2K",
  },
  {
    id: "13",
    title: "Analytics & Reporting",
    description: "Laporan komprehensif dan analytics untuk memantau efektivitas program bantuan",
    category: "Analytics",
    status: "available",
    icon: BarChart3,
    color: "bg-slate-500",
    link: "/dashboard",
    tags: ["Analytics", "Reporting", "Insights"],
    rating: 4.4,
    users: "11.5K",
  },
  {
    id: "14",
    title: "API Integration",
    description: "API terbuka untuk integrasi dengan sistem pemerintah dan organisasi mitra",
    category: "Developer",
    status: "beta",
    icon: Zap,
    color: "bg-amber-500",
    link: "#",
    tags: ["API", "Integration", "Developer"],
    rating: 4.0,
    users: "3.1K",
  },
  {
    id: "15",
    title: "Pusat Bantuan",
    description: "Dokumentasi lengkap, FAQ, dan panduan penggunaan untuk semua fitur platform",
    category: "Dukungan",
    status: "available",
    icon: HelpCircle,
    color: "bg-rose-500",
    link: "/contact",
    tags: ["Help", "FAQ", "Documentation"],
    rating: 4.3,
    users: "19.7K",
  },
  {
    id: "16",
    title: "Sistem Rating & Review",
    description: "Berikan feedback dan rating untuk program bantuan berdasarkan pengalaman Anda",
    category: "Feedback",
    status: "coming-soon",
    icon: Star,
    color: "bg-orange-400",
    link: "#",
    tags: ["Rating", "Review", "Feedback"],
    rating: 0,
    users: "0",
  },
]

const categories = [
  "Semua Kategori",
  "AI & Analytics",
  "Transparansi",
  "Dashboard",
  "Program",
  "Edukasi",
  "Kemitraan",
  "Keamanan",
  "Komunikasi",
  "Mobile",
  "Aksesibilitas",
  "Dukungan",
  "Verifikasi",
  "Analytics",
  "Developer",
  "Feedback",
]

const statusOptions = ["Semua Status", "available", "beta", "coming-soon"]

const sortOptions = ["Terbaru", "Rating Tertinggi", "Pengguna Terbanyak", "Nama A-Z", "Nama Z-A"]

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [sortBy, setSortBy] = useState("Terbaru")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Filter and sort features
  const filteredFeatures = features
    .filter((feature) => {
      const matchesSearch =
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "Semua Kategori" || feature.category === selectedCategory
      const matchesStatus = selectedStatus === "Semua Status" || feature.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Rating Tertinggi":
          return b.rating - a.rating
        case "Pengguna Terbanyak":
          return Number.parseFloat(b.users.replace("K", "")) - Number.parseFloat(a.users.replace("K", ""))
        case "Nama A-Z":
          return a.title.localeCompare(b.title)
        case "Nama Z-A":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFeatures = filteredFeatures.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Tersedia</Badge>
      case "beta":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Beta</Badge>
      case "coming-soon":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Segera Hadir</Badge>
      default:
        return null
    }
  }

  const FeatureCard = ({ feature }: { feature: Feature }) => {
    const IconComponent = feature.icon

    if (viewMode === "list") {
      return (
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`${feature.color} p-3 rounded-lg flex-shrink-0`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">{getStatusBadge(feature.status)}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{feature.rating > 0 ? feature.rating : "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{feature.users} pengguna</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {feature.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {feature.status === "available" ? (
                      <a href={feature.link}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Akses
                        </Button>
                      </a>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        {feature.status === "beta" ? "Beta" : "Segera"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.05] overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            {getStatusBadge(feature.status)}
          </div>
          <CardTitle className="text-lg group-hover:text-green-600 transition-colors">{feature.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-3">{feature.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{feature.rating > 0 ? feature.rating : "N/A"}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="h-4 w-4" />
                <span>{feature.users}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {feature.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="pt-2">
              {feature.status === "available" ? (
                <a href={feature.link} className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:bg-green-700">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Akses Fitur
                  </Button>
                </a>
              ) : (
                <Button className="w-full bg-transparent" variant="outline" disabled>
                  {feature.status === "beta" ? "Dalam Beta" : "Segera Hadir"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-24">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{features.length}</div>
              <p className="text-gray-600">Total Fitur</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {features.filter((f) => f.status === "available").length}
              </div>
              <p className="text-gray-600">Tersedia</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {features.filter((f) => f.status === "beta").length}
              </div>
              <p className="text-gray-600">Beta</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {features.filter((f) => f.status === "coming-soon").length}
              </div>
              <p className="text-gray-600">Segera Hadir</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari fitur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "Semua Status"
                        ? status
                        : status === "available"
                          ? "Tersedia"
                          : status === "beta"
                            ? "Beta"
                            : "Segera Hadir"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-600">
                Menampilkan {paginatedFeatures.length} dari {filteredFeatures.length} fitur
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid/List */}
        <div
          className={`mb-8 ${
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }`}
        >
          {paginatedFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada fitur yang ditemukan</h3>
              <p className="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Semua Kategori")
                  setSelectedStatus("Semua Status")
                }}
                variant="outline"
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Sebelumnya
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
