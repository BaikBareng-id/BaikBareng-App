"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Heart,
} from "lucide-react"
import ModeToggle from "./theme-toggle"
import { useNavigate } from "react-router"

export default function Navbar() {

  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#hero", label: "Beranda" },
    { href: "#about", label: "Tentang" },
    { href: "#features", label: "Fitur" },
    { href: "#products", label: "Program" },
    { href: "#contact", label: "Kontak" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">BaikBareng</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <ModeToggle />

            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => navigate("/login")}>Daftar Sekarang</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={() => navigate("/login")}>Daftar Sekarang</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}