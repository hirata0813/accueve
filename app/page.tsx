import { PrismaClient } from "@prisma/client";
import ButtonUsage from "./ui/linkbutton";
import Link from "next/link";
import TaskItem from "./ui/taskitem";
import { Fragment } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { countConsecutiveWorkdays } from "./lib/count-consecutive-workdays";
import { fetchPast30DaysWork } from "./lib/fetch-past-30days-work";
import { fetchTodayWork } from "./lib/fetch-today-work";

const prisma = new PrismaClient();

export default async function Home() {
  const tasks = await prisma.task.findMany();

  const tasksStats = await Promise.all(
    tasks.map(async (task) => {
      const consecutiveWorkdays = await countConsecutiveWorkdays(task.id);
      const past30DaysWork = await fetchPast30DaysWork(task.id);
      const todayWork = await fetchTodayWork(task.id);
      return { ...task, consecutiveWorkdays, past30DaysWork, todayWork };
    })
  );
  //console.log("タスク情報:", tasksStats);

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xl">Accueve(達成度管理アプリ)</p>

      {/* メニューバー */}
      <nav className="w-full bg-gray-800 text-white py-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <ButtonUsage href={"/"} label="タスク一覧" />
          </li>
          <li>
            <ButtonUsage href={"/achievement"} label="達成度画面" />
          </li>
          <li>
            <ButtonUsage href={"/saying"} label="格言" />
          </li>
        </ul>
      </nav>

      <h1 className="text-4xl font-bold">タスク一覧</h1>

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
              past30DaysWork={tasksStats.find((t) => t.id === task.id)?.past30DaysWork || []}
              todayWork={tasksStats.find((t) => t.id === task.id)?.todayWork || false}
            />

          </Fragment>
        ))}
      </ul>
    </main>
  );
}
