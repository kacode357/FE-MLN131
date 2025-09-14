export interface TTSOptions {
  language: "vi" | "en" | "ja"
  rate?: number
  pitch?: number
  volume?: number
}

export class TTSService {
  private static instance: TTSService
  private synthesis: SpeechSynthesis | null = null
  private currentUtterance: SpeechSynthesisUtterance | null = null

  private constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis
    }
  }

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService()
    }
    return TTSService.instance
  }

  isSupported(): boolean {
    return this.synthesis !== null
  }

  async getVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!this.synthesis) return []

    return new Promise((resolve) => {
      const voices = this.synthesis!.getVoices()
      if (voices.length > 0) {
        resolve(voices)
      } else {
        this.synthesis!.onvoiceschanged = () => {
          resolve(this.synthesis!.getVoices())
        }
      }
    })
  }

  async speak(text: string, options: TTSOptions): Promise<void> {
    if (!this.synthesis) {
      throw new Error("Speech synthesis not supported")
    }

    // Stop any current speech
    this.stop()

    const utterance = new SpeechSynthesisUtterance(text)

    // Set language-specific voice
    const voices = await this.getVoices()
    const languageMap = { vi: "vi", en: "en", ja: "ja" }
    const targetLang = languageMap[options.language]
    const voice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLang))

    if (voice) {
      utterance.voice = voice
    }

    utterance.rate = options.rate ?? 0.8
    utterance.pitch = options.pitch ?? 1
    utterance.volume = options.volume ?? 1

    this.currentUtterance = utterance
    this.synthesis.speak(utterance)

    return new Promise((resolve, reject) => {
      utterance.onend = () => {
        this.currentUtterance = null
        resolve()
      }
      utterance.onerror = (event) => {
        this.currentUtterance = null
        reject(new Error(`Speech synthesis error: ${event.error}`))
      }
    })
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel()
      this.currentUtterance = null
    }
  }

  pause(): void {
    if (this.synthesis) {
      this.synthesis.pause()
    }
  }

  resume(): void {
    if (this.synthesis) {
      this.synthesis.resume()
    }
  }

  isSpeaking(): boolean {
    return this.synthesis?.speaking ?? false
  }

  isPaused(): boolean {
    return this.synthesis?.paused ?? false
  }
}
