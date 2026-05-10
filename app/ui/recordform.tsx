"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { toJSTDateStr } from "@/app/lib/to-jst-date-str";

// taskIdをpropsで受け取る
type Props = {
  taskId: number;
  maxHoursPerDay: number | null;
};

export default function RecordForm({ taskId, maxHoursPerDay}: Props) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // taskIdをbodyに追加
    formData.append("taskId", String(taskId));

    {/* 以下のやり方で，外部にAPIリクエストを送り，その結果をawaitして待つみたい */}
    const res = await fetch(`/api/task/${taskId}/record`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/"); // 登録成功後にトップへ
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          {/* 日付 */}
          <label>
            <span className="block font-semibold">
              日付<span className="text-red-500 ml-1">*</span>
            </span>
            <input
              type="date"
              name="date"
              required
              defaultValue={toJSTDateStr(new Date())} // YYYY-MM-DD形式
              className="border border-gray-300 rounded px-4 py-2 text-lg w-full"
            />
          </label>

          {maxHoursPerDay != null && (
            <label>
              <span className="block font-semibold">
                取り組み時間(h)(任意)
              </span>
              <input
                type="number"
                name="hours"
                min="0.5"
                defaultValue="0.5"
                step="0.5"
                max={maxHoursPerDay}
                className="border border-gray-300 rounded px-4 py-2 text-lg w-full"
              />
            </label>
          )}

          {/* 取り組み時間 */}

          {/* 内容 */}
          <label>
            <span className="block font-semibold">
              内容(任意)
            </span>
            <textarea
              name="detail"
              placeholder="取り組んだ内容を入力"
              className="border border-gray-300 rounded px-4 py-2 text-lg w-full"
            />
          </label>

          <Button type="submit" variant="contained" color="primary">
            記録
          </Button>
        </form>
  );
}
