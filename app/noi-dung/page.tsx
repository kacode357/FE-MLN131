"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Eye, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Import dữ liệu
import { contentTopics } from "@/constants/content"

function ContentSelectionPage() {
  const { language, setLanguage, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCard, setExpandedCard] = useState<string | null>(null) // Mobile toggle state

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const topics = contentTopics[language] || contentTopics.en

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes("Cơ bản") || difficulty.includes("Basic") || difficulty.includes("基礎"))
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (difficulty.includes("Trung bình") || difficulty.includes("Intermediate") || difficulty.includes("中級"))
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  // --- Logic mới để xử lý hiển thị danh sách ---
  const toggleCardExpansion = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <nav className="text-sm text-muted-foreground mb-2 md:mb-4">
                <Link href="/" className="hover:text-primary transition-colors">
                  {language === "vi" ? "Trang chủ" : language === "en" ? "Home" : "ホーム"}
                </Link>
                <span className="mx-2">/</span>
                <span>{t("nav.content")}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {/* Tiêu đề mới */}
                Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl">
                {/* Mô tả mới */}
                Khám phá các khía cạnh quan trọng của Chủ nghĩa xã hội và con đường đi lên chủ nghĩa xã hội.
              </p>
            </div>

            {/* Search box */}
            <div className="w-full md:w-80">
              <Input
                type="text"
                placeholder={
                  language === "vi"
                    ? "Tìm kiếm nội dung..."
                    : language === "en"
                    ? "Search content..."
                    : "コンテンツを検索..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-primary shadow-sm focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Grid nội dung */}
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTopics.map((topic, index) => {
              const isExpanded = expandedCard === topic.id
              return (
                <Card
                  key={topic.id}
                  /* p-0 để bỏ padding root; overflow-hidden để ảnh “ôm” sát viền */
                  className="group p-0 overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/50 flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                  // Trên mobile, click để mở/đóng
                  onClick={() => toggleCardExpansion(topic.id)}
                >
                  {/* Ảnh */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* ép Link thành block để loại khe inline */}
                    <Link href={`/noi-dung/${topic.id}`} className="block w-full h-full">
                      <img
                        src={topic.image || "/placeholder.svg"}
                        alt={topic.title}
                        /* ép img thành block + fill container */
                        className="block w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={getDifficultyColor(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </div>
                    </Link>
                  </div>

                  {/* Tiêu đề + mô tả */}
                  <CardHeader className="pb-0">
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {topic.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 md:line-clamp-3">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Nội dung chính */}
                  <CardContent className="mt-auto space-y-3 pt-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {topic.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {topic.topics.length}{" "}
                        {language === "vi" ? "phần" : language === "en" ? "sections" : "セクション"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>

                    {/* List hiển thị */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        {language === "vi"
                          ? "Nội dung chính:"
                          : language === "en"
                          ? "Main topics:"
                          : "主なトピック:"}
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {/* Mobile: toggle bằng state */}
                        {isExpanded
                          ? topic.topics.map((subtopic, i) => (
                              <li key={i} className="truncate">
                                {subtopic}
                              </li>
                            ))
                          : topic.topics.slice(0, 2).map((subtopic, i) => (
                              <li key={i} className="truncate">
                                {subtopic}
                              </li>
                            ))}

                        {/* Desktop hover */}
                        {/* Danh sách đầy đủ chỉ hiển thị khi hover trên desktop */}
                        <div className="hidden md:block group-hover:block">
                          {topic.topics.slice(2).map((subtopic, i) => (
                            <li key={`extra-${i}`} className="truncate">
                              {subtopic}
                            </li>
                          ))}
                        </div>
                      </ul>

                      {/* Nút toggle mobile */}
                      {topic.topics.length > 2 && (
                        <button
                          onClick={() => toggleCardExpansion(topic.id)}
                          className="flex items-center gap-1 text-xs text-primary hover:underline md:hidden"
                        >
                          {isExpanded
                            ? language === "vi"
                              ? "Thu gọn"
                              : language === "en"
                              ? "Show less"
                              : "閉じる"
                            : language === "vi"
                            ? "Xem thêm"
                            : language === "en"
                            ? "Show more"
                            : "もっと見る"}
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <ContentSelectionPage />
    </LanguageProvider>
  )
}