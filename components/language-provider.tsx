"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "vi" | "en" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  vi: {
    "site.title": "Chương 3: Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội trong Tư tưởng Hồ Chí Minh",
    "site.subtitle": "Khám phá tư tưởng chính trị của Chủ tịch Hồ Chí Minh về xây dựng chủ nghĩa xã hội",
    "nav.home": "Trang chủ",
    "nav.content": "Nội dung",
    "nav.video": "Video",
    "nav.review": "Ôn tập",
    "nav.feedback": "Phản hồi",
    "home.welcome": "Chào mừng đến với khóa học",
    "home.description":
      "Tìm hiểu sâu về tư tưởng chính trị của Chủ tịch Hồ Chí Minh về chủ nghĩa xã hội và con đường quá độ lên chủ nghĩa xã hội ở Việt Nam.",
    "home.start_learning": "Bắt đầu học",
    "home.watch_video": "Xem video",
  },
  en: {
    "site.title": "Chapter 3: Socialism and the Transition Period to Socialism in Ho Chi Minh's Thought",
    "site.subtitle": "Explore President Ho Chi Minh's political thought on building socialism",
    "nav.home": "Home",
    "nav.content": "Content",
    "nav.video": "Video",
    "nav.review": "Review",
    "nav.feedback": "Feedback",
    "home.welcome": "Welcome to the course",
    "home.description":
      "Explore President Ho Chi Minh's political thought on socialism and the path of transition to socialism in Vietnam.",
    "home.start_learning": "Start Learning",
    "home.watch_video": "Watch Video",
  },
  ja: {
    "site.title": "第3章：ホー・チ・ミン思想における社会主義と社会主義への移行期",
    "site.subtitle": "ホー・チ・ミン主席の社会主義建設に関する政治思想を探る",
    "nav.home": "ホーム",
    "nav.content": "コンテンツ",
    "nav.video": "ビデオ",
    "nav.review": "レビュー",
    "nav.feedback": "フィードバック",
    "home.welcome": "コースへようこそ",
    "home.description":
      "ベトナムにおける社会主義と社会主義への移行の道に関するホー・チ・ミン主席の政治思想を探求します。",
    "home.start_learning": "学習を開始",
    "home.watch_video": "ビデオを見る",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["vi", "en", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
