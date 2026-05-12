"use client";
import { TooltipButton } from "@/app/ui/tooltip-button";

export function StreakCard({
  label,
  value,
  unit,
  sub,
  best,
  bestUnit,
  color,
  tooltip,
}: {
  label: string;
  value: number;
  unit: string;
  sub?: string;
  best: number;
  bestUnit: string;
  color: string;
  tooltip: React.ReactNode;
}) {
  const isPersonalBest = value >= best;
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col gap-2">
      {/* ラベル行 */}
      <div className="flex items-center gap-1.5">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <TooltipButton>{tooltip}</TooltipButton>
      </div>

      {/* 現在値 */}
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold" style={{ color }}>
          {value}
        </span>
        <span className="text-sm text-gray-600 mb-1">{unit}</span>
        {sub && <span className="text-xs text-gray-400 mb-1 ml-1">{sub}</span>}
      </div>

      {/* 過去最高 */}
      <div className="flex items-center gap-1.5 border-t pt-2">
        <span className="text-xs text-gray-400">過去最高</span>
        <span className="text-sm font-bold text-gray-700">{best}{bestUnit}</span>
        {isPersonalBest && (
          <span className="text-xs font-bold text-amber-500 ml-auto">🏆 PB更新中！</span>
        )}
      </div>
    </div>
  );
}
