"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Video,
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  Award,
  ChevronRight,
  Eye,
  ThumbsUp,
} from "lucide-react"

const categories = [
  "Semua Kategori",
  "Literasi Keuangan",
  "Bantuan Sosial",
  "Digital Banking",
  "Investasi Dasar",
  "Perencanaan Keuangan",
  "Kewirausahaan",
  "Teknologi Finansial",
]

const articles = [
  {
    id: 1,
    title: "Panduan Lengkap Literasi Keuangan untuk Keluarga Indonesia",
    excerpt:
      "Pelajari dasar-dasar pengelolaan keuangan keluarga, mulai dari budgeting, menabung, hingga investasi sederhana yang cocok untuk masyarakat Indonesia.",
    category: "Literasi Keuangan",
    readTime: "15 menit",
    views: "12.5K",
    likes: "1.2K",
    publishDate: "2024-01-15",
    author: "Tim Edukasi BaikBareng",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Financial+Literacy",
    featured: true,
    difficulty: "Pemula",
  },
  {
    id: 2,
    title: "Memahami Program Bantuan Sosial: Hak dan Kewajiban Penerima",
    excerpt:
      "Panduan komprehensif tentang berbagai program bantuan sosial pemerintah, kriteria penerima, dan cara memanfaatkan bantuan dengan bijak.",
    category: "Bantuan Sosial",
    readTime: "12 menit",
    views: "8.7K",
    likes: "890",
    publishDate: "2024-01-10",
    author: "Dr. Sari Wijayanti",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Social+Assistance",
    featured: false,
    difficulty: "Pemula",
  },
  {
    id: 3,
    title: "Digital Banking untuk Pemula: Panduan Aman Bertransaksi Online",
    excerpt:
      "Pelajari cara menggunakan layanan perbankan digital dengan aman, termasuk tips keamanan dan cara menghindari penipuan online.",
    category: "Digital Banking",
    readTime: "10 menit",
    views: "15.2K",
    likes: "1.8K",
    publishDate: "2024-01-08",
    author: "Ahmad Hidayat, S.E.",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Digital+Banking",
    featured: true,
    difficulty: "Pemula",
  },
  {
    id: 4,
    title: "Investasi Sederhana untuk Masyarakat Berpenghasilan Rendah",
    excerpt:
      "Strategi investasi yang cocok untuk masyarakat dengan penghasilan terbatas, mulai dari tabungan berjangka hingga investasi mikro.",
    category: "Investasi Dasar",
    readTime: "18 menit",
    views: "6.3K",
    likes: "654",
    publishDate: "2024-01-05",
    author: "Ratna Sari, M.M.",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Investment+Basics",
    featured: false,
    difficulty: "Menengah",
  },
  {
    id: 5,
    title: "Perencanaan Keuangan Keluarga: Dari Darurat hingga Pensiun",
    excerpt:
      "Panduan lengkap membuat perencanaan keuangan keluarga yang sehat, termasuk dana darurat, asuransi, dan persiapan pensiun.",
    category: "Perencanaan Keuangan",
    readTime: "20 menit",
    views: "9.1K",
    likes: "1.1K",
    publishDate: "2024-01-03",
    author: "Budi Santoso, CFP",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Financial+Planning",
    featured: false,
    difficulty: "Menengah",
  },
  {
    id: 6,
    title: "Memulai Usaha Kecil dengan Modal Bantuan Sosial",
    excerpt:
      "Tips dan strategi memulai usaha kecil menggunakan bantuan modal dari program pemerintah, termasuk perencanaan bisnis sederhana.",
    category: "Kewirausahaan",
    readTime: "16 menit",
    views: "11.8K",
    likes: "1.5K",
    publishDate: "2024-01-01",
    author: "Indira Putri, S.E.",
    image: "/Images/Placeholder/logo.png?height=200&width=300&text=Small+Business",
    featured: true,
    difficulty: "Menengah",
  },
]

