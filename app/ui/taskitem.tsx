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
  past30DaysWork: boolean[];
  todayWork: boolean;
};

export default function TaskItem({ id, name, consecutiveWorkdays, past30DaysWork, todayWork }: Props) {
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
  console.log("chunks:", chunks);

  return (
    <div
      onClick={() => router.push(`/task/${id}`)}
      className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex flex-col justify-between"
    >

      <div className="flex flex-col">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex justify-start">
            {chunk.map((worked, index) => (
              <span key={index} className="mx-0">
                {worked ? (
                  <FaSquare size={16} color="#ff6b6b" />
                ) : (
                  <FaSquare size={16} color="#cccccc" />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>


      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-2">
          <FaFire
            size={24}
            color={todayWork ? "#ff6b6b" : "#cccccc"}
          />
          <span className="font-bold">{consecutiveWorkdays}</span>
          <span>{name}</span>
        </div>


        <Link
          href={`/update-task/${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FaEdit size={24} />
        </Link>
      </div>
    </div>
  );
}
