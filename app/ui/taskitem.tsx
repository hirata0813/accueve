"use client";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaFire } from "react-icons/fa6";
import { FaSquare } from "react-icons/fa";


type Props = {
  id: number;
  name: string;
  maxHoursPerDay: number | null;
  state: string;
  consecutiveWorkdays: number;
  past10DaysWork: boolean[];
  todayWork: boolean;
};

export default function TaskItem({ id, name, consecutiveWorkdays, past10DaysWork, todayWork }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/task/${id}`)}
      className="p-4 border rounded hover:bg-gray-100 cursor-pointer flex justify-between"
    >
      {past10DaysWork.map((worked, index) => (
        <span key={index} className="mx-0">
          {worked ? (
            <FaSquare size={16} color="#ff6b6b" />
          ) : (
            <FaSquare size={16} color="#cccccc" />
          )}
        </span>
      ))}

      <FaFire
        size={24}
        color={todayWork ? "#ff6b6b" : "#cccccc"}
      />

      <span>{consecutiveWorkdays}    {name}</span>

      <Link
        href={`/update-task/${id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <FaEdit size={24} />
      </Link>
    </div>
  );
}
