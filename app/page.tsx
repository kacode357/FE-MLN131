// app/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { useLanguage, LanguageProvider } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Play,
  Users,
  Star,
  ArrowRight,
  Quote,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Target,
  Presentation,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-green-500/5 rounded-full animate-pulse blur-3xl"></div>
      <div
        className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-primary/5 rounded-full animate-bounce blur-2xl"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-bl from-green-600/10 to-emerald-400/5 rounded-full animate-pulse blur-2xl"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/4 left-1/3 w-32 h-32 bg-primary/15 to-green-500/10 rounded-full animate-bounce blur-xl"
        style={{ animationDuration: "4s", animationDelay: "2s" }}
      ></div>
      {/* Moving geometric shapes */}
      <div
        className="absolute top-20 right-20 w-4 h-4 bg-primary/20 rotate-45 animate-spin"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-6 h-6 bg-green-500/20 rounded-full animate-ping"
        style={{ animationDelay: "3s" }}
      ></div>
    </div>
  )
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>(
    [],
  )

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-primary/10 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: "4s",
          }}
        />
      ))}
    </div>
  )
}

function HomePage() {
  const { language, setLanguage } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <FloatingParticles />
      <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 relative">
          <div
            className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mb-12 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="/ho-chi-minh-portrait-with-vietnamese-flag.jpg"
                  alt="Hồ Chí Minh"
                  className="w-full h-full object-cover"
                />
              </div>
              <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4" />
              <blockquote className="text-lg md:text-2xl italic text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                {language === "vi" &&
                  '"Chủ nghĩa xã hội là xã hội không có giai cấp bóc lột, không có áp bức, mọi người đều bình đẳng, tự do và hạnh phúc."' }
                {language === "en" &&
                  '"Socialism is a society without exploiting classes, without oppression, where everyone is equal, free and happy."' }
                {language === "ja" &&
                  "「社会主義は搾取階級がなく、抑圧がなく、すべての人が平等で自由で幸せな社会である。」" }
              </blockquote>
              <cite className="text-base text-primary font-semibold mt-4 block">- Chủ tịch Hồ Chí Minh</cite>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-balance mb-6 text-foreground">
              {language === "vi" && "Chủ nghĩa xã hội & Thời kỳ quá độ lên CNXH"}
              {language === "en" && "Socialism & the Transition to Socialism"}
              {language === "ja" && "社会主義と社会主義への移行期"}
            </h1>

            <div className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-5xl mx-auto leading-relaxed space-y-4">
              <p>
                {language === "vi" &&
                  "Sản phẩm thuyết trình về Chương 3: Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội."}
                {language === "en" &&
                  "Presentation product on Chapter 3: Socialism and the transition period to socialism."}
                {language === "ja" &&
                  "第3章：社会主義と社会主義への移行期に関するプレゼンテーション。"}
              </p>
              <p className="text-lg">
                {language === "vi" &&
                  "Một sản phẩm trình bày toàn diện với nội dung phong phú, hình ảnh minh họa và tương tác đa phương tiện"}
                {language === "en" &&
                  "A comprehensive presentation product with rich content, illustrative images and multimedia interactions"}
                {language === "ja" &&
                  "豊富なコンテンツ、説明画像、マルチメディアインタラクションを含む包括的なプレゼンテーション製品"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
              >
                <Link href="/noi-dung">
                  <Presentation className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {language === "vi" ? "Xem nội dung" : language === "en" ? "View Content" : "内容を見る"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2"
              >
                <Link href="/video">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {language === "vi" ? "Xem video giới thiệu" : language === "en" ? "Watch Introduction" : "紹介ビデオを見る"}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm font-medium text-foreground">
                  {language === "vi" ? "Phần chính" : language === "en" ? "Main Sections" : "主要セクション"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {language === "vi" ? "Nội dung chi tiết" : language === "en" ? "Detailed content" : "詳細な内容"}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-500/5 hover:bg-green-500/10 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">15</div>
                <div className="text-sm font-medium text-foreground">
                  {language === "vi" ? "Slide thuyết trình" : language === "en" ? "Presentation Slides" : "プレゼンテーションスライド"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {language === "vi" ? "Thiết kế chuyên nghiệp" : language === "en" ? "Professional design" : "プロフェッショナルデザイン"}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">20+</div>
                <div className="text-sm font-medium text-foreground">
                  {language === "vi" ? "Hình ảnh minh họa" : language === "en" ? "Illustrations" : "イラスト"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {language === "vi" ? "Chất lượng cao" : language === "en" ? "High quality" : "高品質"}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-sm font-medium text-foreground">
                  {language === "vi" ? "Ngôn ngữ" : language === "en" ? "Languages" : "言語"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {language === "vi" ? "Việt, Anh, Nhật" : language === "en" ? "Vi, En, Ja" : "ベトナム語、英語、日本語"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Socialist Society Definition */}
        <section className="py-16">
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {language === "vi"
                    ? "Xã hội không có giai cấp bóc lột"
                    : language === "en"
                    ? "Society Without Exploiting Classes"
                    : "搾取階級のない社会"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {language === "vi"
                    ? "Tìm hiểu về một xã hội lý tưởng không có sự bóc lột trong khuôn khổ chủ nghĩa xã hội"
                    : language === "en"
                    ? "Learn about an ideal socialist society without exploitation"
                    : "搾取のない理想的な社会主義社会について学ぶ"}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src="https://static.luatvietnam.vn/uploaded/Images/Standard/2023/06/09/giai-cap-la-gi_0906142048.jpeg"
                    alt="Vietnamese workers in equality"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    {language === "vi" ? "Đặc điểm cơ bản" : language === "en" ? "Basic Characteristics" : "基本的特徴"}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Không có sự phân chia giai cấp xã hội" : language === "en" ? "No social class divisions" : "社会階級の分裂がない"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Lao động được trả công xứng đáng" : language === "en" ? "Labor receives fair compensation" : "労働は公正な報酬を受ける"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Tài sản công được quản lý vì lợi ích chung" : language === "en" ? "Public property managed for common benefit" : "共通の利益のために管理される公共財産"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Society Without Oppression */}
        <section className="py-16 bg-muted/30">
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {language === "vi" ? "Xã hội không có áp bức" : language === "en" ? "Society Without Oppression" : "抑圧のない社会"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {language === "vi"
                    ? "Khám phá tầm nhìn về một xã hội tự do, không có sự áp bức và thống trị"
                    : language === "en"
                    ? "Explore the vision of a free society without oppression and domination"
                    : "抑圧と支配のない自由な社会のビジョンを探る"}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 order-2 md:order-1">
                  <h3 className="text-2xl font-bold">
                    {language === "vi" ? "Nguyên tắc tự do" : language === "en" ? "Principles of Freedom" : "自由の原則"}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Tôn trọng nhân phẩm và quyền con người" : language === "en" ? "Respect for human dignity and rights" : "人間の尊厳と権利の尊重"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Dân chủ thực sự trong mọi lĩnh vực" : language === "en" ? "True democracy in all areas" : "すべての分野における真の民主主義"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {language === "vi" ? "Bảo vệ quyền tự do ngôn luận và tư tưởng" : language === "en" ? "Protection of freedom of speech and thought" : "言論と思想の自由の保護"}
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src="https://danhthang.hiephoa.bacgiang.gov.vn/documents/15122220/0/1720269017911_T2.jpg/f4cc6dc8-80bc-4689-b1df-99ab2bd06403?t=1720269017917"
                    alt="Vietnamese people in freedom"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Equality for All */}
        <section className="py-16">
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {language === "vi" ? "Mọi người đều bình đẳng" : language === "en" ? "Everyone is Equal" : "すべての人が平等"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {language === "vi"
                    ? "Tìm hiểu về nguyên tắc bình đẳng trong xã hội chủ nghĩa"
                    : language === "en"
                    ? "Learn about the principle of equality in socialist society"
                    : "社会主義社会における平等の原則について学ぶ"}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                    <CardTitle>
                      {language === "vi" ? "Bình đẳng xã hội" : language === "en" ? "Social Equality" : "社会的平等"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {language === "vi"
                        ? "Không phân biệt xuất thân, giới tính, tôn giáo hay dân tộc"
                        : language === "en"
                        ? "No discrimination based on origin, gender, religion or ethnicity"
                        : "出身、性別、宗教、民族による差別なし"}
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <CardTitle>
                      {language === "vi" ? "Cơ hội bình đẳng" : language === "en" ? "Equal Opportunities" : "平等な機会"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {language === "vi"
                        ? "Mọi người đều có cơ hội phát triển tài năng và năng lực"
                        : language === "en"
                        ? "Everyone has the opportunity to develop talents and abilities"
                        : "誰もが才能と能力を発達させる機会を持つ"}
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Globe className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                    <CardTitle>
                      {language === "vi" ? "Công bằng xã hội" : language === "en" ? "Social Justice" : "社会正義"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {language === "vi"
                        ? "Phân phối công bằng tài nguyên và lợi ích xã hội"
                        : language === "en"
                        ? "Fair distribution of resources and social benefits"
                        : "資源と社会的利益の公正な分配"}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Freedom and Happiness */}
        <section className="py-16 bg-muted/30">
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {language === "vi" ? "Tự do và hạnh phúc" : language === "en" ? "Freedom and Happiness" : "自由と幸福"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {language === "vi"
                    ? "Khám phá mục tiêu cuối cùng của chủ nghĩa xã hội: mang lại hạnh phúc cho mọi người"
                    : language === "en"
                    ? "Explore the ultimate goal of socialism: bringing happiness to everyone"
                    : "社会主義の究極の目標を探る：すべての人に幸福をもたらすこと"}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Lightbulb,
                    title:
                      language === "vi" ? "Phát triển cá nhân" : language === "en" ? "Personal Development" : "個人の発達",
                    description:
                      language === "vi"
                        ? "Mọi người đều có cơ hội phát triển toàn diện"
                        : language === "en"
                        ? "Everyone has the opportunity for comprehensive development"
                        : "誰もが包括的な発達の機会を持つ",
                    color: "text-yellow-500",
                  },
                  {
                    icon: Heart,
                    title: language === "vi" ? "Hạnh phúc gia đình" : language === "en" ? "Family Happiness" : "家族の幸福",
                    description:
                      language === "vi"
                        ? "Gia đình được bảo vệ và hỗ trợ phát triển"
                        : language === "en"
                        ? "Families are protected and supported to develop"
                        : "家族は保護され、発達を支援される",
                    color: "text-red-500",
                  },
                  {
                    icon: Target,
                    title: language === "vi" ? "Mục tiêu sống" : language === "en" ? "Life Purpose" : "人生の目的",
                    description:
                      language === "vi"
                        ? "Mọi người đều có mục tiêu và ý nghĩa sống"
                        : language === "en"
                        ? "Everyone has purpose and meaning in life"
                        : "誰もが人生に目的と意味を持つ",
                    color: "text-blue-500",
                  },
                  {
                    icon: Globe,
                    title: language === "vi" ? "Hòa bình xã hội" : language === "en" ? "Social Peace" : "社会の平和",
                    description:
                      language === "vi"
                        ? "Xã hội hòa hợp, đoàn kết và phát triển bền vững"
                        : language === "en"
                        ? "Harmonious, united and sustainable society"
                        : "調和のとれた、団結した持続可能な社会",
                    color: "text-green-500",
                  },
                ].map((item, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <item.icon className={`h-12 w-12 mx-auto ${item.color} mb-4`} />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  )
}
