import "server-only";
import { prisma } from "@/app/lib/prisma";

// 引数: タスク名，1日の最大時間，
export async function registerRecord(formData: FormData) {

  try {
    const dateStr = formData.get("date") as string;
    const date = new Date(dateStr + "T00:00:00.000Z");
    const hours = Number(formData.get("hours"));
    const detail = formData.get("detail") as string;
    const taskId = Number(formData.get("taskId"));

    console.log("フォームデータ:", { date, hours, detail, taskId });

    const newRecord = await prisma.record.upsert({
      where: {
          taskId_date: {  // ← 既存レコードの特定条件
            taskId: taskId,
            date: date,
          },
        },
      create: {  // ← 存在しない場合に作成
        taskId: taskId,
        date: date,
        hours: hours,
        detail: detail.trim(),
        done: true,
      },
      update: {  // ← 存在する場合に更新
        hours: hours,
        detail: detail.trim(),
      },
    });
    console.log("新規レコードが登録されました:", newRecord);
  } catch (error) {
    console.error("レコード登録中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
