import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteTask(taskId: number) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    console.log(`Task ${taskId} と関連する Record が削除されました`);
  } catch (error) {
    console.error("タスク削除中にエラーが発生しました:", error);
    throw error;
  }
}
