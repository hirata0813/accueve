import { prisma } from "@/app/lib/prisma";
import { toJSTDateStr } from "./to-jst-date-str";

/**
 * あるタスクについて、本日取り組まれたかどうかを返す関数
 * @param taskId - タスクのID
 * @returns 本日取り組んだかどうか（trueまたはfalse）
 */
export async function fetchTodayWork(taskId: number): Promise<boolean> {
  // タスク情報を取得
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return false;
  }


  // 本日の日付を JST 形式で取得(考慮するのは年月日のみ)
  const today = new Date();
  const todayJSTDate = new Date(toJSTDateStr(today) + "T00:00:00.000Z");
  const todayJSTDateEnd = new Date(toJSTDateStr(today) + "T23:59:59.000Z");;

  const record = await prisma.record.findMany({
    where: {
      taskId,
      date: {
        gte: todayJSTDate,
        lte: todayJSTDateEnd,
      },
    },
    select: { date: true },
  });

  const result = record.length > 0;


  return result;
}
