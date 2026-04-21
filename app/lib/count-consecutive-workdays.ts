import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * あるタスクについて連続して，当日から遡って連続で取り組んだ日数をカウントする関数
 * @param taskId - タスクのID
 * @returns 連続して取り組んだ日数
 */
export async function countConsecutiveWorkdays(taskId: number): Promise<number> {
  // タスクに紐づくレコードを取得（降順でソート）
  const records = await prisma.record.findMany({
    where: { taskId},
    select: { date: true },
    orderBy: { date: "desc" },
  });

  if (records.length === 0) {
    return 0; // レコードがない場合は0日
  }

  let consecutiveDays = 0;
  const today = new Date(); // 今日の日付

  // today から遡って，何日連続で取り組んだかをカウント
  let lastWorkedDate = today;

  for (const record of records) {
    const recordDate = new Date(record.date);

    if (recordDate > today) {
      continue; // 今日より未来の日付はスキップ
    }

    // recordDate が，今日 or 最後に取り組んだ日から1日以内であることを確認
    const diffTime = lastWorkedDate.getTime() - recordDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 1日以内であれば連続しているため，連続日数をカウントアップし，最後に取り組んだ日を更新
    if (diffDays <= 1) {
        consecutiveDays++;
        lastWorkedDate = recordDate; // 最後に取り組んだ日を更新
    } else {
        break; // 連続が途切れたらループを抜ける
    }
  }

  return consecutiveDays;
}
