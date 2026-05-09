import { prisma } from "@/app/lib/prisma";
import { toJSTDateStr } from "@/app/lib/to-jst-date-str";

/**
 * あるタスクについて，当日から遡って連続で取り組んだ日数をカウントする関数
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
  //console.log(`タスクID ${taskId} のレコード:`, records);

  let consecutiveDays = 0;
  const today = new Date(); // 今日の日付
  //console.log(`今日の日付:`, today);
  //const today = toJSTDateStr(new Date());
  //const todayJSTDate = new Date(toJSTDateStr(today) + "T00:00:00.000Z");
  //const todayJSTDateEnd = new Date(toJSTDateStr(today) + "T23:59:59.000Z");;

  // today から遡って，何日連続で取り組んだかをカウント
  let lastWorkedDate = today;

  for (const record of records) {
    //console.log(`タスクID ${taskId} のレコード日付（元の形式）:`, record);
    const recordDate = record.date;
    //console.log(`タスクID ${taskId} のレコード日付:`, recordDate);

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
  //console.log(`タスクID ${taskId} の連続取り組み日数:`, consecutiveDays, "日");

  return consecutiveDays;
}
