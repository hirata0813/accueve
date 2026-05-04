import { prisma } from "@/app/lib/prisma";
import NavBar from "@/app/ui/navbar";
import AchievementSideBar from "@/app/ui/achievement-sidebar";

export default async function AchievementPage() {
  const tasks = await prisma.task.findMany();

  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />

      <div className="flex w-full">
        {/* サイドバー */}
        <AchievementSideBar tasks={tasks} />

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col items-center p-8">
          <h1 className="text-5xl font-bold">達成度画面</h1>
          
          <div className="mt-8 text-gray-600 text-center">
            <p>左のサイドバーからタスクを選択して、達成度詳細を表示します</p>
          </div>
        </div>
      </div>
    </main>
  );
}
