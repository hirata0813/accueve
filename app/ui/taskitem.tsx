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
  color: string;
  state: string;
  consecutiveWorkdays: number;
  past30DaysWork: boolean[];
  todayWork: boolean;
};

export default function TaskItem({ id, name, color, consecutiveWorkdays, past30DaysWork, todayWork }: Props) {
  const router = useRouter();

  // 配列を10個ずつに分割する関数
  const chunkArray = (array: boolean[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const chunks = chunkArray(past30DaysWork, 10);
  console.log("color:", color);

  return (
    <div
      onClick={() => router.push(`/task/${id}`)}
      className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex flex-col justify-between w-78 h-40"
    >

      <div className="flex flex-col">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex justify-start">
            {chunk.map((worked, index) => (
              <span key={index} className="mx-0">
                {worked ? (
                  <FaSquare size={16*1.6} color={color} />
                ) : (
                  <FaSquare size={16*1.6} color="#cccccc" />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>


      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-2">
          <FaFire
            size={24*1.6}
            color={todayWork ? `${color}` : "#cccccc"}
          />
          <span className="font-bold text-2xl">{consecutiveWorkdays}</span>
          <span className="text-2xl">
            {name.length > 7 ? `${name.slice(0, 7)}...` : name}
          </span>
        </div>


        <Link
          href={`/update-task/${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FaEdit size={24*1.2} />
        </Link>
      </div>
    </div>
  );
}
