import { PrismaClient } from "@prisma/client";
import TaskItem from "./ui/taskitem";
import { countConsecutiveWorkdays } from "./lib/count-consecutive-workdays";
import { fetchPast30DaysWork } from "./lib/fetch-past-30days-work";
import { fetchTodayWork } from "./lib/fetch-today-work";
import NavBar from "./ui/navbar";

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

  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />

      <h1 className="text-5xl font-bold pt-10 pl-8">タスク一覧</h1>

      {/* TODO: API化(/api/tasks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full pt-15 px-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            maxHoursPerDay={task.maxHoursPerDay}
            color={task.color}
            state={task.state}
            consecutiveWorkdays={tasksStats.find((t) => t.id === task.id)?.consecutiveWorkdays || 0}
            past30DaysWork={tasksStats.find((t) => t.id === task.id)?.past30DaysWork || []}
            todayWork={tasksStats.find((t) => t.id === task.id)?.todayWork || false}
          />
        ))}
      </div>

    </main>
  );
}
