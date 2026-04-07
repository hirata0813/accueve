"use server";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import TaskEditForm from "../../ui/taskeditform";
import TaskDeleteButton from "../../ui/taskdeletebutton";

const prisma = new PrismaClient();

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xl">タスク編集画面</p>
    
    {/* タスク編集用UI */}
    <TaskEditForm task={task}/>
    <TaskDeleteButton id={task.id} />

    <div>
      <Link href={"/"}>タスク一覧へ</Link>
    </div>
    </main>
  );
}
