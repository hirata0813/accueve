// boolean 型配列を受け取って，今月，何日そのタスクをやったかを返す
export function calcMonthStats(past30DaysWork: boolean[]) {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  let thisMonthCount = 0;
  const thisMonthTotal = today.getDate();
  const monthlyBuckets: Record<string, number> = {};

  past30DaysWork.forEach((worked, index) => {
    const daysAgo = past30DaysWork.length - 1 - index;
    const d = new Date(today);
    d.setDate(today.getDate() - daysAgo);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (worked) {
      monthlyBuckets[key] = (monthlyBuckets[key] ?? 0) + 1;
      if (d.getFullYear() === year && d.getMonth() === month) thisMonthCount++;
    }
  });

  const bestMonthCount = Math.max(...Object.values(monthlyBuckets), 0);
  return { thisMonthCount, thisMonthTotal, bestMonthCount };
}
