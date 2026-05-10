import { prisma } from "@/app/lib/prisma";

export async function calcTotalHours(taskId: number): Promise<number> {
  const records = await prisma.record.findMany({
    where: { taskId },
    select: { hours: true },
  });

  const totalHours = records.reduce((sum, record) => {
    return sum + (record.hours || 0);
  }, 0);

  return totalHours;
}
