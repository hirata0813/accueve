import { prisma } from "@/app/lib/prisma";
import { toJSTDateStr } from "./to-jst-date-str";

/**
 * あるタスクについて、直近10日間各日で取り組まれたかどうかの配列を返す関数
 * @param taskId - タスクのID
 * @returns 各日で取り組んだかどうかの配列（trueまたはfalse）
 */
export async function fetchPast30DaysWork(taskId: number): Promise<boolean[]> {
  // タスク情報を取得
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return [];
  }


  // 本日の日付を JST 形式で取得(考慮するのは年月日のみ)
  const today = new Date();
  const todayJSTDate = new Date(toJSTDateStr(today) + "T00:00:00.000Z");

  // タスク作成日の日付を JST 形式で取得(考慮するのは年月日のみ)
  const createdAt = task.createdAt;
  const createdAtJSTDate = new Date(toJSTDateStr(createdAt) + "T00:00:00.000Z");

  const diffTime = todayJSTDate.getTime() - createdAtJSTDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //console.log(`タスク名 ${task.name} の作成日から今日までの差:`, diffDays, "日");

  // 配列の長さを決定（10日間または作成後の日数）
  const arrayLength = Math.min(diffDays + 1, 30);

  // 直近 arrayLength 日間のレコードを取得
  const startDate = new Date(todayJSTDate);
  const startJSTDate = new Date(toJSTDateStr(startDate) + "T00:00:00.000Z");
  startJSTDate.setDate(startJSTDate.getDate() - (arrayLength - 1));

  const records = await prisma.record.findMany({
    where: {
      taskId,
      date: {
        gte: startJSTDate,
        lte: todayJSTDate,
      },
    },
    orderBy: {
      date: "desc", // ← これを追加
    },
    select: { date: true },
  });

  // 取得した日付をSet に変換（効率的に日付の存在確認）
  const workedDates = new Set(
    records.map((record) => {
      const date = new Date(record.date);
      const dateJST = new Date(toJSTDateStr(date) + "T00:00:00.000Z");
      return dateJST.toISOString().split("T")[0]; // YYYY-MM-DD形式
    })
  );

  // 配列を構築
  const result: boolean[] = [];
  for (let i = arrayLength - 1; i >= 0; i--) {
    const date = new Date(today);
    const dateJST = new Date(toJSTDateStr(date) + "T00:00:00.000Z");

    dateJST.setDate(dateJST.getDate() - i);
    const dateStr = dateJST.toISOString().split("T")[0];
    result.push(workedDates.has(dateStr));
  }

  return result;
}
