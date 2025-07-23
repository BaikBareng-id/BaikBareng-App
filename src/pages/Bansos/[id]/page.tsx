"use client"

import { useState } from "react"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock data for program detail
const programData = {
  id: "PKH-2024-001",
  title: "Program Keluarga Harapan (PKH)",
  subtitle: "Bantuan Tunai Bersyarat untuk Keluarga Miskin",
  description:
    "Program Keluarga Harapan (PKH) adalah program bantuan sosial bersyarat yang memberikan bantuan tunai kepada Keluarga Penerima Manfaat (KPM) yang sangat miskin dan rentan, dengan syarat memenuhi komitmen di bidang kesehatan dan pendidikan.",
  image: "/Images/Placeholder/logo.png?height=400&width=800&text=PKH+Program+Image",
  organization: {
    name: "Kementerian Sosial Republik Indonesia",
    type: "Pemerintah Pusat",
    logo: "/Images/Placeholder/logo.png?height=80&width=80&text=Kemensos+Logo",
    contact: {
      phone: "021-31903567",
      email: "pkh@kemsos.go.id",
      website: "https://pkh.kemsos.go.id",
    },
  },
  status: "active",
  category: "Bantuan Tunai",
  budget: "Rp 28.7 Triliun",
  beneficiaries: "10.2 Juta Keluarga",
  coverage: "Seluruh Indonesia",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  applicationDeadline: "2024-11-30",
  benefits: {
    regular: "Rp 750.000 per keluarga per tahun",
    pregnant: "Rp 3.000.000 untuk ibu hamil",
    children: "Rp 1.000.000 per anak usia sekolah",
    elderly: "Rp 2.400.000 untuk lansia",
  },
  eligibility: [
    "Keluarga sangat miskin berdasarkan Data Terpadu Kesejahteraan Sosial (DTKS)",
    "Memiliki komponen keluarga: ibu hamil/menyusui, anak usia 0-6 tahun, atau anak usia sekolah SD-SMA",
    "Tinggal di lokasi yang telah ditetapkan sebagai lokus PKH",
    "Bersedia memenuhi komitmen di bidang kesehatan dan pendidikan",
    "Tidak sedang menerima bantuan sosial sejenis dari pemerintah",
  ],
  requirements: [
    "Kartu Tanda Penduduk (KTP) yang masih berlaku",
    "Kartu Keluarga (KK) asli dan fotokopi",
    "Surat Keterangan Tidak Mampu (SKTM) dari kelurahan/desa",
    "Akta kelahiran anak (jika ada anak)",
    "Surat keterangan hamil dari puskesmas (jika ada ibu hamil)",
    "Kartu pelajar atau surat keterangan sekolah (untuk anak usia sekolah)",
    "Rekening bank atau buku tabungan",
  ],
  timeline: [
    {
      phase: "Pendaftaran",
      duration: "1-2 minggu",
      description: "Pengajuan aplikasi dan pengumpulan dokumen",
      status: "active",
    },
    {
      phase: "Verifikasi Data",
      duration: "2-3 minggu",
      description: "Verifikasi dokumen dan validasi data oleh petugas",
      status: "pending",
    },
    {
      phase: "Survei Lapangan",
      duration: "1-2 minggu",
      description: "Kunjungan petugas untuk verifikasi kondisi keluarga",
      status: "pending",
    },
    {
      phase: "Penetapan Penerima",
      duration: "1 minggu",
      description: "Penetapan status sebagai Keluarga Penerima Manfaat (KPM)",
      status: "pending",
    },
    {
      phase: "Pencairan Bantuan",
      duration: "Berkelanjutan",
      description: "Pencairan bantuan setiap 3 bulan sekali",
      status: "pending",
    },
  ],
  commitments: {
    health: [
      "Ibu hamil memeriksakan kehamilan di fasilitas kesehatan",
      "Ibu melahirkan ditolong oleh tenaga kesehatan terlatih",
      "Anak usia 0-6 tahun ditimbang secara rutin dan mendapat imunisasi",
      "Anak usia 5-6 tahun mengikuti pendidikan anak usia dini",
    ],
    education: [
      "Anak usia 7-18 tahun terdaftar di satuan pendidikan",
      "Anak mengikuti kehadiran di satuan pendidikan minimal 85%",
      "Anak tidak putus sekolah",
      "Anak mengikuti program remedial jika diperlukan",
    ],
  },
  statistics: {
    totalApplicants: 15420,
    approved: 12350,
    rejected: 2180,
    pending: 890,
    successRate: 80.1,
  },
}

const faqs = [
  {
    question: "Siapa yang berhak menerima bantuan PKH?",
    answer:
      "Keluarga sangat miskin yang memiliki komponen keluarga berupa ibu hamil/menyusui, anak usia 0-6 tahun, atau anak usia sekolah SD-SMA, serta terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS).",
  },
  {
    question: "Berapa besar bantuan yang diterima?",
    answer:
      "Bantuan PKH bervariasi tergantung komponen keluarga: Rp 750.000 per keluarga per tahun sebagai bantuan tetap, ditambah bantuan komponen untuk ibu hamil, anak usia dini, dan anak sekolah.",
  },
  {
    question: "Kapan bantuan PKH dicairkan?",
    answer:
      "Bantuan PKH dicairkan setiap 3 bulan sekali (triwulan) melalui rekening bank atau agen pembayaran yang telah ditentukan.",
  },
  {
    question: "Apa saja kewajiban penerima PKH?",
    answer:
      "Penerima PKH wajib memenuhi komitmen di bidang kesehatan (pemeriksaan kehamilan, imunisasi, penimbangan) dan pendidikan (kehadiran sekolah minimal 85%, tidak putus sekolah).",
  },
  {
    question: "Bagaimana cara mengajukan keberatan jika ditolak?",
    answer:
      "Jika aplikasi ditolak, Anda dapat mengajukan keberatan melalui pendamping PKH di desa/kelurahan atau menghubungi call center PKH di nomor 021-31903567.",
  },
]

export default function ProgramDetailPage() {
  
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Program Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">{programData.category}</Badge>
                <Badge
                  variant="outline"
                  className={
                    programData.status === "active"
                      ? "text-green-600 border-green-200"
                      : "text-gray-600 border-gray-200"
                  }
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {programData.status === "active" ? "Program Aktif" : "Program Tidak Aktif"}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{programData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{programData.subtitle}</p>
              <p className="text-gray-700 leading-relaxed">{programData.description}</p>
            </div>

            {/* Program Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">
              <img
                src={programData.image || "/Images/Placeholder/logo.png"}
                alt={programData.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm opacity-90">Program ID: {programData.id}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img
                    src={programData.organization.logo || "/Images/Placeholder/logo.png"}
                    alt={programData.organization.name}
                    width={40}
                    height={40}
                    className="mr-3 rounded"
                  />
                  Penyelenggara
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{programData.organization.name}</p>
                    <p className="text-sm text-gray-600">{programData.organization.type}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{programData.organization.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{programData.organization.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={programData.organization.contact.website} className="text-blue-600 hover:underline">
                        Website Resmi
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Anggaran</span>
                    </div>
                    <span className="font-semibold">{programData.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Penerima</span>
                    </div>
                    <span className="font-semibold">{programData.beneficiaries}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm">Cakupan</span>
                    </div>
                    <span className="font-semibold">{programData.coverage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">Periode</span>
                    </div>
                    <span className="font-semibold">2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Aplikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tingkat Persetujuan</span>
                      <span className="font-semibold">{programData.statistics.successRate}%</span>
                    </div>
                    <Progress value={programData.statistics.successRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="font-semibold text-green-600">{programData.statistics.approved.toLocaleString()}</p>
                      <p className="text-green-700">Disetujui</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="font-semibold text-yellow-600">{programData.statistics.pending.toLocaleString()}</p>
                      <p className="text-yellow-700">Menunggu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Siap Mendaftar?</h3>
                  <p className="text-green-100 text-sm mb-4">
                    Batas waktu pendaftaran: {new Date(programData.applicationDeadline).toLocaleDateString("id-ID")}
                  </p>
                  <Button className="w-full bg-white text-green-600 hover:bg-green-50">
                    <FileText className="h-4 w-4 mr-2" />
                    Ajukan Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="benefits">Manfaat</TabsTrigger>
            <TabsTrigger value="eligibility">Syarat</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="commitments">Kewajiban</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Jadwal Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mulai Program:</span>
                      <span className="font-semibold">
                        {new Date(programData.startDate).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Berakhir Program:</span>
                      <span className="font-semibold">{new Date(programData.endDate).toLocaleDateString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batas Pendaftaran:</span>
                      <span className="font-semibold text-red-600">
                        {new Date(programData.applicationDeadline).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Keunggulan Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Bantuan tunai langsung ke rekening</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Mendorong akses kesehatan dan pendidikan</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Bantuan berkelanjutan selama memenuhi syarat</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Pendampingan dari petugas PKH</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rincian Manfaat yang Diterima</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Bantuan Tetap</h4>
                      <p className="text-2xl font-bold text-green-600">{programData.benefits.regular}</p>
                      <p className="text-sm text-green-700">Untuk setiap keluarga penerima</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Bantuan Ibu Hamil</h4>
                      <p className="text-2xl font-bold text-blue-600">{programData.benefits.pregnant}</p>
                      <p className="text-sm text-blue-700">Untuk ibu hamil dan menyusui</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">Bantuan Anak Sekolah</h4>
                      <p className="text-2xl font-bold text-purple-600">{programData.benefits.children}</p>
                      <p className="text-sm text-purple-700">Per anak usia sekolah (SD-SMA)</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">Bantuan Lansia</h4>
                      <p className="text-2xl font-bold text-orange-600">{programData.benefits.elderly}</p>
                      <p className="text-sm text-orange-700">Untuk lansia di atas 60 tahun</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Catatan Penting:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bantuan dicairkan setiap 3 bulan (triwulan)</li>
                    <li>• Jumlah bantuan dapat berubah sesuai komponen keluarga</li>
                    <li>• Bantuan akan dihentikan jika tidak memenuhi komitmen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Syarat Kelayakan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {programData.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dokumen yang Diperlukan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {programData.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FileText className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alur Proses Aplikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {programData.timeline.map((phase, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            phase.status === "active"
                              ? "bg-green-500 text-white"
                              : phase.status === "completed"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {phase.status === "active" ? (
                            <Clock className="h-4 w-4" />
                          ) : phase.status === "completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                          <Badge variant="outline" className="text-xs">
                            {phase.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commitments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Komitmen Kesehatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {programData.commitments.health.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Komitmen Pendidikan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {programData.commitments.education.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Penting untuk Diingat</h4>
                      <p className="text-yellow-700 text-sm">
                        Kegagalan memenuhi komitmen kesehatan dan pendidikan dapat mengakibatkan pengurangan atau
                        penghentian bantuan PKH. Pastikan untuk selalu memenuhi semua kewajiban yang telah ditetapkan.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pertanyaan yang Sering Diajukan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-4 pb-3">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Butuh Bantuan Lebih Lanjut?</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Jika pertanyaan Anda tidak terjawab di atas, silakan hubungi kami:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Center PKH
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
