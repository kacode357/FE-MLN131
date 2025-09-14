"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser" // Import emailjs

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, MessageSquare, Star, ThumbsUp } from "lucide-react"

// --- Thay info của mày ở đây ---
const EMAILJS_SERVICE_ID = "service_eq3w35l"
const EMAILJS_TEMPLATE_ID = "template_h3jbcbr"
const EMAILJS_PUBLIC_KEY = "od5MXMazz5qwE9WQC"
const ADMIN_NAME = "Ka" // Tên người nhận góp ý (to_name)
// -------------------------------

// Feedback data for different languages
const feedbackData = {
  vi: {
    title: "Phản hồi và Góp ý",
    subtitle: "Chia sẻ ý kiến của bạn để cải thiện khóa học",
    form: {
      name: "Họ và tên",
      email: "Email",
      category: "Loại phản hồi",
      rating: "Đánh giá tổng thể",
      subject: "Tiêu đề",
      message: "Nội dung phản hồi",
      submit: "Gửi phản hồi",
      categories: {
        content: "Nội dung bài học",
        technical: "Vấn đề kỹ thuật",
        suggestion: "Đề xuất cải thiện",
        general: "Góp ý chung",
      },
      ratings: {
        excellent: "Xuất sắc",
        good: "Tốt",
        average: "Trung bình",
        poor: "Kém",
      },
    },
  },
  en: {
    title: "Feedback and Suggestions",
    subtitle: "Share your thoughts to help improve the course",
    form: {
      name: "Full Name",
      email: "Email",
      category: "Feedback Type",
      rating: "Overall Rating",
      subject: "Subject",
      message: "Feedback Content",
      submit: "Send Feedback",
      categories: {
        content: "Course Content",
        technical: "Technical Issues",
        suggestion: "Improvement Suggestions",
        general: "General Feedback",
      },
      ratings: {
        excellent: "Excellent",
        good: "Good",
        average: "Average",
        poor: "Poor",
      },
    },
  },
  ja: {
    title: "フィードバックと提案",
    subtitle: "コース改善のためのご意見をお聞かせください",
    form: {
      name: "氏名",
      email: "メールアドレス",
      category: "フィードバックの種類",
      rating: "総合評価",
      subject: "件名",
      message: "フィードバック内容",
      submit: "フィードバックを送信",
      categories: {
        content: "コース内容",
        technical: "技術的問題",
        suggestion: "改善提案",
        general: "一般的なフィードバック",
      },
      ratings: {
        excellent: "優秀",
        good: "良い",
        average: "普通",
        poor: "悪い",
      },
    },
  },
}

function FeedbackPage() {
  const { language, setLanguage } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    rating: "",
    subject: "",
    message: "",
    to_name: ADMIN_NAME, // Luôn truyền field này lên EmailJS
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("") // Thêm state cho lỗi

  const content = feedbackData[language]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      to_name: ADMIN_NAME, // Đảm bảo to_name luôn được cập nhật
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("") // Reset lỗi cũ

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)

      // Reset form sau 3 giây
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          category: "",
          rating: "",
          subject: "",
          message: "",
          to_name: ADMIN_NAME,
        })
      }, 3000)
    } catch (err: any) {
      console.error("Lỗi gửi email:", err) // Log lỗi ra console để debug
      setError("Lỗi gửi mail, thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const isFormValid = formData.name && formData.email && formData.category && formData.rating && formData.message

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground">{content.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8"> {/* Chỉ còn 1 cột */}
            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {language === "vi" ? "Gửi phản hồi" : language === "en" ? "Send Feedback" : "フィードバック送信"}
                </CardTitle>
                <CardDescription>
                  {language === "vi"
                    ? "Vui lòng điền thông tin để gửi phản hồi"
                    : language === "en"
                      ? "Please fill in the information to send feedback"
                      : "フィードバックを送信するために情報を入力してください"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ThumbsUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "vi" ? "Cảm ơn bạn!" : language === "en" ? "Thank you!" : "ありがとうございます！"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "vi"
                        ? "Phản hồi của bạn đã được gửi thành công."
                        : language === "en"
                          ? "Your feedback has been sent successfully."
                          : "フィードバックが正常に送信されました。"}
                    </p>
                    <Button onClick={() => { setSubmitted(false); setError(""); }} className="mt-4">
                      {language === "vi" ? "Gửi phản hồi khác" : language === "en" ? "Send Another Feedback" : "別のフィードバックを送信"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{content.form.name}</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{content.form.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{content.form.category}</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={content.form.category} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content">{content.form.categories.content}</SelectItem>
                          <SelectItem value="technical">{content.form.categories.technical}</SelectItem>
                          <SelectItem value="suggestion">{content.form.categories.suggestion}</SelectItem>
                          <SelectItem value="general">{content.form.categories.general}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{content.form.rating}</Label>
                      <RadioGroup value={formData.rating} onValueChange={(value) => handleInputChange("rating", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5" id="rating-5" />
                          <Label htmlFor="rating-5" className="flex items-center gap-2">
                            {renderStars(5)} {content.form.ratings.excellent}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="rating-4" />
                          <Label htmlFor="rating-4" className="flex items-center gap-2">
                            {renderStars(4)} {content.form.ratings.good}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="rating-3" />
                          <Label htmlFor="rating-3" className="flex items-center gap-2">
                            {renderStars(3)} {content.form.ratings.average}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="rating-2" />
                          <Label htmlFor="rating-2" className="flex items-center gap-2">
                            {renderStars(2)} {content.form.ratings.poor}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{content.form.subject}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{content.form.message}</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {language === "vi" ? "Đang gửi..." : language === "en" ? "Sending..." : "送信中..."}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          {content.form.submit}
                        </div>
                      )}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>} {/* Hiển thị lỗi */}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <FeedbackPage />
    </LanguageProvider>
  )
}