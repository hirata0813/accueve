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

// ある配列を，任意個数要素の小さな配列に分割する関数
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// 過去N日の日付を生成（今日から遡る）
function getpastNDates(arrayLength: number) {
  const dates = [];
  for (let i = arrayLength - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

// 日付の配列を受取り，その中から日のみを抽出して返す関数
function extractDaysFromDates(dates: Date[]): number[] {
  return dates.map(date => date.getDate());
}

export default function TaskItem({ id, name, color, consecutiveWorkdays, past30DaysWork, todayWork }: Props) {
  const router = useRouter();

  const chunkedWorks = chunkArray<boolean>(past30DaysWork, 10);
  const past30Dates = getpastNDates(past30DaysWork.length);
  const past30Days = extractDaysFromDates(past30Dates);
  const chunkedDays = chunkArray<number>(past30Days, 10);
  console.log("taskname",name, "chunkedDays", chunkedDays);

  return (
    <div
      onClick={() => router.push(`/task/${id}`)}
      className="p-2 border rounded hover:bg-gray-100 cursor-pointer flex flex-col justify-between w-78 h-40"
    >

      <div className="flex flex-col">
        {chunkedWorks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex justify-start">
            {chunk.map((worked, index) => (
              <div
                key={index}
                className="w-6 h-6 flex mx-0.5 my-0.5 items-center justify-center text-xs font-bold border rounded-sm"
                style={{
                  backgroundColor: worked ? color : "#f0f0f0",
                  color: worked ? "white" : "#666666",
                  borderColor: worked ? color : "#cccccc"
                }}
              >
                {chunkedDays[chunkIndex]?.[index]}
              </div>
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
