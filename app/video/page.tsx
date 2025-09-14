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
    subtitle: "Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
    videos: [
      {
        id: "vi-1",
        youtubeId: "nheBFcR2i-U",
        title: "Bài giảng CNXHKH | Chương 3. P3. Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
        description: "Video tham khảo từ YouTube.",
        duration: "—",
        views: "—",
        category: "Tham khảo",
      },
      {
        id: "vi-2",
        youtubeId: "E_K0WTzfFGU",
        title: "Full chương 3 - CNXH và thời kì quá độ lên chủ nghĩa xã hội + câu hỏi trắc nghiệm (năm 2022)",
        description: "Video tham khảo từ YouTube.",
        duration: "—",
        views: "—",
        category: "Tham khảo",
      },
      {
        id: "vi-3",
        youtubeId: "e02nXIcfNyA",
        title: "Chủ nghĩa Xã hội là gì? Giải thích siêu dễ hiểu!",
        description: "Video tham khảo từ YouTube.",
        duration: "—",
        views: "—",
        category: "Tham khảo",
      },
    ],
  },
  en: {
    title: "Lecture Videos",
    subtitle: "Socialism and the transition period to socialism",
    videos: [
      {
        id: "en-1",
        youtubeId: "nheBFcR2i-U",
        title: "Bài giảng CNXHKH | Chương 3. P3. Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
        description: "Referenced YouTube video.",
        duration: "—",
        views: "—",
        category: "Reference",
      },
      {
        id: "en-2",
        youtubeId: "E_K0WTzfFGU",
        title: "Full chương 3 - CNXH và thời kì quá độ lên chủ nghĩa xã hội + câu hỏi trắc nghiệm (năm 2022)",
        description: "Referenced YouTube video.",
        duration: "—",
        views: "—",
        category: "Reference",
      },
      {
        id: "en-3",
        youtubeId: "e02nXIcfNyA",
        title: "Chủ nghĩa Xã hội là gì? Giải thích siêu dễ hiểu!",
        description: "Referenced YouTube video.",
        duration: "—",
        views: "—",
        category: "Reference",
      },
    ],
  },
  ja: {
    title: "講義ビデオ",
    subtitle: "社会主義と社会主義への過渡期",
    videos: [
      {
        id: "ja-1",
        youtubeId: "nheBFcR2i-U",
        title: "Bài giảng CNXHKH | Chương 3. P3. Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
        description: "YouTubeの参考動画。",
        duration: "—",
        views: "—",
        category: "参考",
      },
      {
        id: "ja-2",
        youtubeId: "E_K0WTzfFGU",
        title: "Full chương 3 - CNXH và thời kì quá độ lên chủ nghĩa xã hội + câu hỏi trắc nghiệm (năm 2022)",
        description: "YouTubeの参考動画。",
        duration: "—",
        views: "—",
        category: "参考",
      },
      {
        id: "ja-3",
        youtubeId: "e02nXIcfNyA",
        title: "Chủ nghĩa Xã hội là gì? Giải thích siêu dễ hiểu!",
        description: "YouTubeの参考動画。",
        duration: "—",
        views: "—",
        category: "参考",
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