const videos = [
  {
    id: 1,
    title: "Cara Mendaftar dan Menggunakan BaikBareng",
    description: "Tutorial lengkap pendaftaran akun BaikBareng dan cara mengajukan bantuan sosial melalui platform.",
    duration: "8:45",
    views: "25.3K",
    likes: "2.1K",
    publishDate: "2024-01-12",
    category: "Tutorial Platform",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=BaikBareng+Tutorial",
    difficulty: "Pemula",
    featured: true,
  },
  {
    id: 2,
    title: "Mengelola Keuangan Keluarga dengan Aplikasi Digital",
    description: "Panduan praktis menggunakan aplikasi keuangan untuk budgeting dan tracking pengeluaran keluarga.",
    duration: "12:30",
    views: "18.7K",
    likes: "1.6K",
    publishDate: "2024-01-10",
    category: "Literasi Keuangan",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=Family+Finance",
    difficulty: "Pemula",
    featured: false,
  },
  {
    id: 3,
    title: "Keamanan Transaksi Digital: Tips dan Trik",
    description:
      "Pelajari cara melindungi diri dari penipuan online dan menjaga keamanan data pribadi saat bertransaksi.",
    duration: "15:20",
    views: "22.1K",
    likes: "1.9K",
    publishDate: "2024-01-08",
    category: "Digital Banking",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=Digital+Security",
    difficulty: "Menengah",
    featured: true,
  },
  {
    id: 4,
    title: "Investasi Reksadana untuk Pemula",
    description:
      "Pengenalan investasi reksadana, cara memilih produk yang tepat, dan strategi investasi jangka panjang.",
    duration: "18:15",
    views: "14.5K",
    likes: "1.3K",
    publishDate: "2024-01-05",
    category: "Investasi Dasar",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=Mutual+Funds",
    difficulty: "Menengah",
    featured: false,
  },
  {
    id: 5,
    title: "Membangun Usaha Mikro dari Nol",
    description: "Langkah-langkah praktis memulai usaha mikro, dari ide bisnis hingga strategi pemasaran sederhana.",
    duration: "22:40",
    views: "16.8K",
    likes: "1.7K",
    publishDate: "2024-01-03",
    category: "Kewirausahaan",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=Micro+Business",
    difficulty: "Menengah",
    featured: false,
  },
  {
    id: 6,
    title: "Fintech dan Masa Depan Keuangan Indonesia",
    description: "Eksplorasi perkembangan teknologi finansial di Indonesia dan dampaknya terhadap inklusi keuangan.",
    duration: "20:10",
    views: "12.3K",
    likes: "1.1K",
    publishDate: "2024-01-01",
    category: "Teknologi Finansial",
    thumbnail: "/Images/Placeholder/logo.png?height=200&width=300&text=Fintech+Future",
    difficulty: "Lanjutan",
    featured: true,
  },
]

const stats = [
  { icon: BookOpen, label: "Total Artikel", value: "150+", color: "text-green-600" },
  { icon: Video, label: "Video Tutorial", value: "85+", color: "text-blue-600" },
  { icon: Users, label: "Pengguna Aktif", value: "50K+", color: "text-purple-600" },
  { icon: Award, label: "Rating Rata-rata", value: "4.8/5", color: "text-orange-600" },
]

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [activeTab, setActiveTab] = useState("articles")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua Kategori" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua Kategori" || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Menengah":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Lanjutan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Belajar Literasi Keuangan & Digital</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Akses ribuan artikel dan video tutorial gratis untuk meningkatkan pemahaman Anda tentang keuangan dan
            teknologi digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari artikel atau video..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-0"
              />
            </div>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              <Search className="w-4 h-4 mr-2" />
              Cari
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs and Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filter Konten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Tabs */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Konten</label>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => setActiveTab("articles")}
                      className={`flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                        activeTab === "articles"
                          ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Artikel ({articles.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("videos")}
                      className={`flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                        activeTab === "videos"
                          ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Video className="w-5 h-5" />
                      <span>Video ({videos.length})</span>
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Semua Kategori")
                  }}
                  className="w-full"
                >
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Content */}
            {activeTab === "articles" && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artikel Unggulan</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles
                    .filter((article) => article.featured)
                    .slice(0, 3)
                    .map((article) => (
                      <Card
                        key={article.id}
                        className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={article.image || "/Images/Placeholder/logo.png"}
                            alt={article.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Unggulan
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                            {article.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.excerpt}</p>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{article.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{article.likes}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(article.publishDate).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                          <a href={`/education/articles/${article.id}`}>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                              Baca Artikel
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Video Unggulan</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos
                    .filter((video) => video.featured)
                    .slice(0, 3)
                    .map((video) => (
                      <Card
                        key={video.id}
                        className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/Images/Placeholder/logo.png"}
                            alt={video.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-green-600 ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Unggulan
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {video.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                            {video.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{video.description}</p>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{video.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{video.likes}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(video.publishDate).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                          <a href={`/education/videos/${video.id}`}>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                              Tonton Video
                              <Play className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* All Content */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {activeTab === "articles" ? "Semua Artikel" : "Semua Video"}
              </h3>

              {activeTab === "articles" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={article.image || "/Images/Placeholder/logo.png"}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                        </div>
                        {article.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Unggulan
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                          {article.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.excerpt}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{article.likes}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(article.publishDate).toLocaleDateString("id-ID")}
                          </div>
                        </div>
                        <a href={`/education/articles/${article.id}`}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Baca Artikel
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "videos" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <Card
                      key={video.id}
                      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/Images/Placeholder/logo.png"}
                          alt={video.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-green-600 ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
                        </div>
                        {video.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Unggulan
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {video.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                          {video.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{video.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{video.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{video.likes}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(video.publishDate).toLocaleDateString("id-ID")}
                          </div>
                        </div>
                        <a href={`/education/videos/${video.id}`}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Tonton Video
                            <Play className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
