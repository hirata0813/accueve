"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  name: string;
  maxHoursPerDay: number | null;
};

type Props = {
  task: Task; // タスクオブジェクトを受け取る
};

export default function TaskForm({ task }: Props) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", String(task.id)); // taskIdをフォームデータに追加

    const res = await fetch(`/api/task/${task.id}`, {
      method: "PUT",
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
      <label>
        <span className="block font-semibold">
          タスク名<span className="text-red-500 ml-1">*</span>
        </span>
        <input
          type="text"
          name="name"
          placeholder="タスク名を入力"
          defaultValue={task.name} // タスク名の初期値を設定
          required
          className="border border-gray-300 rounded px-4 py-2 text-lg"
        />
      </label>

      <label>
        <span className="block font-semibold">
          1日の最大時間<span className="text-red-500 ml-1">*</span>
        </span>
        <input
          type="number"
          name="maxHoursPerDay"
          placeholder="1日の最大時間を入力"
          defaultValue={task.maxHoursPerDay ?? ""} // 1日の最大時間の初期値を設定（nullの場合は空文字）
          required
          className="border border-gray-300 rounded px-4 py-2 text-lg"
        />
      </label>

      <label>
        <span className="block font-semibold">
          カラー<span className="text-red-500 ml-1">*</span>
        </span>
        <div className="flex gap-3 mb-4">
          {[
            { name: "red", color: "#ff0000" },
            { name: "blue", color: "#0000ff" },
            { name: "yellow", color: "#ffff00" },
            { name: "green", color: "#008000" },
            { name: "purple", color: "#800080" },
            { name: "orange", color: "#ffa500" }
          ].map((preset) => (
            <label key={preset.name} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="color"
                value={preset.color}
                required
                className="mr-2"
              />
              <div
                className="w-8 h-8 border-2 border-gray-300 rounded"
                style={{ backgroundColor: preset.color }}
              />
            </label>
          ))}
        </div>
      </label>

      <Button type="submit" variant="contained" color="primary">
        更新
      </Button>
    </form>
  );
}
