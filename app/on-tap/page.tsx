// app/on-tap/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"
import { useState, useEffect } from "react" // Thêm useEffect để xử lý animation

// Import dữ liệu câu hỏi từ file riêng
import { quizData } from "@/constants/quiz-data"

function ReviewPage() {
  const { language, setLanguage } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // Lưu trữ đáp án đã chọn dưới dạng: { [questionId: number]: answerIndex: number }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // State cho animation

  // Animation khi component mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const content = quizData[language] || quizData.en // Fallback to English if language not found
  const totalQuestions = content.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizCompleted(false)
    setIsVisible(false) // Reset animation state
    // Wait a bit before re-enabling visibility for animation
    setTimeout(() => {
      setIsVisible(true)
    }, 100)
  }

  const calculateScore = () => {
    let correct = 0
    content.questions.forEach((question) => {
      // Kiểm tra xem đáp án đã được chọn và có đúng không
      if (selectedAnswers[question.id] !== undefined && selectedAnswers[question.id] === question.correct) {
        correct++
      }
    })
    return correct
  }

  // Đảm bảo currentQ luôn tồn tại trước khi truy cập thuộc tính
  const currentQ = content.questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQ?.id] !== undefined

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="min-h-screen bg-background">
        <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

        <main className="container mx-auto px-4 py-8">
          <div className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
                <CardTitle className="text-2xl">
                  {language === "vi" ? "Kết quả bài tập" : language === "en" ? "Quiz Results" : "クイズ結果"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
                  <p className="text-muted-foreground">
                    {language === "vi"
                      ? `Bạn trả lời đúng ${score}/${totalQuestions} câu hỏi`
                      : language === "en"
                      ? `You answered ${score}/${totalQuestions} questions correctly`
                      : `${score}/${totalQuestions}問正解しました`}
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  {content.questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id]
                    const isCorrect = userAnswer === question.correct

                    return (
                      <div key={question.id} className="p-4 border rounded-lg bg-card shadow-sm">
                        <div className="flex items-start gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">
                              {index + 1}. {question.question}
                            </p>
                            {/* Chỉ hiển thị giải thích nếu câu trả lời sai HOẶC user chọn xem chi tiết (tùy chọn mở rộng) */}
                            {(!isCorrect || userAnswer === undefined) && (
                              <p className="text-sm text-muted-foreground">{question.explanation}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Button onClick={handleRestart} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {language === "vi" ? "Làm lại" : language === "en" ? "Restart Quiz" : "再開始"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Fallback cho trường hợp currentQ không tồn tại (ví dụ: mảng questions rỗng)
  if (!currentQ) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>No questions available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="container mx-auto px-4 py-8">
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{content.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{content.subtitle}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {language === "vi" ? "Tiến độ" : language === "en" ? "Progress" : "進捗"}: {currentQuestion + 1}/
                  {totalQuestions}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion + 1}. {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQ.id]?.toString()}
                // Khi người dùng chọn một đáp án, ta cập nhật state
                onValueChange={(value) => handleAnswerSelect(currentQ.id, Number.parseInt(value))}
                className="space-y-4" // Add spacing between radio options
              >
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQ.id] === index;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 border rounded-md transition-colors cursor-pointer
                        ${
                          isSelected
                            ? 'border-primary bg-primary/10' // Highlight selected answer
                            : 'border-muted hover:bg-accent' // Hover effect for unselected answers
                        }
                      `}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="sr-only" /> {/* Hide default radio button */}
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base font-normal">
                        {option}
                      </Label>
                      {/* Custom radio indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-muted'}`}>
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-transparent hover:bg-accent transition-colors"
            >
              {language === "vi" ? "Câu trước" : language === "en" ? "Previous" : "前へ"}
            </Button>
            <Button onClick={handleNext} disabled={!isAnswered} className="transition-colors">
              {currentQuestion === totalQuestions - 1
                ? language === "vi"
                  ? "Hoàn thành"
                  : language === "en"
                  ? "Finish"
                  : "完了"
                : language === "vi"
                ? "Câu tiếp"
                : language === "en"
                ? "Next"
                : "次へ"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <ReviewPage />
    </LanguageProvider>
  )
}