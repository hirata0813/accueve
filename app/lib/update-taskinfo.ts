import "server-only";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


// 引数: タスク名，1日の最大時間，
export async function updateTaskInfo(formData: FormData) {

  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string
    const maxHoursPerDay = Number(formData.get("maxHoursPerDay") as String)

    console.log("フォームデータ(タスク更新):", { id, name, maxHoursPerDay});

    const newRecord = await prisma.task.update({
      where: {
          id: id,
        },

      data: {  // ← 存在する場合に更新
        name: name.trim(),
        maxHoursPerDay: maxHoursPerDay,
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
