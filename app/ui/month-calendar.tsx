"use client";
type Task = {
  id: number;
  name: string;
  color: string;
};

export function MonthCalendar({
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
