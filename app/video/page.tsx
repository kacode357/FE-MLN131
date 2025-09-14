// app/video/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play, Clock, Eye, Youtube } from "lucide-react"
import { useMemo, useState } from "react"

type Lang = "vi" | "en" | "ja"

type VideoItem = {
  id: string
  youtubeId: string
  title: string
  description: string
  duration: string
  views: string
  category: string
}

type VideoPack = {
  title: string
  subtitle: string
  videos: VideoItem[]
}

const videoData: Record<Lang, VideoPack> = {
  vi: {
    title: "Video bài giảng",
    subtitle: "Tài liệu video về tư tưởng Hồ Chí Minh",
    videos: [
      {
        id: "vi-1",
        youtubeId: "fjD2b-6HsvU",
        title: "Tư tưởng HCM về CNXH và con đường quá độ lên CNXH ở Việt Nam",
        description: "Bài giảng chương 3: quan điểm về CNXH và con đường quá độ lên CNXH.",
        duration: "~30:00",
        views: "—",
        category: "Lý thuyết",
      },
      {
        id: "vi-2",
        youtubeId: "QYX6Tnmq3vs",
        title: "Ôn tập nhanh: Tư tưởng HCM về độc lập dân tộc & CNXH",
        description: "Tóm tắt nhanh nội dung trọng tâm chương 3.",
        duration: "~18:00",
        views: "—",
        category: "Ôn tập",
      },
      {
        id: "vi-3",
        youtubeId: "pvNBXiD5Rao",
        title: "Đặc trưng của kinh tế thị trường định hướng XHCN ở Việt Nam",
        description: "Giải thích các đặc trưng của mô hình kinh tế thị trường định hướng XHCN.",
        duration: "~22:00",
        views: "—",
        category: "Đặc trưng",
      },
    ],
  },
  en: {
    title: "Lecture Videos",
    subtitle: "Video materials on Ho Chi Minh's thought",
    videos: [
      {
        id: "en-1",
        youtubeId: "bQX_F-fQS2k",
        title: "Vietnam’s Path to Socialism (Webinar)",
        description: "Discussion on Vietnam’s pathway to socialism and key milestones.",
        duration: "~1:30:00",
        views: "—",
        category: "Theory",
      },
      {
        id: "en-2",
        youtubeId: "YvqKhA8E20U",
        title: "How Is Vietnamese Socialism Unique?",
        description: "Overview of distinctive features of Vietnamese socialism.",
        duration: "~12:00",
        views: "—",
        category: "Features",
      },
      {
        id: "en-3",
        youtubeId: "_VKLaly6bfE",
        title: "Ho Chi Minh Thought for Beginners",
        description: "Intro talk on Ho Chi Minh Thought and its core ideas.",
        duration: "~25:00",
        views: "—",
        category: "Intro",
      },
    ],
  },
  ja: {
    title: "講義ビデオ",
    subtitle: "ホー・チ・ミン思想に関するビデオ資料",
    videos: [
      {
        id: "ja-1",
        youtubeId: "ukPsZ-5BhFk",
        title: "ベトナムの社会主義って何ですか？",
        description: "ベトナムの社会主義の基本をわかりやすく解説。",
        duration: "~13:00",
        views: "—",
        category: "解説",
      },
      {
        id: "ja-2",
        youtubeId: "jZ4ZZpWLGwM",
        title: "ホー・チ・ミン：ベトナム建国の父（解説）",
        description: "ホー・チ・ミンの生涯と歴史的背景を概説。",
        duration: "~21:00",
        views: "—",
        category: "歴史",
      },
      {
        id: "ja-3",
        youtubeId: "9qd_45xkK3Q",
        title: "【和訳】ベトナム独立宣言（逐語訳）",
        description: "1945年9月2日 バーディン広場の独立宣言を日本語で紹介。",
        duration: "~11:00",
        views: "—",
        category: "資料",
      },
    ],
  },
}

function getYoutubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

function VideoGrid({ pack }: { pack: VideoPack }) {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const current = useMemo(
    () => pack.videos.find((v) => v.youtubeId === selectedId) || null,
    [selectedId, pack.videos],
  )

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pack.videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={getYoutubeThumb(video.youtubeId)}
                alt={video.title}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/educational-video-thumbnail.png"
                }}
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => {
                    setSelectedId(video.youtubeId)
                    setOpen(true)
                  }}
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                {video.category}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              <CardDescription className="line-clamp-3">{video.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {video.duration}
                </div>
                <a
                  className="inline-flex items-center gap-1 hover:underline"
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </a>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {video.views}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-2 sm:p-4">
          {current && (
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${current.youtubeId}`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function VideoPage() {
  const { language, setLanguage } = useLanguage()
  const pack = useMemo(() => videoData[language as Lang] ?? videoData.vi, [language])

  return (
    <div className="min-h-screen bg-background">
      {/* Truyền đúng props theo NavigationProps */}
      <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{pack.title}</h1>
            <p className="text-xl text-muted-foreground">{pack.subtitle}</p>
          </div>

          <VideoGrid pack={pack} />
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <VideoPage />
    </LanguageProvider>
  )
}
