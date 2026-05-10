"use client";
import { useState, useRef, useEffect } from "react";

type Task = {
  id: number;
  name: string;
  color: string;
};

type Props = {
  task: Task;
  consecutiveWorkdays: number;
  past30DaysWork: boolean[];
};

// ツールチップ付き「?」ボタン
function InfoTooltip({ children }: { children: React.ReactNode }) {
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

function MonthCalendar({
  task,
  past30DaysWork,
}: {
  task: Task;
  past30DaysWork: boolean[];
}) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  const workedDates = new Set<number>();
  past30DaysWork.forEach((worked, index) => {
    if (!worked) return;
    const daysAgo = past30DaysWork.length - 1 - index;
    const d = new Date(today);
    d.setDate(today.getDate() - daysAgo);
    if (d.getFullYear() === year && d.getMonth() === month) {
      workedDates.add(d.getDate());
    }
  });

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-gray-500 mb-3 text-center">
        {year}年{month + 1}月
      </p>
      <div className="grid grid-cols-7 mb-1">
        {weekdays.map((w) => (
          <div key={w} className="text-center text-xs text-gray-400 font-medium py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: startWeekday }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isWorked = workedDates.has(day);
          const isToday = day === today.getDate();
          const isFuture = day > today.getDate();
          return (
            <div
              key={day}
              className="flex items-center justify-center mx-auto w-8 h-8 rounded-full text-xs font-medium"
              style={{
                backgroundColor: isWorked ? task.color : isFuture ? "transparent" : "#f3f4f6",
                color: isWorked ? "white" : isFuture ? "#d1d5db" : "#6b7280",
                border: isToday ? `2px solid ${task.color}` : "2px solid transparent",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function calcMaxStreak(past30DaysWork: boolean[]): number {
  let max = 0, current = 0;
  for (const worked of past30DaysWork) {
    current = worked ? current + 1 : 0;
    max = Math.max(max, current);
  }
  return max;
}

function calcMonthStats(past30DaysWork: boolean[]) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  let thisMonthCount = 0;
  const thisMonthTotal = today.getDate();
  const monthlyBuckets: Record<string, number> = {};

  past30DaysWork.forEach((worked, index) => {
    const daysAgo = past30DaysWork.length - 1 - index;
    const d = new Date(today);
    d.setDate(today.getDate() - daysAgo);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (worked) {
      monthlyBuckets[key] = (monthlyBuckets[key] ?? 0) + 1;
      if (d.getFullYear() === year && d.getMonth() === month) thisMonthCount++;
    }
  });

  const bestMonthCount = Math.max(...Object.values(monthlyBuckets), 0);
  return { thisMonthCount, thisMonthTotal, bestMonthCount };
}

function StatCard({
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
        <InfoTooltip>{tooltip}</InfoTooltip>
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

export function DailyRecord({ task, consecutiveWorkdays, past30DaysWork }: Props) {
  const HABIT_DAYS = 66;
  const daysUntilHabit = Math.max(0, HABIT_DAYS - consecutiveWorkdays);
  const maxStreak = calcMaxStreak(past30DaysWork);
  const bestStreak = Math.max(maxStreak, consecutiveWorkdays);
  const { thisMonthCount, thisMonthTotal, bestMonthCount } = calcMonthStats(past30DaysWork);
  const percentage = Math.max(1, Math.round(100 * Math.pow(0.85, consecutiveWorkdays)));

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: task.color }} />
        <h2 className="text-xl font-bold text-gray-800">{task.name}</h2>
      </div>

      <div className="flex gap-6">
        {/* 左: カレンダー */}
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
          <MonthCalendar task={task} past30DaysWork={past30DaysWork} />
        </div>

        {/* 右: 指標群 */}
        <div className="flex flex-col gap-3 w-56">

          {/* 連続日数 */}
          <StatCard
            label="現在の連続達成"
            value={consecutiveWorkdays}
            unit="日連続"
            best={bestStreak}
            bestUnit="日"
            color={task.color}
            tooltip={
              <>
                <p className="font-bold mb-1">💡 あと{daysUntilHabit}日で習慣化</p>
                <p className="text-gray-300">
                  習慣化には一般的に66日の継続が必要と言われています。
                  現在{consecutiveWorkdays}日達成中！
                </p>
                <p className="mt-2 font-bold text-yellow-300">
                  {consecutiveWorkdays}日連続できるのは{percentage}%の人だけです
                </p>
              </>
            }
          />

          {/* 今月の実績 */}
          <StatCard
            label="今月の達成日数"
            value={thisMonthCount}
            unit="日"
            sub={`/ ${thisMonthTotal}日`}
            best={bestMonthCount}
            bestUnit="日"
            color={task.color}
            tooltip={
              <>
                <p className="font-bold mb-1">📅 今月の達成率</p>
                <p className="text-gray-300">
                  今月は{thisMonthTotal}日中{thisMonthCount}日達成。
                  達成率{Math.round((thisMonthCount / thisMonthTotal) * 100)}%です。
                </p>
                <p className="mt-2 text-gray-300">
                  毎日でなくても大丈夫。週5日ペースを目安にしましょう。
                </p>
              </>
            }
          />

        </div>
      </div>
    </div>
  );
}
