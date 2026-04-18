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
      <Button type="submit" variant="contained" color="primary">
        更新
      </Button>
    </form>
  );
}
