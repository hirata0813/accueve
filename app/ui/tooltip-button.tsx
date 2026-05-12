"use client";
import { useState, useRef, useEffect } from "react";

// ツールチップ付き「?」ボタン
export function TooltipButton({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 外側クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 text-white text-xs font-bold flex items-center justify-center transition-colors"
        aria-label="詳細を表示"
      >
        ?
      </button>
      {open && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-56 bg-gray-800 text-white text-xs rounded-lg p-3 shadow-xl leading-relaxed">
          {children}
          {/* 吹き出しの三角 */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
        </div>
      )}
    </div>
  );
}
