"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Building2,
  Globe,
  Users,
  Award,
  Handshake,
  Star,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

const partnerCategories = [
  "Semua Partner",
  "Instansi Pemerintah",
  "Sponsor Utama",
  "Media Partner",
  "Organisasi Masyarakat",
  "Lembaga Keuangan",
  "Teknologi Partner",
  "NGO & Yayasan",
]

const partners = [
  // Government Institutions
  {
    id: 1,
    name: "Kementerian Sosial RI",
    category: "Instansi Pemerintah",
    type: "Pemerintah",
    description:
      "Kementerian Sosial Republik Indonesia sebagai induk organisasi BaikBareng yang bertanggung jawab atas kebijakan dan implementasi program bantuan sosial nasional.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Kemensos+RI",
    website: "https://kemsos.go.id",
    email: "info@kemsos.go.id",
    phone: "021-3103591",
    address: "Jl. Salemba Raya No. 28, Jakarta Pusat",
    established: "1945",
    partnership_since: "2020",
    featured: true,
    rating: 5,
  },
  {
    id: 2,
    name: "Kementerian Dalam Negeri RI",
    category: "Instansi Pemerintah",
    type: "Pemerintah",
    description:
      "Kementerian Dalam Negeri berperan dalam verifikasi data kependudukan dan administrasi untuk memastikan akurasi data penerima bantuan sosial.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Kemendagri",
    website: "https://kemendagri.go.id",
    email: "info@kemendagri.go.id",
    phone: "021-3842222",
    address: "Jl. Medan Merdeka Utara No. 7, Jakarta Pusat",
    established: "1945",
    partnership_since: "2020",
    featured: false,
    rating: 5,
  },
  {
    id: 3,
    name: "Bank Indonesia",
    category: "Lembaga Keuangan",
    type: "Pemerintah",
    description:
      "Bank sentral Indonesia yang mendukung implementasi sistem pembayaran digital untuk penyaluran bantuan sosial melalui BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Bank+Indonesia",
    website: "https://bi.go.id",
    email: "bicara@bi.go.id",
    phone: "021-2981-1000",
    address: "Jl. MH Thamrin No. 2, Jakarta Pusat",
    established: "1953",
    partnership_since: "2021",
    featured: true,
    rating: 5,
  },
  // Major Sponsors
  {
    id: 4,
    name: "PT Telkom Indonesia",
    category: "Sponsor Utama",
    type: "Swasta",
    description:
      "Penyedia infrastruktur telekomunikasi dan teknologi informasi yang mendukung konektivitas platform BaikBareng ke seluruh Indonesia.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Telkom+Indonesia",
    website: "https://telkom.co.id",
    email: "info@telkom.co.id",
    phone: "021-52903000",
    address: "Jl. Japati No. 1, Bandung",
    established: "1884",
    partnership_since: "2020",
    featured: true,
    rating: 4.8,
  },
  {
    id: 5,
    name: "PT Bank Mandiri",
    category: "Sponsor Utama",
    type: "Swasta",
    description:
      "Bank terbesar di Indonesia yang menyediakan layanan perbankan dan sistem pembayaran untuk penyaluran bantuan sosial BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Bank+Mandiri",
    website: "https://bankmandiri.co.id",
    email: "mandiricare@bankmandiri.co.id",
    phone: "14000",
    address: "Plaza Mandiri, Jl. Jend. Gatot Subroto, Jakarta",
    established: "1998",
    partnership_since: "2020",
    featured: true,
    rating: 4.9,
  },
  // Media Partners
  {
    id: 6,
    name: "TVRI",
    category: "Media Partner",
    type: "Media",
    description:
      "Televisi Republik Indonesia sebagai media partner utama untuk sosialisasi dan edukasi program BaikBareng kepada masyarakat luas.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=TVRI",
    website: "https://tvri.go.id",
    email: "info@tvri.go.id",
    phone: "021-5734567",
    address: "Jl. Gerbang Pemuda, Jakarta Timur",
    established: "1962",
    partnership_since: "2021",
    featured: false,
    rating: 4.5,
  },
  {
    id: 7,
    name: "Kompas Media",
    category: "Media Partner",
    type: "Media",
    description:
      "Grup media terbesar Indonesia yang membantu penyebaran informasi dan edukasi tentang program bantuan sosial melalui BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Kompas+Media",
    website: "https://kompas.com",
    email: "redaksi@kompas.com",
    phone: "021-5347710",
    address: "Jl. Palmerah Selatan, Jakarta Pusat",
    established: "1965",
    partnership_since: "2021",
    featured: true,
    rating: 4.7,
  },
  // Civil Society Organizations
  {
    id: 8,
    name: "Rumah Zakat",
    category: "Organisasi Masyarakat",
    type: "NGO",
    description:
      "Lembaga amil zakat nasional yang berkolaborasi dalam penyaluran bantuan sosial dan pemberdayaan masyarakat melalui platform BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Rumah+Zakat",
    website: "https://rumahzakat.org",
    email: "info@rumahzakat.org",
    phone: "022-7335566",
    address: "Jl. Turangga No. 28, Bandung",
    established: "1998",
    partnership_since: "2022",
    featured: false,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Dompet Dhuafa",
    category: "NGO & Yayasan",
    type: "NGO",
    description:
      "Lembaga sosial yang fokus pada pemberdayaan masyarakat dan pengentasan kemiskinan, berpartner dengan BaikBareng dalam program bantuan sosial.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Dompet+Dhuafa",
    website: "https://dompetdhuafa.org",
    email: "info@dompetdhuafa.org",
    phone: "021-7918-7918",
    address: "Jl. TB Simatupang, Jakarta Selatan",
    established: "1993",
    partnership_since: "2022",
    featured: true,
    rating: 4.8,
  },
  // Technology Partners
  {
    id: 10,
    name: "Microsoft Indonesia",
    category: "Teknologi Partner",
    type: "Swasta",
    description:
      "Penyedia solusi cloud computing dan teknologi yang mendukung infrastruktur digital platform BaikBareng dengan keamanan tingkat enterprise.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Microsoft",
    website: "https://microsoft.com/id-id",
    email: "info@microsoft.com",
    phone: "021-2995-7888",
    address: "Menara Astra, Jakarta Selatan",
    established: "1975",
    partnership_since: "2021",
    featured: true,
    rating: 4.9,
  },
  {
    id: 11,
    name: "Google Indonesia",
    category: "Teknologi Partner",
    type: "Swasta",
    description:
      "Partner teknologi yang menyediakan layanan cloud, analytics, dan AI untuk meningkatkan efisiensi dan akurasi sistem BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Google",
    website: "https://google.co.id",
    email: "support@google.com",
    phone: "021-2995-7000",
    address: "Equity Tower, Jakarta Selatan",
    established: "1998",
    partnership_since: "2021",
    featured: false,
    rating: 4.8,
  },
  // Financial Institutions
  {
    id: 12,
    name: "PT Bank BRI",
    category: "Lembaga Keuangan",
    type: "Swasta",
    description:
      "Bank terbesar kedua di Indonesia yang menyediakan layanan perbankan dan jaringan ATM untuk kemudahan akses bantuan sosial BaikBareng.",
    logo: "/Images/Placeholder/logo.png?height=100&width=200&text=Bank+BRI",
    website: "https://bri.co.id",
    email: "callbri@bri.co.id",
    phone: "14017",
    address: "Jl. Jend. Sudirman, Jakarta Pusat",
    established: "1895",
    partnership_since: "2020",
    featured: true,
    rating: 4.7,
  },
]

