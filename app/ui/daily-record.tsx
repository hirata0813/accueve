"use client";

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

// 5. 連続日数に応じたメッセージコンポーネント
function ConsecutiveMessage({ days }: { days: number }) {
  // 連続日数が長いほど達成率が低くなる（指数的に減少）
  const percentage = Math.max(1, Math.round(100 * Math.pow(0.85, days)));

  return (
    <div className="bg-indigo-50 rounded-lg p-4 text-center">
      <p className="text-sm text-indigo-700 font-medium leading-relaxed">
        <span className="text-lg font-bold text-indigo-900">{days}日</span>
        連続でできるのは
        <br />
        <span className="text-lg font-bold text-indigo-900">{percentage}%</span>
        の人だけです
      </p>
    </div>
  );
}

// 1. カレンダーコンポーネント
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

  // 今月の1日と末日
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0=日曜

  // past30DaysWork を日付にマッピング
  // past30DaysWork[0] が最も古い日 → 今日から (past30DaysWork.length - 1) 日前
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

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-1">
        {weekdays.map((w) => (
          <div key={w} className="text-center text-xs text-gray-400 font-medium py-1">
            {w}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-y-1">
        {/* 月初の空白 */}
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
              className="flex items-center justify-center aspect-square rounded-full text-xs font-medium mx-auto w-8 h-8"
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

export function DailyRecord({ task, consecutiveWorkdays, past30DaysWork }: Props) {
  // 習慣化まであと何日か（一般的に66日で習慣化と言われる）
  const HABIT_DAYS = 66;
  const daysUntilHabit = Math.max(0, HABIT_DAYS - consecutiveWorkdays);

  return (
    <div className="w-full bg-gray-50 p-2 border rounded-lg">
      {/* タスク名ヘッダー */}
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: task.color }} />
        <h2 className="text-xl font-bold text-gray-800">{task.name}</h2>
      </div>

      {/* メインコンテンツ: 左右レイアウト */}
      <div className="flex gap-6">

        {/* 左: カレンダー */}
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
          <MonthCalendar task={task} past30DaysWork={past30DaysWork} />
        </div>

        {/* 右: メッセージ群 */}
        <div className="flex flex-col gap-4 w-56">

          {/* 2. 連続達成メッセージ */}
          <div
            className="rounded-lg p-4 text-center text-white"
            style={{ backgroundColor: task.color }}
          >
            <p className="text-sm font-medium opacity-90 mb-1">現在連続</p>
            <p className="text-4xl font-bold">{consecutiveWorkdays}日</p>
            <p className="text-sm font-medium opacity-90 mt-1">達成！</p>
          </div>

          {/* 3. 習慣化までのメッセージ */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            {daysUntilHabit > 0 ? (
              <>
                <p className="text-xs text-gray-500 mb-1">習慣化まで</p>
                <p className="text-2xl font-bold text-gray-800">あと{daysUntilHabit}日</p>
                <p className="text-xs text-gray-500 mt-1">継続すると習慣になります</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold" style={{ color: task.color }}>🎉 習慣化</p>
                <p className="text-xs text-gray-500 mt-1">達成おめでとうございます！</p>
              </>
            )}
          </div>

          {/* 4 & 5. 連続日数の希少性メッセージ */}
          <ConsecutiveMessage days={consecutiveWorkdays} />

        </div>
      </div>
    </div>
  );
}
