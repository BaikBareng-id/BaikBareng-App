"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  ThumbsUp,
  Share2,
  Bookmark,
  Calendar,
  User,
  Eye,
  Clock,
  Star,
  MessageCircle,
  Download,
} from "lucide-react"

// Mock video data
const video = {
  id: 1,
  title: "Cara Mendaftar dan Menggunakan BaikBareng",
  description:
    "Tutorial lengkap pendaftaran akun BaikBareng dan cara mengajukan bantuan sosial melalui platform. Video ini akan memandu Anda step-by-step dari awal hingga berhasil mengajukan bantuan.",
  duration: "8:45",
  views: "25.3K",
  likes: "2.1K",
  publishDate: "2024-01-12",
  category: "Tutorial Platform",
  thumbnail: "/Images/Placeholder/logo.png?height=400&width=800&text=BaikBareng+Tutorial+Video",
  difficulty: "Pemula",
  tags: ["Tutorial", "Pendaftaran", "BaikBareng", "Bantuan Sosial", "Platform"],
  videoUrl: "https://example.com/video.mp4", // In real app, this would be actual video URL
  chapters: [
    { time: "0:00", title: "Pengenalan BaikBareng" },
    { time: "1:30", title: "Cara Mendaftar Akun" },
    { time: "3:15", title: "Verifikasi Data Pribadi" },
    { time: "5:00", title: "Mengajukan Bantuan Sosial" },
    { time: "7:20", title: "Tracking Status Aplikasi" },
    { time: "8:30", title: "Tips dan Kesimpulan" },
  ],
  transcript: `
[0:00] Selamat datang di tutorial BaikBareng. Saya akan memandu Anda cara mendaftar dan menggunakan platform BaikBareng untuk mengakses berbagai program bantuan sosial pemerintah.

[0:30] BaikBareng adalah platform digital resmi Kementerian Sosial Republik Indonesia yang memudahkan masyarakat mengakses bantuan sosial. Platform ini aman, terpercaya, dan gratis untuk digunakan.

[1:30] Langkah pertama adalah mendaftar akun. Buka website BaikBareng.go.id atau download aplikasi mobile di Play Store atau App Store. Klik tombol "Daftar" di pojok kanan atas.

[2:00] Isi formulir pendaftaran dengan data yang benar: nama lengkap, email, nomor telepon, dan alamat. Pastikan semua data sesuai dengan dokumen resmi Anda.

[2:30] Buat password yang kuat dengan kombinasi huruf besar, huruf kecil, angka, dan simbol. Centang kotak persetujuan syarat dan ketentuan, lalu klik "Daftar".

[3:15] Setelah mendaftar, Anda perlu verifikasi email. Cek inbox email Anda dan klik link verifikasi. Jika tidak ada di inbox, cek folder spam.

[3:45] Login ke akun Anda dan lengkapi profil. Upload foto KTP, Kartu Keluarga, dan dokumen pendukung lainnya. Pastikan foto jelas dan dapat dibaca.

[4:30] Sistem akan melakukan verifikasi data dalam 3-7 hari kerja. Anda akan mendapat notifikasi via SMS dan email setelah verifikasi selesai.

[5:00] Setelah akun terverifikasi, Anda dapat mengajukan bantuan sosial. Pilih program yang sesuai dengan kebutuhan dan kriteria Anda.

[5:30] Isi formulir aplikasi dengan lengkap dan benar. Upload dokumen yang diperlukan sesuai dengan program yang dipilih.

[6:00] Review semua data sebelum submit. Pastikan tidak ada kesalahan karena data yang sudah disubmit tidak dapat diubah.

[6:30] Setelah submit, Anda akan mendapat nomor referensi. Simpan nomor ini untuk tracking status aplikasi Anda.

[7:20] Untuk mengecek status aplikasi, masuk ke dashboard dan klik "Status Aplikasi". Anda dapat melihat progress real-time dari aplikasi bantuan sosial Anda.

[7:45] Jika ada dokumen yang perlu diperbaiki, sistem akan memberitahu melalui notifikasi. Segera perbaiki dan upload ulang dokumen yang diminta.

[8:30] Tips penting: selalu gunakan data yang benar, simpan nomor referensi, dan periksa email secara berkala untuk update status. Terima kasih telah menonton tutorial ini.
  `,
}

const relatedVideos = [
  {
    id: 2,
    title: "Mengelola Keuangan Keluarga dengan Aplikasi Digital",
    category: "Literasi Keuangan",
    duration: "12:30",
    thumbnail: "/Images/Placeholder/logo.png?height=150&width=200&text=Family+Finance",
  },
  {
    id: 3,
    title: "Keamanan Transaksi Digital: Tips dan Trik",
    category: "Digital Banking",
    duration: "15:20",
    thumbnail: "/Images/Placeholder/logo.png?height=150&width=200&text=Digital+Security",
  },
  {
    id: 4,
    title: "Investasi Reksadana untuk Pemula",
    category: "Investasi Dasar",
    duration: "18:15",
    thumbnail: "/Images/Placeholder/logo.png?height=150&width=200&text=Mutual+Funds",
  },
]

export default function VideoDetailPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)

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
            {/* Video Player */}
            <div className="mb-8">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={video.thumbnail || "/Images/Placeholder/logo.png"}
                  alt={video.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-green-600" />
                    ) : (
                      <Play className="w-10 h-10 text-green-600 ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4 text-white">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-sm">2:45 / {video.duration}</span>
                    <Volume2 className="w-5 h-5" />
                    <Maximize className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="outline">{video.category}</Badge>
                <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{video.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{video.description}</p>

              {/* Video Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Tim Edukasi BaikBareng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(video.publishDate).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{video.views} views</span>
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
                  {isLiked ? "Disukai" : "Suka"} ({video.likes})
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
                  Download
                </Button>
              </div>
            </div>

            {/* Video Chapters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2 text-green-600" />
                  Chapter Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {video.chapters.map((chapter, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-green-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                          {chapter.title}
                        </div>
                        <div className="text-sm text-gray-500">{chapter.time}</div>
                      </div>
                      <Play className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                    Transkrip Video
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowTranscript(!showTranscript)}>
                    {showTranscript ? "Sembunyikan" : "Tampilkan"}
                  </Button>
                </div>
              </CardHeader>
              {showTranscript && (
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {video.transcript}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

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
              {/* Related Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Video Terkait</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedVideos.map((relatedVideo) => (
                      <a key={relatedVideo.id} href={`/education/videos/${relatedVideo.id}`}>
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <div className="relative flex-shrink-0">
                            <img
                              src={relatedVideo.thumbnail || "/Images/Placeholder/logo.png"}
                              alt={relatedVideo.title}
                              width={80}
                              height={60}
                              className="w-20 h-15 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1">
                              <Badge className="bg-black/70 text-white text-xs px-1 py-0">
                                {relatedVideo.duration}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 transition-colors">
                              {relatedVideo.title}
                            </h4>
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                {relatedVideo.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Video Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistik Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Views</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{video.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Likes</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{video.likes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Durasi</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{video.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Dipublikasi</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {new Date(video.publishDate).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Dapatkan Video Terbaru</h3>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                      Berlangganan untuk mendapatkan notifikasi video tutorial terbaru dari BaikBareng.
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
