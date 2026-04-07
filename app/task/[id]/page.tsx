import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import RecordForm from "../../ui/recordform";

const prisma = new PrismaClient();

export default async function TaskPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) {
    return <p>タスクが見つかりませんでした</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <p className="text-xl">達成度記録</p>
      <h1 className="text-4xl font-bold">タスク名：{task.name} 1日の最大時間: {task.maxHoursPerDay} 状態: {task.state}</h1>

    {/* 達成度登録用UI */}
    <RecordForm taskId={task.id} />

      <Link href="/">タスク一覧へ戻る</Link>
    </main>
  );
}
