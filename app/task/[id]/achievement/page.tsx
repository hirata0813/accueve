import { prisma } from "@/app/lib/prisma";
import NavBar from "@/app/ui/navbar";
import AchievementSideBar from "@/app/ui/achievement-sidebar";
import { countConsecutiveWorkdays } from "@/app/lib/count-consecutive-workdays";
import { fetchPast30DaysWork } from "@/app/lib/fetch-past-30days-work";
import { BarChart } from "@/app/ui/bar-chart";
import { DailyRecord } from "@/app/ui/daily-record";
import { DisappointmentValley } from "@/app/ui/disappointment-valley";

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

  return (
    <main className="min-h-screen flex-col items-center">
      {/* NavBar */}
      <NavBar />

      {/* コンテンツエリア */}
      <div className="flex flex-1 w-full">
        {/* サイドバー */}
        <AchievementSideBar tasks={tasks} />

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col p-8">
          {/* タスク情報 */}
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-5xl font-bold">{task.name}</h1>
            <div
              className="w-12 h-12 rounded"
              style={{ backgroundColor: task.color }}
            />
          </div>

          {/* 達成度情報 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-6">
              <p className="text-lg text-gray-600">現在，{consecutiveWorkdays}日連続達成</p>
            </div>

            <div>
              <p className="text-lg text-gray-600 mb-4">過去30日の取り組み状況</p>
              <div className="flex flex-wrap gap-2">
                {past30DaysWork.map((worked, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 border-2 border-black rounded-sm flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: worked ? task.color : "#f0f0f0",
                      color: worked ? "white" : "#666666",
                      borderColor: worked ? task.color : "#cccccc"
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DailyRecord />
          <DisappointmentValley />
          <BarChart />

        </div>
      </div>
    </main>
  );
}
