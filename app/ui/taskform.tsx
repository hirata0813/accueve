"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    {/* 以下のやり方で，外部にAPIリクエストを送り，その結果をawaitして待つみたい */}
    const res = await fetch("/api/task", {
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
      <label>
        <span className="block font-semibold">
          タスク名
        </span>
        <input
          type="text"
          name="name"
          placeholder="タスク名を入力"
          required
          className="border border-gray-300 rounded px-4 py-2 text-lg"
        />
      </label>

      <label>
        <span className="block font-semibold">
          1日の最大時間
        </span>
        <input
          type="number"
          name="maxHoursPerDay"
          placeholder="1日の最大時間を入力"
          required
          className="border border-gray-300 rounded px-4 py-2 text-lg"
        />
      </label>

      <Button type="submit" variant="contained" color="primary">
        タスクを登録する
      </Button>
    </form>
  );
}
