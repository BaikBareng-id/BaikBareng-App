"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Shield,
  Database,
  Users,
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"

const legalSections = [
  {
    id: "terms",
    title: "Syarat & Ketentuan",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
    content: {
      lastUpdated: "15 Januari 2024",
      sections: [
        {
          title: "1. Penerimaan Syarat",
          content: `Dengan mengakses dan menggunakan platform BaikBareng, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.

Platform BaikBareng adalah layanan resmi Kementerian Sosial Republik Indonesia yang menyediakan akses digital untuk berbagai program bantuan sosial pemerintah.`,
        },
        {
          title: "2. Definisi",
          content: `• "Platform" mengacu pada website dan aplikasi mobile BaikBareng
• "Pengguna" adalah individu yang mengakses atau menggunakan platform
• "Layanan" mencakup semua fitur dan fungsi yang tersedia di platform
• "Data Pribadi" adalah informasi yang dapat mengidentifikasi pengguna secara langsung atau tidak langsung`,
        },
        {
          title: "3. Penggunaan Platform",
          content: `Pengguna diperbolehkan menggunakan platform untuk:
• Mendaftar dan mengajukan permohonan bantuan sosial
• Mengakses informasi program bantuan pemerintah
• Memantau status aplikasi bantuan sosial
• Berkomunikasi dengan tim support BaikBareng

Pengguna dilarang untuk:
• Memberikan informasi palsu atau menyesatkan
• Menggunakan platform untuk tujuan ilegal
• Mengganggu atau merusak sistem platform
• Menyalahgunakan data atau informasi yang diperoleh`,
        },
        {
          title: "4. Pendaftaran Akun",
          content: `Untuk menggunakan layanan tertentu, pengguna harus membuat akun dengan memberikan informasi yang akurat dan lengkap. Pengguna bertanggung jawab untuk:
• Menjaga kerahasiaan informasi akun
• Memperbarui informasi yang tidak akurat
• Melaporkan penggunaan akun yang tidak sah
• Menggunakan akun sesuai dengan tujuan yang dimaksudkan`,
        },
        {
          title: "5. Kewajiban Pengguna",
          content: `Pengguna wajib:
• Memberikan informasi yang benar dan akurat
• Mematuhi semua peraturan perundang-undangan yang berlaku
• Menghormati hak pengguna lain
• Menggunakan platform dengan itikad baik
• Melaporkan masalah keamanan yang ditemukan`,
        },
        {
          title: "6. Pembatasan Tanggung Jawab",
          content: `BaikBareng tidak bertanggung jawab atas:
• Kerugian yang timbul dari penggunaan platform
• Gangguan layanan karena faktor teknis
• Keputusan pemerintah terkait program bantuan sosial
• Tindakan pihak ketiga yang merugikan pengguna

Namun, kami berkomitmen untuk memberikan layanan terbaik dan mengatasi masalah yang timbul.`,
        },
        {
          title: "7. Perubahan Syarat",
          content: `BaikBareng berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui:
• Notifikasi di platform
• Email ke pengguna terdaftar
• Pengumuman di website resmi

Penggunaan platform setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.`,
        },
      ],
    },
  },
  {
    id: "privacy",
    title: "Kebijakan Privasi",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    content: {
      lastUpdated: "15 Januari 2024",
      sections: [
        {
          title: "1. Informasi yang Kami Kumpulkan",
          content: `Kami mengumpulkan informasi berikut:

Data Pribadi:
• Nama lengkap, alamat, nomor telepon
• Nomor KTP, Kartu Keluarga
• Informasi keuangan dan sosial ekonomi
• Foto dan dokumen pendukung

Data Teknis:
• Alamat IP dan informasi perangkat
• Log aktivitas dan penggunaan platform
• Cookies dan teknologi pelacakan serupa
• Lokasi geografis (dengan persetujuan)`,
        },
        {
          title: "2. Cara Kami Menggunakan Informasi",
          content: `Informasi digunakan untuk:
• Memproses aplikasi bantuan sosial
• Verifikasi identitas dan kelayakan
• Komunikasi terkait layanan
• Peningkatan kualitas platform
• Analisis dan pelaporan statistik
• Kepatuhan terhadap peraturan hukum`,
        },
        {
          title: "3. Pembagian Informasi",
          content: `Kami dapat membagikan informasi dengan:
• Instansi pemerintah terkait (Kemensos, Kemendagri, dll)
• Penyedia layanan teknologi yang terpercaya
• Lembaga verifikasi data
• Pihak berwenang sesuai ketentuan hukum

Kami tidak akan menjual atau menyewakan data pribadi Anda kepada pihak ketiga untuk tujuan komersial.`,
        },
        {
          title: "4. Keamanan Data",
          content: `Kami menerapkan langkah-langkah keamanan:
• Enkripsi data end-to-end
• Sistem autentikasi berlapis
• Monitoring keamanan 24/7
• Backup data reguler
• Akses terbatas berdasarkan kebutuhan
• Audit keamanan berkala`,
        },
        {
          title: "5. Hak Pengguna",
          content: `Anda memiliki hak untuk:
• Mengakses data pribadi yang kami miliki
• Meminta koreksi data yang tidak akurat
• Menghapus data dalam kondisi tertentu
• Membatasi pemrosesan data
• Portabilitas data
• Mengajukan keberatan pemrosesan`,
        },
        {
          title: "6. Penyimpanan Data",
          content: `Data disimpan selama:
• Akun aktif: selama akun digunakan
• Data aplikasi: 7 tahun setelah program berakhir
• Log sistem: 2 tahun
• Data komunikasi: 3 tahun

Data akan dihapus secara aman setelah periode penyimpanan berakhir.`,
        },
      ],
    },
  },
  {
    id: "blockchain",
    title: "Kebijakan Data Blockchain",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    content: {
      lastUpdated: "15 Januari 2024",
      sections: [
        {
          title: "1. Implementasi Blockchain",
          content: `BaikBareng menggunakan teknologi blockchain untuk:
• Memastikan transparansi distribusi bantuan
• Mencegah duplikasi dan fraud
• Menyimpan hash data untuk verifikasi
• Audit trail yang tidak dapat diubah
• Interoperabilitas antar sistem pemerintah`,
        },
        {
          title: "2. Data yang Disimpan di Blockchain",
          content: `Yang disimpan di blockchain:
• Hash data aplikasi (bukan data asli)
• Timestamp transaksi
• Status persetujuan/penolakan
• ID unik pengguna (terenkripsi)
• Metadata program bantuan

Yang TIDAK disimpan di blockchain:
• Data pribadi dalam bentuk asli
• Dokumen identitas
• Informasi sensitif lainnya`,
        },
        {
          title: "3. Sifat Immutable",
          content: `Perlu dipahami bahwa data di blockchain:
• Tidak dapat dihapus atau diubah
• Bersifat permanen dan transparan
• Dapat diakses untuk audit
• Terdistribusi di multiple nodes
• Memiliki timestamp yang akurat

Oleh karena itu, hanya hash dan metadata yang disimpan, bukan data pribadi.`,
        },
        {
          title: "4. Akses dan Transparansi",
          content: `Akses data blockchain:
• Publik dapat melihat statistik agregat
• Auditor dapat memverifikasi integritas data
• Pengguna dapat melacak status aplikasi
• Pemerintah dapat monitoring real-time
• Peneliti dapat mengakses data anonim`,
        },
        {
          title: "5. Keamanan Blockchain",
          content: `Keamanan dijamin melalui:
• Konsensus proof-of-authority
• Enkripsi kriptografi yang kuat
• Network yang terdistribusi
• Monitoring anomali otomatis
• Backup dan recovery procedures`,
        },
      ],
    },
  },
  {
    id: "rights",
    title: "Hak dan Kewajiban Pengguna",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900",
    content: {
      lastUpdated: "15 Januari 2024",
      sections: [
        {
          title: "1. Hak Pengguna",
          content: `Sebagai pengguna BaikBareng, Anda berhak:

Hak Akses:
• Mengakses platform 24/7
• Mendapatkan informasi program bantuan
• Mengajukan permohonan bantuan yang sesuai
• Memperoleh bantuan teknis

Hak Privasi:
• Perlindungan data pribadi
• Kontrol atas informasi yang dibagikan
• Notifikasi perubahan kebijakan
• Akses ke data yang disimpan

Hak Layanan:
• Mendapat pelayanan yang adil dan tidak diskriminatif
• Proses aplikasi yang transparan
• Informasi status aplikasi real-time
• Dukungan customer service`,
        },
        {
          title: "2. Kewajiban Pengguna",
          content: `Sebagai pengguna, Anda wajib:

Kewajiban Data:
• Memberikan informasi yang benar dan akurat
• Memperbarui data jika terjadi perubahan
• Melindungi kerahasiaan akun
• Melaporkan perubahan status ekonomi

Kewajiban Penggunaan:
• Menggunakan platform sesuai tujuan
• Mematuhi syarat dan ketentuan
• Tidak menyalahgunakan sistem
• Menghormati pengguna lain

Kewajiban Hukum:
• Mematuhi peraturan perundang-undangan
• Tidak melakukan tindakan fraud
• Melaporkan penyalahgunaan
• Kooperatif dalam proses verifikasi`,
        },
        {
          title: "3. Hak atas Data",
          content: `Berdasarkan regulasi perlindungan data:

Hak Akses:
• Mengetahui data apa saja yang dikumpulkan
• Meminta salinan data pribadi
• Informasi tujuan pemrosesan data
• Mengetahui pihak yang mengakses data

Hak Koreksi:
• Meminta perbaikan data yang salah
• Melengkapi data yang tidak lengkap
• Memperbarui informasi yang berubah
• Verifikasi keakuratan data

Hak Penghapusan:
• Meminta penghapusan data dalam kondisi tertentu
• Penarikan persetujuan pemrosesan
• Data yang tidak lagi diperlukan
• Keberatan atas pemrosesan`,
        },
        {
          title: "4. Kewajiban Platform",
          content: `BaikBareng berkomitmen untuk:

Kewajiban Layanan:
• Menyediakan platform yang stabil dan aman
• Memberikan informasi yang akurat
• Proses aplikasi yang fair dan transparan
• Dukungan teknis yang responsif

Kewajiban Perlindungan:
• Melindungi data pribadi pengguna
• Mencegah akses tidak sah
• Memberitahu jika terjadi pelanggaran data
• Mematuhi regulasi perlindungan data

Kewajiban Transparansi:
• Menjelaskan proses pengambilan keputusan
• Memberikan alasan penolakan aplikasi
• Publikasi statistik program
• Laporan kinerja berkala`,
        },
        {
          title: "5. Penyelesaian Sengketa",
          content: `Jika terjadi sengketa:

Langkah Pertama:
• Hubungi customer service BaikBareng
• Ajukan keluhan melalui platform
• Berikan detail masalah yang dihadapi
• Tunggu respons dalam 3x24 jam

Eskalasi:
• Jika tidak puas, hubungi supervisor
• Ajukan banding melalui sistem
• Minta mediasi dengan pihak ketiga
• Konsultasi dengan ombudsman

Jalur Hukum:
• Pengadilan negeri setempat
• Arbitrase sesuai kesepakatan
• Mediasi melalui lembaga resmi
• Bantuan hukum jika diperlukan`,
        },
      ],
    },
  },
]

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("terms")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const currentSection = legalSections.find((section) => section.id === activeSection)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Navigasi Legal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {legalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <section.icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {section.content.sections.length} bagian
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentSection && (
              <div className="space-y-6">
                {/* Section Header */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${currentSection.bgColor}`}>
                        <currentSection.icon className={`w-6 h-6 ${currentSection.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentSection.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>Terakhir diperbarui: {currentSection.content.lastUpdated}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Berlaku
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Content Sections */}
                <div className="space-y-4">
                  {currentSection.content.sections.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toggleExpanded(`${activeSection}-${index}`)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </CardTitle>
                          {expandedItems.includes(`${activeSection}-${index}`) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedItems.includes(`${activeSection}-${index}`) && (
                        <CardContent className="animate-fade-in-up">
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.content}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Important Notice */}
                <Card className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                          Pemberitahuan Penting
                        </h3>
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                          Dokumen legal ini dapat berubah sewaktu-waktu sesuai dengan perkembangan regulasi dan
                          kebijakan pemerintah. Kami akan memberitahukan perubahan melalui email dan notifikasi di
                          platform. Dengan terus menggunakan BaikBareng, Anda dianggap menyetujui perubahan yang
                          dilakukan.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact for Legal Questions */}
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Pertanyaan Legal?</h3>
                        <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed mb-4">
                          Jika Anda memiliki pertanyaan terkait aspek legal BaikBareng, silakan hubungi tim legal kami
                          atau kunjungi halaman kontak untuk informasi lebih lanjut.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a href="/contact">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">Hubungi Tim Legal</Button>
                          </a>
                          <Button
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                          >
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
