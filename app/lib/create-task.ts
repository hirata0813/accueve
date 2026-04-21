import "server-only";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// 引数: タスク名，1日の最大時間，
export async function createTask(formData: FormData) {
  // 引数取り出し
  console.log("フォームデータ:", formData);
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const maxHoursPerDay = formData.get("setMaxHoursForm") == "yes" 
    ? Number(formData.get("maxHoursPerDay") as String)
    : null;

  try {
    const newTask = await prisma.task.create({
      data: {
        name: name.trim(),
        state: "DO", // デフォルト値
        maxHoursPerDay: maxHoursPerDay,
        color: color,
      },
    });

    console.log("新規タスクが登録されました:", newTask);
  } catch (error) {
    console.error("タスク登録中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
