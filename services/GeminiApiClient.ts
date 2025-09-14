// services/GeminiApiClient.ts
import axios from "axios"

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

const MAX_CONVERSATION_PAIRS = 7

interface ContentPart {
  text: string
}

interface Content {
  role: "user" | "model"
  parts: ContentPart[]
}

interface GeminiApiRequestBody {
  contents: Content[]
  generationConfig: {
    temperature: number
    maxOutputTokens: number
  }
  safetySettings: {
    category: string
    threshold: string
  }[]
}

interface GeminiApiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

class GeminiApiClient {
  private apiEndpoint: string
  private chatHistory: Content[] = []
  private initialInstructionGiven = false

  constructor(endpoint: string = GEMINI_API_ENDPOINT) {
    this.apiEndpoint = endpoint
  }

  /** Guard: block yêu cầu ngoài phạm vi (toán/lập trình/khác lạc đề) */
  private isIrrelevant(prompt: string): boolean {
    const p = prompt.toLowerCase()

    // Toán học
    const mathHints = [
      "giải phương trình",
      "phương trình",
      "đạo hàm",
      "tích phân",
      "vi phân",
      "tổ hợp",
      "xác suất",
      "ma trận",
      "matrix",
      "determinant",
      "giải hệ",
      "limit",
      "integral",
      "derivative",
      "solve",
      "calculate",
      "tính giá trị",
      "hình học",
      "hàm số",
    ]
    if (
      mathHints.some((k) => p.includes(k)) ||
      /[0-9][\s]*[+\-*/=^][\s]*[0-9]/.test(p) // pattern đơn giản: biểu thức số học
    ) {
      return true
    }

    // Lập trình/kỹ thuật phần mềm
    const codeHints = [
      "code",
      "bug",
      "compile",
      "lỗi biên dịch",
      "algorithm",
      "thuật toán",
      "javascript",
      "typescript",
      "python",
      "java",
      "c++",
      "c#",
      "golang",
      "php",
      "react",
      "nextjs",
      "node",
      "docker",
      "kubernetes",
    ]
    if (codeHints.some((k) => p.includes(k))) return true

    // Một số lĩnh vực không liên quan thường gặp
    const otherHints = [
      "bóng đá",
      "tỷ số",
      "kèo",
      "crypto",
      "chứng khoán",
      "forex",
      "sức khỏe",
      "chẩn đoán",
      "đi khám",
      "thời tiết",
      "nấu ăn",
      "du lịch",
      "đặt phòng",
      "giải trí",
    ]
    if (otherHints.some((k) => p.includes(k))) return true

    return false
  }

  /**
   * Thiết lập hướng dẫn ban đầu: Trợ giảng môn "Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin".
   * Nguyên tắc:
   * - Trả lời bằng tiếng Việt mặc định, ngắn–gọn–đủ ý, có cấu trúc (mục/ý chính/bằng chứng).
   * - Trọng tâm: Triết học Mác-Lênin, Kinh tế chính trị Mác-Lênin và Chủ nghĩa xã hội khoa học.
   * - Liên hệ hiện tại: có thể minh họa, nhưng tránh khẳng định sự kiện chưa kiểm chứng.
   * - Nếu câu hỏi ngoài phạm vi (toán, lập trình, y tế, tài chính, v.v.) → lịch sự từ chối và gợi ý hỏi lại cho đúng phạm vi.
   */
  private ensureInitialInstruction() {
    if (!this.initialInstructionGiven) {
      this.chatHistory = [
        {
          role: "user",
          parts: [
            {
              text: `
Bạn là trợ giảng môn "Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin" tại đại học.
Mục tiêu: giúp người học nắm chắc các nội dung cơ bản, cốt lõi của môn học (gồm 3 phần chính):
1.  **Triết học Mác-Lênin:** Vật chất, ý thức, phép biện chứng duy vật, lý luận nhận thức, quan hệ biện chứng giữa tồn tại xã hội và ý thức xã hội.
2.  **Kinh tế chính trị Mác-Lênin:** Học thuyết giá trị thặng dư, quy luật kinh tế của chủ nghĩa tư bản, vai trò của sản xuất và lưu thông.
3.  **Chủ nghĩa xã hội khoa học:** Sứ mệnh lịch sử của giai cấp công nhân, hình thái kinh tế-xã hội cộng sản chủ nghĩa, thời kỳ quá độ lên chủ nghĩa xã hội.

Quy tắc trả lời:
1) Ưu tiên tiếng Việt, văn phong học thuật nhưng dễ hiểu; trả lời có cấu trúc: Mở ý → Luận điểm → Luận cứ/bằng chứng ngắn → Kết luận/ngụ ý học tập.
2) Khi phù hợp, gợi ý liên hệ thực tiễn hiện nay một cách thận trọng (tránh khẳng định thông tin chưa kiểm chứng).
3) Nếu câu hỏi nằm ngoài phạm vi môn học (ví dụ: giải toán, lập trình, chẩn đoán y khoa, chứng khoán, cá cược, mẹo đời sống...), hãy từ chối ngắn gọn:
"Xin lỗi, mình chỉ hỗ trợ môn Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin. Hãy hỏi về: triết học, kinh tế chính trị hoặc chủ nghĩa xã hội khoa học."
4) Nếu yêu cầu mơ hồ, hãy hỏi lại 1 câu để làm rõ phạm vi trong khuôn khổ môn học (không hỏi dồn dập).
`.trim(),
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Mình đã sẵn sàng hỗ trợ môn Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin với câu trả lời súc tích, có hệ thống và bám sát phạm vi môn học.",
            },
          ],
        },
      ]
      this.initialInstructionGiven = true
    }
  }

