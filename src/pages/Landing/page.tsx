"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Shield,
  Zap,
  Target,
  Eye,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  MapPin,
} from "lucide-react"

import { CategoriesSection } from "@/components/Landing/categories-section"

export default function BaikBarengLanding() {

  const [isDark] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const stats = [
    { number: "2.5M+", label: "Keluarga Terbantu", icon: Users },
    { number: "34", label: "Provinsi Terjangkau", icon: MapPin },
    { number: "98%", label: "Tingkat Kepuasan", icon: Heart },
    { number: "24/7", label: "Layanan Aktif", icon: Shield },
  ]

  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Data pribadi Anda dilindungi dengan enkripsi tingkat militer dan sistem keamanan berlapis.",
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      description: "Pendaftaran dan verifikasi bantuan sosial dapat diselesaikan dalam hitungan menit.",
    },
    {
      icon: Users,
      title: "Mudah Digunakan",
      description: "Interface yang intuitif dan ramah pengguna untuk semua kalangan usia.",
    },
    {
      icon: Heart,
      title: "Bantuan 24/7",
      description: "Tim support siap membantu Anda kapan saja melalui berbagai channel komunikasi.",
    },
  ]

  const testimonials = [
    {
      name: "Ibu Sari Wijaya",
      location: "Jakarta Timur",
      text: "BaikBareng sangat membantu keluarga saya. Prosesnya mudah dan bantuan cepat sampai.",
      rating: 5,
      avatar: "/Images/Placeholder/avatar.png?height=60&width=60",
    },
    {
      name: "Bapak Ahmad Hidayat",
      location: "Surabaya",
      text: "Aplikasi yang sangat user-friendly. Anak saya yang masih SMA bisa menggunakannya dengan mudah.",
      rating: 5,
      avatar: "/Images/Placeholder/avatar.png?height=60&width=60",
    },
    {
      name: "Ibu Ratna Sari",
      location: "Bandung",
      text: "Pelayanan customer service sangat responsif. Terima kasih BaikBareng!",
      rating: 5,
      avatar: "/Images/Placeholder/avatar.png?height=60&width=60",
    },
  ]

  const faqs = [
    {
      question: "Bagaimana cara mendaftar di BaikBareng?",
      answer:
        "Anda dapat mendaftar melalui website atau aplikasi mobile dengan menyiapkan KTP, KK, dan dokumen pendukung lainnya. Proses pendaftaran hanya membutuhkan waktu 5-10 menit.",
    },
    {
      question: "Siapa saja yang berhak mendapatkan bantuan?",
      answer:
        "Bantuan sosial diperuntukkan bagi keluarga kurang mampu yang memenuhi kriteria yang telah ditetapkan pemerintah, termasuk keluarga dengan penghasilan di bawah garis kemiskinan.",
    },
    {
      question: "Berapa lama proses verifikasi data?",
      answer:
        "Proses verifikasi data biasanya memakan waktu 3-7 hari kerja. Anda akan mendapatkan notifikasi melalui SMS atau email setelah verifikasi selesai.",
    },
    {
      question: "Bagaimana cara mengecek status bantuan saya?",
      answer:
        "Anda dapat mengecek status bantuan melalui dashboard akun Anda atau menghubungi customer service kami di nomor yang tersedia.",
    },
  ]

  const developers = [
    {
      name: "Stanley Nathanael Wijaya",
      role: "Orang Biasa",
      image: "/Images/Team/stanley.png",
    },
    {
      name: "Cathlyn Shanice Dharmawan",
      role: "Orang Biasa",
      image: "/Images/Placeholder/avatar.png?height=100&width=100",
    },
    {
      name: "Muhammad Zidan Fatoni",
      role: "Orang Biasa",
      image: "/Images/Placeholder/avatar.png?height=100&width=100",
    },
    {
      name: "Clarissa Aditjakra",
      role: "Orang Biasa",
      image: "/Images/Placeholder/avatar.png?height=100&width=100",
    },
  ]

  return (

    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  🇮🇩 Platform Resmi Pemerintah Indonesia
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="text-green-600">Baik</span>Bareng
                  <br />
                  <span className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300">
                    Bantuan Sosial untuk Semua
                  </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Platform digital terpercaya untuk mengakses berbagai program bantuan sosial pemerintah. Mudah, cepat,
                  dan aman untuk seluruh keluarga Indonesia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-3 text-lg bg-transparent"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2.5M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Keluarga Terbantu</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">34</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Provinsi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Kepuasan</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/Images/Landing/hero.png?height=600&width=500"
                  alt="BaikBareng App Interface"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Tentang BaikBareng</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              BaikBareng adalah platform digital resmi Kementerian Sosial Republik Indonesia yang menghubungkan
              masyarakat dengan berbagai program bantuan sosial pemerintah.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mengapa BaikBareng?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Terpercaya & Resmi</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Platform resmi pemerintah dengan keamanan data terjamin
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Proses Cepat</h4>
                    <p className="text-gray-600 dark:text-gray-300">Pendaftaran dan verifikasi dalam hitungan menit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mudah Digunakan</h4>
                    <p className="text-gray-600 dark:text-gray-300">Interface ramah untuk semua kalangan usia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/Images/Logo.png?height=100&width=100"
                alt="About BaikBareng"
                width={500}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dampak Nyata BaikBareng</h2>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
              Angka-angka yang menunjukkan komitmen kami dalam membantu masyarakat Indonesia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 border-none shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Visi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Menjadi platform bantuan sosial digital terdepan yang menghubungkan seluruh masyarakat Indonesia
                  dengan program-program pemerintah secara mudah, cepat, dan terpercaya.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-none shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Misi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Memberikan akses mudah ke program bantuan sosial</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Meningkatkan transparansi dan akuntabilitas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Memberdayakan masyarakat melalui teknologi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Fitur Unggulan</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Berbagai fitur canggih yang memudahkan Anda mengakses bantuan sosial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-green-600 dark:bg-green-800 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-white text-xl font-semibold mx-8">🏆 Platform Terpercaya</span>
          <span className="text-white text-xl font-semibold mx-8">⚡ Proses Cepat & Mudah</span>
          <span className="text-white text-xl font-semibold mx-8">🔒 Data Aman Terlindungi</span>
          <span className="text-white text-xl font-semibold mx-8">🇮🇩 Resmi Pemerintah RI</span>
          <span className="text-white text-xl font-semibold mx-8">💝 Bantuan untuk Semua</span>
          <span className="text-white text-xl font-semibold mx-8">📱 Akses 24/7</span>
          <span className="text-white text-xl font-semibold mx-8">🏆 Platform Terpercaya</span>
          <span className="text-white text-xl font-semibold mx-8">⚡ Proses Cepat & Mudah</span>
        </div>
      </section>

      <CategoriesSection/>

      {/* Developers Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Tim Pengembang</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dikembangkan oleh tim profesional dari Kementerian Sosial Republik Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {developers.map((dev, index) => (
              <Card key={index} className="text-center p-8 border-none shadow-lg">
                <div className="mb-6">
                  <img
                    src={dev.image || "/Images/Placeholder/avatar.png"}
                    alt={dev.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{dev.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{dev.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Testimoni Pengguna</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dengarkan pengalaman nyata dari pengguna BaikBareng di seluruh Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-none shadow-lg">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/Images/Placeholder/avatar.png"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Temukan jawaban untuk pertanyaan umum tentang BaikBareng
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Bergabung dengan BaikBareng?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Daftarkan diri Anda sekarang dan dapatkan akses ke berbagai program bantuan sosial pemerintah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Daftar Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}