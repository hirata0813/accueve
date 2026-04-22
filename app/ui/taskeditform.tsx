"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  name: string;
  maxHoursPerDay: number | null;
  color: string;
};

type Props = {
  task: Task; // タスクオブジェクトを受け取る
};

export default function TaskForm({ task }: Props) {
  const router = useRouter();
  const [showMaxHoursForm, setShowMaxHoursForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState(task.color);

  // コンポーネント初期化時に showMaxHoursForm を設定
  useEffect(() => {
    if (task.maxHoursPerDay == null) {
      setShowMaxHoursForm(false);
    } else {
      setShowMaxHoursForm(true);
    }
  }, [task.maxHoursPerDay]);

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

      <label className="block">
        <span className="block font-semibold">
          時間設定<span className="text-red-500 ml-1">*</span>
        </span>

        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="setMaxHoursForm"
              value="no"
              checked={showMaxHoursForm === false}
              onChange={() => setShowMaxHoursForm(false)}
              className="mr-2"
            />
            <span>設定しない</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="setMaxHoursForm"
              value="yes"
              checked={showMaxHoursForm === true}
              onChange={() => setShowMaxHoursForm(true)}
              className="mr-2"
            />
            <span>設定する</span>
          </label>
        </div>
    
        {showMaxHoursForm && (
          <div className="mt-3 pl-4 border-l-2 border-blue-500">
            <label>
              <span className="block font-semibold mb-2">
                1日の最大時間(h)
              </span>
              <input
                type="number"
                name="maxHoursPerDay"
                placeholder="時間を入力"
                defaultValue={task.maxHoursPerDay || ""}
                min="0.5"
                max="24"
                step="0.5"
                className="border border-gray-300 rounded px-4 py-2 text-lg w-full"
              />
            </label>
          </div>
        )}
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
                checked={selectedColor === preset.color}
                onChange={(e) => setSelectedColor(e.target.value)}
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
