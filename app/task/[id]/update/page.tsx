"use server";
import { prisma } from "@/app/lib/prisma";
import TaskEditForm from "@/app/ui/taskeditform";
import TaskDeleteButton from "@/app/ui/taskdeletebutton";
import NavBar from "@/app/ui/navbar";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />

      <h1 className="text-5xl font-bold pt-10 pl-8">タスク編集({task.name})</h1>
    
    {/* タスク編集用UI */}

    <div className="mt-8 pl-10 space-y-4">
      <TaskEditForm task={task}/>
      <TaskDeleteButton id={task.id} />
    </div>
    </main>
  );
}
