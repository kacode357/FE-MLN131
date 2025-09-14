// components/navigation.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const navigationItems = [
  { href: "/", label: { vi: "Trang chủ", en: "Home", ja: "ホーム" } },
  { href: "/noi-dung", label: { vi: "Nội dung", en: "Content", ja: "コンテンツ" } },
  { href: "/video", label: { vi: "Video", en: "Video", ja: "ビデオ" } },
  { href: "/on-tap", label: { vi: "Ôn tập", en: "Review", ja: "レビュー" } },
  { href: "/phan-hoi", label: { vi: "Phản hồi", en: "Feedback", ja: "フィードバック" } },
]

const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

interface NavigationProps {
  currentLanguage: "vi" | "en" | "ja"
  onLanguageChange: (lang: "vi" | "en" | "ja") => void
}

export function Navigation({ currentLanguage, onLanguageChange }: NavigationProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              {/* Logo đã được cập nhật */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSY2VgbS9-a39bD8_1n0fMeSlomQH1VR1LDUe1fvi7m5clQLkOAEbZwXCnEf3w&s=10"
                alt="Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-bold text-lg hidden sm:inline-block">CNXH và TKQĐ</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Logo đã được cập nhật */}
            <img
              src="https://marketplace.canva.com/YYJtQ/MAEEAZYYJtQ/1/tl/canva-flag-of-vietnam-waving-background-MAEEAZYYJtQ.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-bold text-lg hidden sm:inline-block">CNXH và TKQĐ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label[currentLanguage]}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <Select
              value={currentLanguage}
              onValueChange={(val: "vi" | "en" | "ja") => onLanguageChange(val)}
            >
              <SelectTrigger className="w-[120px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Switcher */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded",
                    pathname === item.href ? "text-primary bg-accent" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label[currentLanguage]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}