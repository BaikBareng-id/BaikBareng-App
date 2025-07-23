/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Camera,
  Save,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  CreditCard,
  Download,
  Trash2,
  LogOut,
  Key,
} from "lucide-react"

// Mock user data
const userData = {
  id: "12345",
  name: "Ibu Sari Wijaya",
  email: "sari.wijaya@email.com",
  phone: "081234567890",
  address: "Jl. Merdeka No. 123, Jakarta Timur, DKI Jakarta",
  avatar: "/placeholder.svg?height=100&width=100&text=SW",
  joinDate: "2024-01-15",
  lastLogin: "2024-01-20 14:30",
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnabled: false,
  ktp: "3171234567890123",
  kk: "3171234567890001",
  birthDate: "1985-05-15",
  gender: "Perempuan",
  maritalStatus: "Menikah",
  occupation: "Ibu Rumah Tangga",
  education: "SMA",
  income: "< Rp 1.000.000",
}

const securityLogs = [
  {
    id: 1,
    action: "Login berhasil",
    device: "Chrome di Windows",
    location: "Jakarta, Indonesia",
    time: "2024-01-20 14:30",
    status: "success",
  },
  {
    id: 2,
    action: "Perubahan password",
    device: "Chrome di Windows",
    location: "Jakarta, Indonesia",
    time: "2024-01-18 10:15",
    status: "success",
  },
  {
    id: 3,
    action: "Login gagal",
    device: "Safari di iPhone",
    location: "Jakarta, Indonesia",
    time: "2024-01-17 20:45",
    status: "failed",
  },
  {
    id: 4,
    action: "Verifikasi email",
    device: "Chrome di Windows",
    location: "Jakarta, Indonesia",
    time: "2024-01-15 09:30",
    status: "success",
  },
]

