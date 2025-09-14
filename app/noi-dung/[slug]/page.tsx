// app/noi-dung/[slug]/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  CheckCircle,
  Circle,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import { motion, AnimatePresence } from "framer-motion"

import { detailedContent, LessonContent, Section } from "@/constants/detailedContent"

/* ----------------------- i18n strings ----------------------- */
const I18N = {
  vi: {
    home: "Trang chủ",
    content: "Nội dung",
    toc: "Mục lục",
    prev: "Phần trước",
    next: "Phần tiếp",
    done: "Hoàn thành",
    backToList: "Quay lại danh sách bài học",
    read: "Đọc",
    stop: "Dừng",
    jumpHint: "Bấm ←/→ để chuyển phần",
    minRead: "phút đọc",
    goToPart: (i: number) => `Đi tới phần ${i}`,
  },
  en: {
    home: "Home",
    content: "Content",
    toc: "Table of contents",
    prev: "Previous",
    next: "Next",
    done: "Done",
    backToList: "Back to lessons",
    read: "Read",
    stop: "Stop",
    jumpHint: "Press ←/→ to navigate",
    minRead: "min read",
    goToPart: (i: number) => `Go to section ${i}`,
  },
  ja: {
    home: "ホーム",
    content: "コンテンツ",
    toc: "目次",
    prev: "前のセクション",
    next: "次のセクション",
    done: "完了",
    backToList: "レッスン一覧に戻る",
    read: "読み上げ",
    stop: "停止",
    jumpHint: "←/→ で移動",
    minRead: "分で読めます",
    goToPart: (i: number) => `第${i}セクションへ`,
  },
} as const

/* ----------------------- helpers ----------------------- */

// Chuẩn hoá language từ provider về "vi" | "en" | "ja"
function normalizeLang(raw?: string) {
  const x = (raw || "").toLowerCase()
  if (x.startsWith("en")) return "en"
  if (x.startsWith("ja") || x.startsWith("jp")) return "ja"
  return "vi"
}

// Map các slug EN/JA (hoặc slug tuỳ thích) -> slug chuẩn trong data
const SLUG_ALIASES: Record<string, string> = {
  // EN aliases
  "socialism": "chu-nghia-xa-hoi",
  "conditions-of-birth": "dieu-kien-ra-doi",
  "essential-characteristics": "dac-trung-ban-chat",
  // (có slug nào khác thì thêm tiếp ở đây)
}

function toCanonicalSlug(raw: string) {
  const s = raw.toLowerCase()
  return SLUG_ALIASES[s] ?? s
}

// Lấy danh sách voices của SpeechSynthesis (có lắng nghe voiceschanged)
function useSpeechVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    const load = () => {
      const list = window.speechSynthesis.getVoices()
      if (list.length) setVoices(list)
    }
    load()
    // @ts-ignore
    window.speechSynthesis.onvoiceschanged = () => load()
    return () => {
      try {
        // @ts-ignore
        window.speechSynthesis.onvoiceschanged = null
      } catch {}
    }
  }, [])
  return voices
}

// Chọn voice theo locale (ưu tiên đúng vùng, sau đó theo ngôn ngữ)
function pickVoice(voices: SpeechSynthesisVoice[], langCode: string) {
  if (!voices.length) return null
  const exact = voices.find((v) =>
    v.lang?.toLowerCase().startsWith(langCode.toLowerCase())
  )
  if (exact) return exact
  const prefix = langCode.split("-")[0]
  const sameLang = voices.find((v) => v.lang?.toLowerCase().startsWith(prefix))
  return sameLang || voices[0]
}

/* --------------------- UI components -------------------- */

function Bullet({ done, active }: { done: boolean; active: boolean }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
      {done ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <Circle className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
      )}
    </span>
  )
}

