import "server-only";
import { prisma } from "@/app/lib/prisma";

// 引数: タスク名，1日の最大時間，
export async function updateTaskInfo(formData: FormData) {

  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string
    const color = formData.get("color") as string;
    const maxHoursPerDay = formData.get("setMaxHoursForm") == "yes" 
      ? Number(formData.get("maxHoursPerDay") as String)
      : null;

    console.log("フォームデータ(タスク更新):", { id, name, maxHoursPerDay, color});

    const newRecord = await prisma.task.update({
      where: {
          id: id,
        },

      data: {  // ← 存在する場合に更新
        name: name.trim(),
        maxHoursPerDay: maxHoursPerDay,
        color: color,
      },
    });
    console.log("タスク情報が更新されました:", newRecord);
  } catch (error) {
    console.error("タスク情報更新中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