const notificationSettings = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  programUpdates: true,
  paymentAlerts: true,
  securityAlerts: true,
  marketingEmails: false,
  weeklyDigest: true,
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState(userData)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState(notificationSettings)

  const tabs = [
    { id: "profile", name: "Profil", icon: User, description: "Informasi pribadi dan kontak" },
    { id: "security", name: "Keamanan", icon: Shield, description: "Password dan autentikasi" },
    { id: "notifications", name: "Notifikasi", icon: Bell, description: "Pengaturan pemberitahuan" },
    { id: "privacy", name: "Privasi", icon: Eye, description: "Kontrol privasi dan data" },
    { id: "account", name: "Akun", icon: CreditCard, description: "Pengaturan akun dan langganan" },
  ]

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Show success message
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak cocok")
      return
    }
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    // Show success message
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Kelola profil, keamanan, dan preferensi akun Anda</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-green-600" : "text-gray-400"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{tab.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Foto Profil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={profileData.avatar || "/placeholder.svg"}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profileData.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Email Terverifikasi
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Smartphone className="w-3 h-3 mr-1" />
                          HP Terverifikasi
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          placeholder="nama@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          placeholder="081234567890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Tanggal Lahir</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select
                          value={profileData.gender}
                          onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Status Pernikahan</Label>
                        <Select
                          value={profileData.maritalStatus}
                          onValueChange={(value) => setProfileData({ ...profileData, maritalStatus: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                            <SelectItem value="Menikah">Menikah</SelectItem>
                            <SelectItem value="Cerai">Cerai</SelectItem>
                            <SelectItem value="Janda/Duda">Janda/Duda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="education">Pendidikan Terakhir</Label>
                        <Select
                          value={profileData.education}
                          onValueChange={(value) => setProfileData({ ...profileData, education: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="SMP">SMP</SelectItem>
                            <SelectItem value="SMA">SMA</SelectItem>
                            <SelectItem value="D3">D3</SelectItem>
                            <SelectItem value="S1">S1</SelectItem>
                            <SelectItem value="S2">S2</SelectItem>
                            <SelectItem value="S3">S3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Pekerjaan</Label>
                        <Input
                          id="occupation"
                          value={profileData.occupation}
                          onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                          placeholder="Masukkan pekerjaan"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Lengkap</Label>
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        placeholder="Masukkan alamat lengkap"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Menyimpan...</span>
                          </div>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Document Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dokumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ktp">Nomor KTP</Label>
                      <Input
                        id="ktp"
                        value={profileData.ktp}
                        onChange={(e) => setProfileData({ ...profileData, ktp: e.target.value })}
                        placeholder="Masukkan nomor KTP"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kk">Nomor Kartu Keluarga</Label>
                      <Input
                        id="kk"
                        value={profileData.kk}
                        onChange={(e) => setProfileData({ ...profileData, kk: e.target.value })}
                        placeholder="Masukkan nomor KK"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-green-600" />
                    Ubah Password
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Saat Ini</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          placeholder="Masukkan password saat ini"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Password Baru</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          placeholder="Masukkan password baru"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Password harus memenuhi kriteria berikut:</p>
                        <ul className="list-disc list-inside space-y-0.5 ml-2">
                          <li>Minimal 8 karakter</li>
                          <li>Mengandung huruf besar dan kecil</li>
                          <li>Mengandung angka</li>
                          <li>Mengandung simbol khusus</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          placeholder="Konfirmasi password baru"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Mengubah...</span>
                          </div>
                        ) : (
                          <>
                            <Key className="w-4 h-4 mr-2" />
                            Ubah Password
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Autentikasi Dua Faktor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">SMS Authentication</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Tambahan keamanan dengan kode SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={userData.twoFactorEnabled}
                      onCheckedChange={() => {}}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Keamanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            log.status === "success" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                          }`}
                        >
                          {log.status === "success" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{log.action}</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <p>{log.device}</p>
                            <p>{log.location}</p>
                            <p>{log.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-green-600" />
                  Pengaturan Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Metode Notifikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Terima notifikasi via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked: any) =>
                            setNotifications({ ...notifications, emailNotifications: checked })
                          }
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">SMS</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Terima notifikasi via SMS</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked: any) =>
                            setNotifications({ ...notifications, smsNotifications: checked })
                          }
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-purple-600" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Push Notification</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Terima notifikasi push di aplikasi
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked: any) =>
                            setNotifications({ ...notifications, pushNotifications: checked })
                          }
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jenis Notifikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Update Program</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Notifikasi tentang status program bantuan sosial
                          </p>
                        </div>
                        <Switch
                          checked={notifications.programUpdates}
                          onCheckedChange={(checked: any) => setNotifications({ ...notifications, programUpdates: checked })}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Alert Pembayaran</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Notifikasi saat bantuan telah ditransfer
                          </p>
                        </div>
                        <Switch
                          checked={notifications.paymentAlerts}
                          onCheckedChange={(checked: any) => setNotifications({ ...notifications, paymentAlerts: checked })}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Alert Keamanan</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Notifikasi tentang aktivitas keamanan akun
                          </p>
                        </div>
                        <Switch
                          checked={notifications.securityAlerts}
                          onCheckedChange={(checked: any) => setNotifications({ ...notifications, securityAlerts: checked })}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Email Marketing</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Informasi program baru dan tips keuangan
                          </p>
                        </div>
                        <Switch
                          checked={notifications.marketingEmails}
                          onCheckedChange={(checked: any) =>
                            setNotifications({ ...notifications, marketingEmails: checked })
                          }
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Ringkasan Mingguan</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Ringkasan aktivitas dan update mingguan
                          </p>
                        </div>
                        <Switch
                          checked={notifications.weeklyDigest}
                          onCheckedChange={(checked: any) => setNotifications({ ...notifications, weeklyDigest: checked })}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNotificationUpdate}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Menyimpan...</span>
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan Pengaturan
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-green-600" />
                    Kontrol Privasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Visibilitas Profil</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Kontrol siapa yang dapat melihat informasi profil Anda
                      </p>
                      <Select defaultValue="private">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Publik</SelectItem>
                          <SelectItem value="private">Privat</SelectItem>
                          <SelectItem value="friends">Hanya Teman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Analytics</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Izinkan penggunaan data untuk analisis dan peningkatan layanan
                      </p>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-600" />
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Cookies</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Kelola preferensi cookies untuk pengalaman yang lebih baik
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cookies Esensial</span>
                          <Switch checked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cookies Analytics</span>
                          <Switch defaultChecked className="data-[state=checked]:bg-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cookies Marketing</span>
                          <Switch className="data-[state=checked]:bg-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download Data Saya</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Download salinan semua data pribadi yang kami miliki tentang Anda
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    Informasi Akun
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">ID Pengguna</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{userData.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Tanggal Bergabung</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(userData.joinDate).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Login Terakhir</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{userData.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Zona Bahaya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Hapus Akun</h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        Menghapus akun akan menghilangkan semua data Anda secara permanen. Tindakan ini tidak dapat
                        dibatalkan.
                      </p>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Akun
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        Logout dari Semua Perangkat
                      </h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                        Keluar dari semua perangkat yang sedang login ke akun Anda
                      </p>
                      <Button
                        variant="outline"
                        className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout Semua Perangkat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
