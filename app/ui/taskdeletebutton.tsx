"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  id: number; // 削除対象のタスクID
};

export default function TaskDeleteButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("このタスクを削除してもよろしいですか？");
    if (!confirmed) return;

    const res = await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("タスクが削除されました");
      router.push("/"); // 削除後にトップページへリダイレクト
    } else {
      const { error } = await res.json();
      alert(`タスク削除に失敗しました: ${error}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      title="タスクを削除"
    >
      <FaTrashAlt size={24} />
    </button>
  );
}