function MobileTOC({
  sections,
  current,
  onJump,
}: {
  sections: Section[]
  current: number
  onJump: (i: number) => void
}) {
  return (
    <div className="md:hidden sticky top-16 z-40 -mt-2 mb-4 overflow-x-auto border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-2 px-1 py-2">
        {sections.map((s, i) => {
          const active = i === current
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="inline-block h-2 w-2 rounded-full border border-current">
                <span
                  className={`block h-full w-full rounded-full ${
                    active ? "bg-current" : "bg-transparent"
                  }`}
                />
              </span>
              <span className="max-w-48 truncate">{s.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------- Page component -------------------- */

function DetailedLessonPage() {
  const { language, setLanguage } = useLanguage()
  const uiLang = normalizeLang(language as string)
  const t = I18N[uiLang]

  const params = useParams()
  const rawSlugParam = (params?.slug ?? "") as string | string[]
  const slug = useMemo(() => {
    const raw = decodeURIComponent(
      Array.isArray(rawSlugParam) ? rawSlugParam[0] : rawSlugParam
    )
    return toCanonicalSlug(raw)
  }, [rawSlugParam])

  const [currentSection, setCurrentSection] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const voices = useSpeechVoices()

  // ✅ lấy content theo ngôn ngữ + slug đã canonical
  const content: LessonContent = useMemo(() => {
    const bucket = detailedContent[uiLang] as Record<string, LessonContent> | undefined
    const fromLang = bucket?.[slug]
    if (!fromLang && process.env.NODE_ENV !== "production") {
      console.warn("[i18n] Missing translation:", {
        uiLang,
        slug,
        available: Object.keys(bucket ?? {}),
      })
    }
    // Fallback an toàn
    return fromLang ?? detailedContent.vi[slug] ?? Object.values(detailedContent.vi)[0]
  }, [uiLang, slug])

  const totalSections = content.sections.length

  // Reset về phần đầu khi đổi ngôn ngữ hoặc slug
  useEffect(() => {
    setCurrentSection(0)
  }, [uiLang, slug])

  // Ước tính thời gian đọc (≈180 wpm)
  const readingTime = useMemo(() => {
    const words = content.sections[currentSection].content
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean).length
    const minutes = Math.max(1, Math.round(words / 180))
    return `${minutes} ${t.minRead}`
  }, [currentSection, content.sections, t.minRead])

  // Auto scroll khi đổi section
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentSection])

  // Phím tắt ← / →
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSection()
      if (e.key === "ArrowLeft") prevSection()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, totalSections, isPlaying])

  // --- TTS ---
  const handleTextToSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const u = new SpeechSynthesisUtterance(
      content.sections[currentSection].content
    )
    const langToLocale: Record<string, string> = {
      vi: "vi-VN",
      en: "en-US",
      ja: "ja-JP",
    }
    const ttsLocale = langToLocale[uiLang] || "vi-VN"
    u.lang = ttsLocale
    u.rate = 0.92
    u.pitch = 1

    const v = pickVoice(voices, ttsLocale)
    if (v) u.voice = v

    u.onend = () => setIsPlaying(false)
    u.onerror = () => setIsPlaying(false)

    speechRef.current = u
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(u)
    setIsPlaying(true)
  }

  const nextSection = () => {
    if (currentSection >= totalSections - 1) return
    if (!completedSections.includes(currentSection)) {
      setCompletedSections((s) => [...s, currentSection])
    }
    setCurrentSection((s) => s + 1)
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const prevSection = () => {
    if (currentSection <= 0) return
    setCurrentSection((s) => s - 1)
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const goToSection = (index: number) => {
    setCurrentSection(index)
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const progress = Math.round(((currentSection + 1) / totalSections) * 100)

  const handleLangChange = (val: "vi" | "en" | "ja") => {
    // cập nhật ngôn ngữ UI (Navigation nhận thẳng)
    // @ts-ignore: provider dùng cùng union type
    setLanguage(val)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentLanguage={uiLang} onLanguageChange={handleLangChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              {t.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/noi-dung" className="transition-colors hover:text-primary">
              {t.content}
            </Link>
            <span className="mx-2">/</span>
            <span>{content.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-4 text-center md:mb-8">
            <h1 className="mb-3 text-2xl font-bold md:mb-4 md:text-5xl">
              {content.title}
            </h1>

            <div className="mb-4 flex items-center justify-center gap-3 text-xs text-muted-foreground md:mb-6 md:text-sm">
              <span>
                {currentSection + 1} / {totalSections}
              </span>

              <div className="h-3 w-40 overflow-hidden rounded-full bg-muted md:w-48">
                <motion.div
                  className="h-3 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>

              <span>{progress}%</span>
            </div>

            <MobileTOC
              sections={content.sections}
              current={currentSection}
              onJump={goToSection}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-8 hidden md:block">
                <CardHeader>
                  <CardTitle className="text-lg">{t.toc}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.sections.map((section: Section, index: number) => {
                      const active = index === currentSection
                      const done = completedSections.includes(index)
                      return (
                        <li key={index} className="relative">
                          <button
                            onClick={() => goToSection(index)}
                            data-active={active}
                            aria-current={active ? "true" : "false"}
                            className="group flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all
                                       hover:bg-muted/70
                                       data-[active=true]:bg-primary data-[active=true]:text-primary-foreground
                                       data-[active=true]:shadow-sm"
                          >
                            <Bullet done={done} active={active} />

                            <span className="text-sm font-medium leading-6 line-clamp-2">
                              {section.title}
                            </span>

                            <span
                              className="ml-auto h-1.5 w-8 rounded-full bg-muted-foreground/30 group-data-[active=true]:bg-primary/90"
                              aria-hidden
                            />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <section className="lg:col-span-3">
              <Card className="mb-4 md:mb-6">
                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl md:text-2xl">
                      {content.sections[currentSection].title}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {readingTime} • {t.jumpHint}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTextToSpeech}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      {isPlaying ? (
                        <>
                          <VolumeX className="h-4 w-4" />
                          {t.stop}
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4" />
                          {t.read}
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${uiLang}-${slug}-${currentSection}`} // force remount khi đổi ngôn ngữ/slug/section
                      id="mdTop"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-2xl border bg-muted/40 p-4 md:p-6"
                    >
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert md:prose-lg
                                   prose-strong:text-foreground
                                   prose-p:leading-7 prose-p:my-2 md:prose-p:leading-8
                                   prose-h2:text-xl md:prose-h2:text-2xl
                                   prose-h3:text-lg md:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                                   [&_ul]:pl-6 [&_ul_ul]:pl-6 [&_ol]:pl-6 [&_ol_ol]:pl-6
                                   prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                      >
                        <ReactMarkdown
                          key={`${uiLang}-${slug}`}
                          remarkPlugins={[remarkGfm, remarkUnwrapImages]}
                          components={{
                            ul: (props: any) => {
                              const { node, className, ...rest } = props
                              return (
                                <ul
                                  className={`list-disc list-outside pl-6 my-3 ${
                                    className ?? ""
                                  }`}
                                  {...rest}
                                />
                              )
                            },
                            ol: (props: any) => {
                              const { node, className, ...rest } = props
                              return (
                                <ol
                                  className={`list-decimal list-outside pl-6 my-3 ${
                                    className ?? ""
                                  }`}
                                  {...rest}
                                />
                              )
                            },
                            li: (props: any) => {
                              const { node, className, ...rest } = props
                              return (
                                <li
                                  className={`mt-1 leading-7 md:leading-8 marker:text-primary ${
                                    className ?? ""
                                  }`}
                                  {...rest}
                                />
                              )
                            },
                            // Không bọc <div> quanh ảnh để tránh <p><div/></p> (hydration error)
                            img: (props: any) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                loading="lazy"
                                alt={props.alt ?? ""}
                                className={`block mx-auto my-4 rounded-xl shadow ${
                                  props.className ?? ""
                                }`}
                                {...props}
                              />
                            ),
                          }}
                        >
                          {content.sections[currentSection].content}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" /> {t.prev}
                </Button>

                <div className="flex gap-2">
                  {content.sections.map((_, index: number) => (
                    <button
                      key={index}
                      aria-label={t.goToPart(index + 1)}
                      onClick={() => goToSection(index)}
                      className={`h-2 w-2 rounded-full transition-colors md:h-3 md:w-3 ${
                        index === currentSection
                          ? "bg-primary"
                          : "bg-muted hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSection}
                  disabled={currentSection === totalSections - 1}
                  className="flex items-center gap-2"
                >
                  {currentSection === totalSections - 1 ? t.done : t.next}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Back button */}
              <div className="mt-6 text-center md:mt-8">
                <Button variant="outline" asChild>
                  <Link href="/noi-dung">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t.backToList}
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <DetailedLessonPage />
    </LanguageProvider>
  )
}
