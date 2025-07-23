"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Home,
  BarChart3,
  FileText,
  Settings,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  Heart,
  ChevronRight,
  HelpCircle,
  Shield,
} from "lucide-react"
import { useLocation } from "react-router"

const navigationItems = [
  {
    name: "Overview",
    href: "/user-dashboard",
    icon: BarChart3,
    description: "Dashboard utama dan statistik",
  },
  {
    name: "Program Saya",
    href: "/user-programs",
    icon: FileText,
    description: "Kelola program bantuan sosial",
    badge: "3",
  },
  {
    name: "Pengaturan",
    href: "/user-settings",
    icon: Settings,
    description: "Pengaturan akun dan profil",
  },
  {
    name: "Bantuan",
    href: "/contact",
    icon: HelpCircle,
    description: "Pusat bantuan dan FAQ",
  },
]

const quickActions = [
  {
    name: "Ajukan Program Baru",
    href: "/bansos",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    name: "Keamanan Akun",
    href: "/user-settings?tab=security",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
]

// Mock user data
const userData = {
  name: "Ibu Sari Wijaya",
  email: "sari.wijaya@email.com",
  avatar: "/Images/Placeholder/avatar.png?height=40&width=40&text=SW",
  role: "Penerima Bantuan",
  joinDate: "Januari 2024",
  notifications: 5,
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">BaikBareng</span>
            </a>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userData.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{userData.email}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {userData.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a key={item.name} href={item.href}>
                  <div
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-r-2 border-green-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive(item.href) ? "text-green-600" : "text-gray-400 group-hover:text-green-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.badge && <Badge className="bg-green-600 text-white text-xs">{item.badge}</Badge>}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                    <ChevronRight
                      className={`ml-2 h-4 w-4 transition-transform ${
                        isActive(item.href) ? "rotate-90" : "group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-6">
              <h4 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Aksi Cepat
              </h4>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <a key={action.name} href={action.href}>
                    <div className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className={`mr-3 p-1.5 rounded-md ${action.bgColor}`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {action.name}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm">{isDark ? "Mode Terang" : "Mode Gelap"}</span>
              </Button>
            </div>
            <div className="flex space-x-2">
              <a href="/" className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Home className="w-4 h-4 mr-2" />
                  Beranda
                </Button>
              </a>
              <Button variant="outline" size="sm" className="bg-transparent">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Selamat datang kembali, {userData.name.split(" ")[1]}!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {userData.notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {userData.notifications}
                  </Badge>
                )}
              </Button>
              <a href="/user-settings">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
