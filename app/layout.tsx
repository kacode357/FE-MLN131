// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

// ĐÃ THÊM:
import AIChatBot from "@/components/ai-chatbot"
import WelcomeModal from "@/components/WelcomeModal"

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CNXH và TKQĐ",
  description:
    "Website giáo dục về chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh",
  generator: "v0.app",

  // ★ Thêm logo web từ /public/logo-app.jpg
  icons: {
    icon: [{ url: "/logo-app.jpg", type: "image/jpeg", sizes: "any" }],
    shortcut: [{ url: "/logo-app.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logo-app.jpg", type: "image/jpeg" }],
  },

  // ★ Cho share mạng xã hội dùng luôn ảnh logo
  openGraph: {
    title: "CNXH và TKQĐ",
    description:
      "Website giáo dục về chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh",
    type: "website",
    siteName: "CNXH và TKQĐ",
    locale: "vi_VN",
    images: [{ url: "/logo-app.jpg", width: 1200, height: 630, alt: "CNXH và TKQĐ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CNXH và TKQĐ",
    description:
      "Website giáo dục về chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh",
    images: ["/logo-app.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`font-sans ${notoSans.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={false}
            storageKey="ho-chi-minh-theme"
          >
            {children}

            {/* Welcome modal hiển thị 1 lần */}
            <WelcomeModal language="vi" />

            {/* Chatbot nổi toàn site */}
            <AIChatBot />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
