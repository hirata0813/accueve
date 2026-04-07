import { PrismaClient } from "@prisma/client";
import ButtonUsage from "./ui/linkbutton";
import Link from "next/link";
import TaskItem from "./ui/taskitem";
import { Fragment } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { countConsecutiveWorkdays } from "./lib/count-consecutive-workdays";
import { fetchPast10DaysWork } from "./lib/fetch-past-10days-work";
import { fetchTodayWork } from "./lib/fetch-today-work";

const prisma = new PrismaClient();

export default async function Home() {
  const tasks = await prisma.task.findMany();

  const tasksStats = await Promise.all(
    tasks.map(async (task) => {
      const consecutiveWorkdays = await countConsecutiveWorkdays(task.id);
      const past10DaysWork = await fetchPast10DaysWork(task.id);
      const todayWork = await fetchTodayWork(task.id);
      return { ...task, consecutiveWorkdays, past10DaysWork, todayWork };
    })
  );
  console.log("タスク情報:", tasksStats);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xl">達成度管理アプリ初期画面</p>
      <h1 className="text-4xl font-bold">タスク一覧</h1>

      <ButtonUsage href={"/achievement"} label="達成度画面へ" />
      <ButtonUsage href={"/saying"} label="格言へ" />
      <Link
        href="/create-task"
        className="text-blue-500 hover:underline text-lg font-medium"
      >
        <CiCirclePlus size={72} />
      </Link>

      {/* TODO: API化(/api/tasks) */}
      <ul>
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <TaskItem
              key={task.id}
              id={task.id}
              name={task.name}
              maxHoursPerDay={task.maxHoursPerDay}
              state={task.state}
              consecutiveWorkdays={tasksStats.find((t) => t.id === task.id)?.consecutiveWorkdays || 0}
              past10DaysWork={tasksStats.find((t) => t.id === task.id)?.past10DaysWork || []}
              todayWork={tasksStats.find((t) => t.id === task.id)?.todayWork || false}
            />

          </Fragment>
        ))}
      </ul>
    </main>
  );
}