const stats = [
  { icon: Building2, label: "Total Partner", value: "150+", color: "text-green-600" },
  { icon: Globe, label: "Negara", value: "1", color: "text-blue-600" },
  { icon: Users, label: "Beneficiaries", value: "50M+", color: "text-purple-600" },
  { icon: Award, label: "Penghargaan", value: "25+", color: "text-orange-600" },
]

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Partner")

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua Partner" || partner.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPartners = partners.filter((partner) => partner.featured)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Pemerintah":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Swasta":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "NGO":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Media":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bersama Membangun Indonesia yang Lebih Baik
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            BaikBareng berkolaborasi dengan berbagai institusi pemerintah, perusahaan swasta, media, dan organisasi
            masyarakat untuk mewujudkan program bantuan sosial yang efektif dan berkelanjutan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari partner..."
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filter Partner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                  <div className="space-y-1">
                    {partnerCategories.map((category) => (
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
                    setSelectedCategory("Semua Partner")
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
            {/* Featured Partners */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Partner Utama
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPartners.slice(0, 6).map((partner) => (
                  <Card
                    key={partner.id}
                    className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-l-4 border-l-green-500"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="relative mx-auto mb-4">
                        <img
                          src={partner.logo || "/Images/Placeholder/logo.png"}
                          alt={partner.name}
                          width={120}
                          height={60}
                          className="h-16 w-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Badge className={getTypeColor(partner.type)}>{partner.type}</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <Star className="w-3 h-3 mr-1" />
                          Utama
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                        {partner.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {partner.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{partner.description}</p>

                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center justify-between">
                          <span>Didirikan:</span>
                          <span className="font-medium">{partner.established}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Partner sejak:</span>
                          <span className="font-medium">{partner.partnership_since}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(partner.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 font-medium">{partner.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="w-3 h-3 mr-1" />
                          Kontak
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Partners */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Handshake className="w-6 h-6 text-green-600 mr-2" />
                Semua Partner ({filteredPartners.length})
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="relative mx-auto mb-4">
                        <img
                          src={partner.logo || "/Images/Placeholder/logo.png"}
                          alt={partner.name}
                          width={120}
                          height={60}
                          className="h-16 w-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Badge className={getTypeColor(partner.type)}>{partner.type}</Badge>
                        {partner.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <Star className="w-3 h-3 mr-1" />
                            Utama
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                        {partner.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {partner.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{partner.description}</p>

                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{partner.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3" />
                          <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Partner sejak:</span>
                          <span className="font-medium">{partner.partnership_since}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(partner.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 font-medium">{partner.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="w-3 h-3 mr-1" />
                          Kontak
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPartners.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Tidak ada partner ditemukan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Coba ubah filter atau kata kunci pencarian Anda
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("Semua Partner")
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Partnership CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ingin Menjadi Partner BaikBareng?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan jaringan mitra strategis kami untuk bersama-sama membangun Indonesia yang lebih baik
            melalui program bantuan sosial yang efektif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Handshake className="w-5 h-5 mr-2" />
              Ajukan Kemitraan
            </Button>
            <a href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
