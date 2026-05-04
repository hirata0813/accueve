"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Task = {
  id: number;
  name: string;
  color: string;
};

type Props = {
  tasks: Task[];
};

export default function AchievementSideBar({ tasks }: Props) {
  const pathname = usePathname();

  const isActive = (id: number) => {
    return pathname === `/task/${id}/achievement`;
  };

  return (
    <aside className="w-48 bg-gray-100 h-screen sticky top-20 overflow-y-auto border-r">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">タスク一覧</h2>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link
                href={`/task/${task.id}/achievement`}
                className={`block py-2 rounded transition-colors ${
                  isActive(task.id)
                    ? "bg-blue-500 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: task.color }}
                  />
                  <span>{task.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
