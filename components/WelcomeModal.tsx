// components/WelcomeModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

type Props = {
  language: "vi" | "en";
  src?: string;
  volume?: number;
  storageKeySeen?: string;
  storageKeyVol?: string;
};

export default function WelcomeModal({
  language,
  src = "/videoplayback.m4a",
  volume = 0.35,
  storageKeySeen = "welcomeSeen",
  storageKeyVol = "welcomeVol",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [vol, setVol] = useState(volume);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.localStorage.getItem(storageKeySeen);
    setOpen(seen === "1" ? false : true);

    const savedVol = window.localStorage.getItem(storageKeyVol);
    if (savedVol !== null) {
      const v = clamp01(parseFloat(savedVol));
      setVol(v);
      if (audioRef.current) audioRef.current.volume = v;
    }

    setReady(true);
  }, [storageKeySeen, storageKeyVol]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, [vol]);

  const t =
    language === "vi"
      ? {
          title: "Chào mừng bạn tới website nội dung học thuật",
          desc: "Nhấn Bắt đầu để vào trang và bật nhạc nền.",
          start: "Bắt đầu",
          later: "Đóng",
          volume: "Âm lượng",
          play: "Phát",
          pause: "Tạm dừng",
        }
      : {
          title: "Welcome to the academic content website",
          desc: "Press Start to enter and turn on background music.",
          start: "Start",
          later: "Close",
          volume: "Volume",
          play: "Play",
          pause: "Pause",
        };

  const handleCloseOnly = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKeySeen, "1");
    }
  };

  const handleStart = async () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKeySeen, "1");
    }
    try {
      if (audioRef.current) {
        audioRef.current.volume = vol;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio play blocked:", err);
      setIsPlaying(false);
    }
  };

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value) / 100;
    const clamped = clamp01(v);
    setVol(clamped);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKeyVol, String(clamped));
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn("Toggle play failed:", e);
    }
  };

  if (!ready) {
    return (
      <>
        <audio ref={audioRef} src={src} loop preload="auto" />
      </>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
        >
          <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-gradient-to-br from-card to-primary/10 p-6 text-card-foreground shadow-2xl ring-1 ring-primary/20">
            <h2 id="welcome-title" className="mb-2 text-xl font-semibold">
              {t.title}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">{t.desc}</p>

            <div className="mb-6">
              <label htmlFor="welcome-volume" className="mb-2 block text-sm">
                {t.volume}:{" "}
                <span className="font-medium">{Math.round(vol * 100)}%</span>
              </label>
              <input
                id="welcome-volume"
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(vol * 100)}
                onChange={onChangeVolume}
                className="w-full accent-primary"
                aria-label={t.volume}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseOnly}
                className="rounded-xl border border-border px-4 py-2 text-sm text-foreground hover:bg-muted"
              >
                {t.later}
              </button>

              <button
                type="button"
                onClick={handleStart}
                className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                {t.start}
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-foreground shadow-xl backdrop-blur">
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs hover:bg-muted"
            aria-label={isPlaying ? t.pause : t.play}
            title={isPlaying ? t.pause : t.play}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span className="hidden sm:inline">{isPlaying ? t.pause : t.play}</span>
          </button>

          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-primary/80" />
            <div className="flex flex-col">
              <label
                htmlFor="welcome-volume-mini"
                className="text-[11px] text-muted-foreground"
              >
                {t.volume}:{" "}
                <span className="font-medium text-foreground">
                  {Math.round(vol * 100)}%
                </span>
              </label>
              <input
                id="welcome-volume-mini"
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(vol * 100)}
                onChange={onChangeVolume}
                className="w-40 accent-primary"
                aria-label={t.volume}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0.35;
  return Math.max(0, Math.min(1, n));
}
