import { prisma } from "@/app/lib/prisma";
import RecordForm from "../../ui/recordform";
import NavBar from "@/app/ui/navbar";

export default async function TaskPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) {
    return <p>タスクが見つかりませんでした</p>;
  }

  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />

      <h1 className="text-5xl font-bold pt-10 pl-8">達成度記録({task.name})</h1>

      {/* 達成度登録用UI */}
      <div className="mt-8 pl-10 space-y-4">
        <RecordForm taskId={task.id} maxHoursPerDay={task.maxHoursPerDay}/>
      </div>
    </main>
  );
}
