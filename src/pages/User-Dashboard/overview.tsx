"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Eye,
  ArrowUpRight,
  Activity,
  Target,
  Award,
  Bell,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data
const userStats = {
  totalPrograms: 8,
  activePrograms: 3,
  completedPrograms: 4,
  totalReceived: "Rp 12.500.000",
  monthlyGrowth: 15.3,
  lastLogin: "2024-01-20 14:30",
  memberSince: "Januari 2024",
}

const recentActivity = [
  {
    id: 1,
    type: "approved",
    title: "Program Keluarga Harapan disetujui",
    description: "Bantuan senilai Rp 750.000 telah disetujui",
    time: "2 jam yang lalu",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    id: 2,
    type: "pending",
    title: "Verifikasi dokumen diperlukan",
    description: "Upload ulang KTP untuk Program BPNT",
    time: "5 jam yang lalu",
    icon: AlertCircle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: 3,
    type: "completed",
    title: "Bantuan berhasil diterima",
    description: "BLT senilai Rp 600.000 telah ditransfer",
    time: "1 hari yang lalu",
    icon: DollarSign,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: 4,
    type: "rejected",
    title: "Aplikasi tidak memenuhi syarat",
    description: "Program Bantuan Usaha Mikro ditolak",
    time: "3 hari yang lalu",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900",
  },
]

const monthlyData = [
  { month: "Jan", received: 2500000, applications: 2 },
  { month: "Feb", received: 1800000, applications: 1 },
  { month: "Mar", received: 3200000, applications: 3 },
  { month: "Apr", received: 2100000, applications: 2 },
  { month: "May", received: 2800000, applications: 2 },
  { month: "Jun", received: 0, applications: 0 },
]

const programStatusData = [
  { name: "Aktif", value: 3, color: "#10B981" },
  { name: "Selesai", value: 4, color: "#3B82F6" },
  { name: "Pending", value: 1, color: "#F59E0B" },
  { name: "Ditolak", value: 0, color: "#EF4444" },
]

const weeklyActivity = [
  { day: "Sen", logins: 2, applications: 1 },
  { day: "Sel", logins: 1, applications: 0 },
  { day: "Rab", logins: 3, applications: 2 },
  { day: "Kam", logins: 2, applications: 1 },
  { day: "Jum", logins: 4, applications: 0 },
  { day: "Sab", logins: 1, applications: 0 },
  { day: "Min", logins: 2, applications: 1 },
]

const activePrograms = [
  {
    id: 1,
    name: "Program Keluarga Harapan",
    category: "Bantuan Tunai",
    amount: "Rp 750.000",
    status: "Aktif",
    progress: 75,
    nextPayment: "2024-02-15",
    description: "Bantuan tunai bersyarat untuk keluarga kurang mampu",
  },
  {
    id: 2,
    name: "Bantuan Pangan Non Tunai",
    category: "Bantuan Pangan",
    amount: "Rp 200.000",
    status: "Aktif",
    progress: 60,
    nextPayment: "2024-02-01",
    description: "Bantuan pangan melalui kartu elektronik",
  },
  {
    id: 3,
    name: "Program Indonesia Pintar",
    category: "Bantuan Pendidikan",
    amount: "Rp 450.000",
    status: "Aktif",
    progress: 90,
    nextPayment: "2024-03-01",
    description: "Bantuan pendidikan untuk anak usia sekolah",
  },
]

const notifications = [
  {
    id: 1,
    title: "Pembayaran PKH Berhasil",
    message: "Bantuan PKH bulan Januari telah ditransfer ke rekening Anda",
    time: "1 jam yang lalu",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Dokumen Perlu Diperbarui",
    message: "Silakan upload ulang Kartu Keluarga terbaru untuk verifikasi",
    time: "3 jam yang lalu",
    read: false,
    type: "warning",
  },
  {
    id: 3,
    title: "Program Baru Tersedia",
    message: "Program Bantuan Stimulan Perumahan kini tersedia untuk Anda",
    time: "1 hari yang lalu",
    read: true,
    type: "info",
  },
]

export default function DashboardOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Selesai":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Selamat Datang Kembali!</h2>
            <p className="text-green-100 mb-4">
              Anda memiliki {userStats.activePrograms} program aktif dan {notifications.filter((n) => !n.read).length}{" "}
              notifikasi baru
            </p>
            <div className="flex items-center space-x-4 text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Bergabung {userStats.memberSince}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Login terakhir: {userStats.lastLogin}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Program</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalPrograms}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{userStats.monthlyGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">bulan ini</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Program Aktif</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.activePrograms}</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">Berjalan</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Diterima</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalReceived}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">Meningkat</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Program Selesai</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.completedPrograms}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">Berhasil</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Received Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Bantuan Diterima (6 Bulan Terakhir)</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={selectedPeriod === "3months" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("3months")}
                    className={selectedPeriod === "3months" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    3M
                  </Button>
                  <Button
                    variant={selectedPeriod === "6months" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("6months")}
                    className={selectedPeriod === "6months" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    6M
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, "Bantuan Diterima"]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="received"
                      stroke="#10B981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorReceived)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Aktivitas Mingguan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="logins" fill="#3B82F6" name="Login" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="applications" fill="#10B981" name="Aplikasi" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Program Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Status Program</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={programStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {programStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Notifikasi Terbaru</CardTitle>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {notifications.filter((n) => !n.read).length} Baru
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      !notification.read
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-1 rounded-full ${
                          notification.type === "success"
                            ? "bg-green-100 dark:bg-green-900"
                            : notification.type === "warning"
                              ? "bg-yellow-100 dark:bg-yellow-900"
                              : "bg-blue-100 dark:bg-blue-900"
                        }`}
                      >
                        <Bell
                          className={`w-3 h-3 ${
                            notification.type === "success"
                              ? "text-green-600"
                              : notification.type === "warning"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Lihat Semua Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Programs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Program Aktif</CardTitle>
            <a href="/dashboard/programs">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Semua
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePrograms.map((program) => (
              <div
                key={program.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {program.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{program.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Bantuan:</span>
                    <span className="font-semibold text-green-600">{program.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Pembayaran berikutnya:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(program.nextPayment).toLocaleDateString("id-ID")}
                    </span>
                  </div>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className={`p-2 rounded-full ${activity.bgColor} flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
