"use client";
import { calcMaxStreak } from "@/app/lib/calc-max-streak";
import { calcMonthStats } from "@/app/lib/calc-month-stats";
import { MonthCalendar } from "@/app/ui/month-calendar";
import { StreakCard } from "@/app/ui/streak-card";

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
          <StreakCard
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
          <StreakCard
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
