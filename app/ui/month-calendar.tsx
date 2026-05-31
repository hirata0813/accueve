"use client";
import { useState } from "react";

type Task = {
  id: number;
  name: string;
  color: string;
};

type Props = {
  task: Task;
  past30DaysWork: boolean[];
  records: Array<{
    date: Date;
    hours: number | null;
    detail: string | null;
  }>;
};

export function MonthCalendar({
  task,
  past30DaysWork,
  records,
}: Props) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
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

  // 選択された日付のレコードを取得
  const getRecordForDate = (date: number) => {
    const dateStr = new Date(year, month, date).toDateString();
    return records.find((r) => new Date(r.date).toDateString() === dateStr);
  };

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-gray-500 mb-3 text-center">
        {year}年 {month + 1}月
      </p>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-y-1 mb-2">
        {weekdays.map((w) => (
          <div key={w} className="text-center text-xs text-gray-400 font-medium py-1">
            {w}
          </div>
        ))}
      </div>

      {/* カレンダー日付 */}
      <div className="grid grid-cols-7 gap-y-1 relative">
        {/* 月初の空白 */}
        {Array.from({ length: startWeekday }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 日付 */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isWorked = workedDates.has(day);
          const isToday = day === today.getDate();
          const isFuture = day > today.getDate();
          const record = getRecordForDate(day);

          return (
            <div key={day} className="relative flex justify-center">
              <button
                onClick={() => setSelectedDay(isWorked ? day : null)}
                className="flex items-center justify-center mx-auto w-8 h-8 rounded-full text-xs font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: isWorked ? task.color : isFuture ? "transparent" : "#f3f4f6",
                  color: isWorked ? "white" : isFuture ? "#d1d5db" : "#6b7280",
                  border: isToday ? `2px solid ${task.color}` : "2px solid transparent",
                  cursor: isWorked ? "pointer" : "default",
                }}
                disabled={!isWorked}
              >
                {day}
              </button>

              {/* ツールチップ（カレンダの数字の部分を押下すると表示される） */}
              {selectedDay === day && isWorked && record && (
                <div className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg p-3 w-56 top-10 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  <p className="font-bold text-gray-900 mb-2 whitespace-normal">
                    {year}年{month + 1}月{day}日
                  </p>
                  <p className="text-gray-700 mb-2 whitespace-normal">
                    取組時間:
                    <span className="font-bold ml-1">{record.hours}時間</span>
                  </p>
                  {record.detail && (
                    <p className="text-gray-600 whitespace-pre-wrap mb-2">
                      {record.detail}
                    </p>
                  )}
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    閉じる
                  </button>
                </div>
              )}

              {/* クリック外で閉じる */}
              {selectedDay === day && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSelectedDay(null)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
