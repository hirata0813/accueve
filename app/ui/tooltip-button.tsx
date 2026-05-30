"use client";
import { useState, useRef, useEffect } from "react";

// ツールチップ付き「?」ボタン
export function TooltipButton({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null); // ツールチップ全体の div に対応する DOM 要素にアクセスするための ref

  // 外側クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { //ref が指す DOM 要素(つまりツールチップの div) の外側がクリックされた場合
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler); // ドキュメント全体で mousedown イベントを監視
    return () => document.removeEventListener("mousedown", handler); // ここは，コンポーネントがアンマウントされるときに実行される(今回の場合，実質リロード時のみ)
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-center">
      {/* onClick={() => ... }：クリック時に実行される関数を渡す
          setOpen((v) => !v);：open の状態を切り替える
          v：現在の open の値．変数名は v でなくても良い
      */}
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