  /** Giữ lịch sử hội thoại gọn để tránh quá token */
  private trimChatHistory() {
    if (this.chatHistory.length > 2 + MAX_CONVERSATION_PAIRS * 2) {
      const startIndex = this.chatHistory.length - MAX_CONVERSATION_PAIRS * 2
      this.chatHistory = [this.chatHistory[0], this.chatHistory[1], ...this.chatHistory.slice(startIndex)]
    }
  }

  /** Sinh nội dung từ Gemini (hoặc từ chối nếu ngoài phạm vi) */
  async generateContent(prompt: string): Promise<string> {
    this.ensureInitialInstruction()

    // Nếu ngoài phạm vi → trả lời từ chối, không gọi API
    if (this.isIrrelevant(prompt)) {
      return (
        "Xin lỗi, mình chỉ hỗ trợ **môn Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin**.\n" +
        "Bạn có thể hỏi về: triết học, kinh tế chính trị hoặc chủ nghĩa xã hội khoa học."
      )
    }

    this.chatHistory.push({ role: "user", parts: [{ text: prompt }] })
    this.trimChatHistory()

    const requestBody: GeminiApiRequestBody = {
      contents: this.chatHistory,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 1200,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    }

    try {
      const response = await axios.post<GeminiApiResponse>(this.apiEndpoint, requestBody, {
        headers: { "Content-Type": "application/json" },
        timeout: 45000,
      })

      const botResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (!botResponse) {
        throw new Error("Phản hồi từ Gemini API không đúng định dạng.")
      }

      this.chatHistory.push({ role: "model", parts: [{ text: botResponse }] })
      return botResponse
    } catch (error: any) {
      // rollback nếu vừa push user
      if (this.chatHistory.length > 0 && this.chatHistory[this.chatHistory.length - 1].role === "user") {
        this.chatHistory.pop()
      }

      console.error("Lỗi khi gọi Gemini API:", error?.response?.data || error?.message)
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response
        const errorMessage = (data as any)?.error?.message || "Lỗi không xác định từ máy chủ."
        if (status === 429) throw new Error(`Hệ thống đang quá tải, vui lòng thử lại sau. (${errorMessage})`)
        throw new Error(`Lỗi từ API: ${status} - ${errorMessage}`)
      }
      throw error
    }
  }

  resetChatHistory() {
    this.chatHistory = []
    this.initialInstructionGiven = false
  }

  primeHistoryFromUI(transcript: { role: "user" | "assistant"; content: string }[]) {
    this.ensureInitialInstruction()
    for (const m of transcript) {
      this.chatHistory.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })
    }
    this.trimChatHistory()
  }
}

export const geminiApiClient = new GeminiApiClient()