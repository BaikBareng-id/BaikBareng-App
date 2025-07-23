"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  Calendar,
  User,
  ChevronRight,
  Star,
  MessageCircle,
  Download,
  PrinterIcon as Print,
} from "lucide-react"

// Mock article data - in real app, this would come from API
const article = {
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
  authorBio:
    "Tim ahli keuangan dan edukasi dari BaikBareng yang berpengalaman dalam literasi keuangan masyarakat Indonesia.",
  image: "/Images/Placeholder/logo.png?height=400&width=800&text=Financial+Literacy+Article",
  difficulty: "Pemula",
  tags: ["Literasi Keuangan", "Budgeting", "Menabung", "Investasi", "Keluarga"],
  content: `
# Mengapa Literasi Keuangan Penting?

Literasi keuangan adalah kemampuan untuk memahami dan menggunakan berbagai keterampilan keuangan, termasuk manajemen keuangan pribadi, penganggaran, dan investasi. Di Indonesia, tingkat literasi keuangan masih relatif rendah, padahal kemampuan ini sangat penting untuk mencapai kesejahteraan finansial.

## 1. Memahami Pendapatan dan Pengeluaran

Langkah pertama dalam mengelola keuangan keluarga adalah memahami dengan jelas berapa pendapatan dan pengeluaran bulanan Anda. Buatlah catatan detail tentang:

### Pendapatan:
- Gaji pokok
- Tunjangan
- Penghasilan sampingan
- Bonus atau insentif

### Pengeluaran:
- Kebutuhan pokok (makanan, tempat tinggal, transportasi)
- Tagihan rutin (listrik, air, internet, telepon)
- Pendidikan anak
- Kesehatan
- Hiburan dan rekreasi

## 2. Membuat Anggaran Keluarga

Setelah memahami arus kas, langkah selanjutnya adalah membuat anggaran. Gunakan rumus 50-30-20:

- **50% untuk kebutuhan pokok**: Makanan, tempat tinggal, transportasi, tagihan rutin
- **30% untuk keinginan**: Hiburan, makan di luar, hobi
- **20% untuk tabungan dan investasi**: Dana darurat, tabungan, investasi

### Tips Membuat Anggaran:
1. Catat semua pengeluaran selama sebulan
2. Kategorikan pengeluaran berdasarkan prioritas
3. Tetapkan batas untuk setiap kategori
4. Review dan sesuaikan setiap bulan

## 3. Membangun Dana Darurat

Dana darurat adalah tabungan yang disisihkan khusus untuk menghadapi situasi tak terduga seperti kehilangan pekerjaan, sakit, atau kerusakan rumah. Idealnya, dana darurat setara dengan 6-12 bulan pengeluaran rutin keluarga.

### Cara Membangun Dana Darurat:
- Mulai dengan target kecil (Rp 1 juta)
- Sisihkan 10-15% dari pendapatan bulanan
- Simpan di rekening terpisah yang mudah diakses
- Jangan gunakan untuk keperluan non-darurat

## 4. Menabung untuk Tujuan Jangka Pendek dan Panjang

Setelah memiliki dana darurat, mulailah menabung untuk tujuan-tujuan spesifik:

### Tujuan Jangka Pendek (1-3 tahun):
- Liburan keluarga
- Renovasi rumah
- Pembelian kendaraan

### Tujuan Jangka Panjang (5+ tahun):
- Pendidikan anak
- Pembelian rumah
- Persiapan pensiun

## 5. Pengenalan Investasi Sederhana

Untuk masyarakat pemula, mulailah dengan investasi yang aman dan mudah dipahami:

### Deposito:
- Risiko rendah
- Return tetap
- Dijamin LPS hingga Rp 2 miliar

### Reksadana:
- Dikelola oleh manajer investasi profesional
- Diversifikasi otomatis
- Mulai dari Rp 100.000

### Emas:
- Hedge terhadap inflasi
- Mudah dicairkan
- Nilai cenderung stabil dalam jangka panjang

## 6. Mengelola Utang dengan Bijak

Jika memiliki utang, prioritaskan pelunasan dengan strategi:

1. **Debt Snowball**: Bayar utang terkecil dulu
2. **Debt Avalanche**: Bayar utang dengan bunga tertinggi dulu
3. Hindari utang konsumtif
4. Pertimbangkan konsolidasi utang jika memungkinkan

## 7. Melindungi Keluarga dengan Asuransi

Asuransi adalah perlindungan finansial untuk keluarga:

### Jenis Asuransi Penting:
- **Asuransi Kesehatan**: BPJS Kesehatan + asuransi swasta
- **Asuransi Jiwa**: Untuk pencari nafkah utama
- **Asuransi Kendaraan**: Jika memiliki kendaraan bermotor

## 8. Mengajarkan Literasi Keuangan pada Anak

Mulai ajarkan konsep uang pada anak sejak dini:

- Berikan uang saku dan ajarkan cara mengelolanya
- Ajak anak saat berbelanja dan jelaskan proses pengambilan keputusan
- Buka rekening tabungan anak
- Ajarkan perbedaan antara kebutuhan dan keinginan

## Kesimpulan

Literasi keuangan adalah keterampilan yang dapat dipelajari dan dikembangkan. Mulailah dengan langkah-langkah sederhana seperti mencatat pengeluaran dan membuat anggaran. Dengan konsistensi dan disiplin, Anda dapat mencapai kesejahteraan finansial untuk keluarga.

Ingatlah bahwa perjalanan menuju kebebasan finansial adalah maraton, bukan sprint. Tetap sabar, konsisten, dan terus belajar untuk meningkatkan kemampuan mengelola keuangan keluarga.
  `,
}

const relatedArticles = [
  {
    id: 2,
    title: "Memahami Program Bantuan Sosial: Hak dan Kewajiban Penerima",
    category: "Bantuan Sosial",
    readTime: "12 menit",
    image: "/Images/Placeholder/logo.png?height=150&width=200&text=Social+Assistance",
  },
  {
    id: 3,
    title: "Digital Banking untuk Pemula: Panduan Aman Bertransaksi Online",
    category: "Digital Banking",
    readTime: "10 menit",
    image: "/Images/Placeholder/logo.png?height=150&width=200&text=Digital+Banking",
  },
  {
    id: 4,
    title: "Investasi Sederhana untuk Masyarakat Berpenghasilan Rendah",
    category: "Investasi Dasar",
    readTime: "18 menit",
    image: "/Images/Placeholder/logo.png?height=150&width=200&text=Investment+Basics",
  },
]

export default function ArticleDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="outline">{article.category}</Badge>
                <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{article.excerpt}</p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishDate).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {isLiked ? "Disukai" : "Suka"} ({article.likes})
                </Button>
                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  {isBookmarked ? "Tersimpan" : "Simpan"}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Print className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={article.image || "/Images/Placeholder/logo.png"}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br />") }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{article.author}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{article.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  Diskusi & Komentar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fitur komentar akan segera hadir!</p>
                  <p className="text-sm">Sementara ini, Anda dapat memberikan feedback melalui halaman kontak.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Isi</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2 text-sm">
                    <a href="#" className="block text-green-600 hover:text-green-700 py-1">
                      1. Memahami Pendapatan dan Pengeluaran
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      2. Membuat Anggaran Keluarga
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      3. Membangun Dana Darurat
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      4. Menabung untuk Tujuan
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      5. Pengenalan Investasi Sederhana
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      6. Mengelola Utang dengan Bijak
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      7. Melindungi Keluarga dengan Asuransi
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 py-1">
                      8. Mengajarkan Literasi Keuangan pada Anak
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Artikel Terkait</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <a key={relatedArticle.id} href={`/education/articles/${relatedArticle.id}`}>
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <img
                            src={relatedArticle.image || "/Images/Placeholder/logo.png"}
                            alt={relatedArticle.title}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                              {relatedArticle.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {relatedArticle.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{relatedArticle.readTime}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Dapatkan Artikel Terbaru</h3>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                      Berlangganan newsletter untuk mendapatkan artikel edukasi terbaru langsung di email Anda.
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Berlangganan</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
