// components/ai-chatbot.tsx
"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { geminiApiClient } from "@/services/GeminiApiClient"
import { FormattedMessage } from "@/components/ui/formatted-message"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, Send, Loader2, X, Trash2, Minus } from "lucide-react"

type ChatRole = "user" | "assistant"
type ChatMessage = { role: ChatRole; content: string }

const greet: ChatMessage = {
  role: "assistant",
  content:
    "Xin chào 👋 Mình là trợ giảng **Những nguyên lý cơ bản của chủ nghĩa Mác–Lênin**. Bạn muốn ôn phần nào? (Triết học • Kinh tế chính trị • CNXH khoa học)",
}

function useAutoScroll(ref: React.RefObject<HTMLDivElement>, dep: any) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [dep])
}

function normalizeBullets(text: string) {
  // Chuyển các dòng "- " thành "* " để hợp với FormattedMessage
  return text.replace(/^\s*-\s+/gm, "* ")
}

const AIChatBot: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([greet])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useAutoScroll(listRef, messages.length)

  const send = useCallback(async () => {
    const prompt = input.trim()
    if (!prompt || loading) return
    setError(null)

    const userMsg: ChatMessage = { role: "user", content: prompt }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const raw = await geminiApiClient.generateContent(prompt)
      const botMsg: ChatMessage = { role: "assistant", content: normalizeBullets(raw) }
      setMessages((prev) => [...prev, botMsg])
    } catch (e: any) {
      setError(e?.message || "Có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  const reset = () => {
    geminiApiClient.resetChatHistory()
    setMessages([greet])
    setError(null)
  }

  return (
    <>
      {/* Nút mở chat nổi */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-3 shadow-lg transition hover:shadow-xl"
          aria-label="Mở trợ giảng"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="hidden sm:inline">Hỏi trợ giảng</span>
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(92vw,420px)] overflow-hidden rounded-2xl border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </span>
              <div className="leading-tight">
                <div className="font-semibold">Trợ giảng Mác–Lênin</div>
                <div className="text-xs text-muted-foreground">Hỗ trợ: Triết • KTCT • CNXH</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="h-[420px] space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => {
              const isUser = m.role === "user"
              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                      isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {/* Dùng FormattedMessage cho cả 2 phía để support **đậm** & list */}
                    <FormattedMessage text={m.content} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-4 mb-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="flex items-end gap-2 border-t px-3 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nhập câu hỏi (Enter để gửi, Shift+Enter xuống dòng)…"
              rows={2}
              className="min-h-[44px] max-h-40 flex-1 resize-y rounded-xl border bg-background px-3 py-2 text-sm outline-none"
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={send}
                disabled={loading || input.trim() === ""}
                className="inline-flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Gửi
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={reset} className="inline-flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Mới
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatBot
