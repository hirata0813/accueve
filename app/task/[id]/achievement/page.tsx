import { prisma } from "@/app/lib/prisma";
import NavBar from "@/app/ui/navbar";
import AchievementSideBar from "@/app/ui/achievement-sidebar";
import { countConsecutiveWorkdays } from "@/app/lib/count-consecutive-workdays";
import { fetchPast30DaysWork } from "@/app/lib/fetch-past-30days-work";
import { BarChart } from "@/app/ui/bar-chart";
import { DailyRecord } from "@/app/ui/daily-record";
import { DisappointmentValley } from "@/app/ui/disappointment-valley";
import { calcTotalHours } from "@/app/lib/calc-total-hours";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;
  const taskId = Number(id);
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return <p>タスクが見つかりませんでした</p>;
  }

  // すべてのタスク一覧を取得（サイドバー用）
  const tasks = await prisma.task.findMany();

  // 達成度情報を取得
  const consecutiveWorkdays = await countConsecutiveWorkdays(taskId);
  const past30DaysWork = await fetchPast30DaysWork(taskId);

  const records = await prisma.record.findMany({
    where: { taskId },
    orderBy: { date: "desc" }
  });

  const totalHours = await calcTotalHours(taskId);

  return (
    <main className="min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />

      {/* コンテンツエリア */}
      <div className="flex flex-1 w-full">
        {/* サイドバー */}
        <AchievementSideBar tasks={tasks} />

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col p-8 space-y-8">
          {/* タスク情報 */}

          {/* DailyRecord（全幅） */}
          <div className="w-full">
            <DailyRecord
              task={task}
              consecutiveWorkdays={consecutiveWorkdays}
              past30DaysWork={past30DaysWork}
            />
          </div>


          {/* タスクのmaxHoursPerDayが設定されている場合のみ、DisappointmentValleyとBarChartを表示 */}
          {task.maxHoursPerDay !== null && (
            <div className="flex flex-1 gap-8 w-full">
              {/* DisappointmentValley */}
              <div className="flex-1">
                <DisappointmentValley 
                  totalHours={totalHours}
                />
              </div>

              {/* BarChart */}
              <div className="flex-1">
                <BarChart records={records} />
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
