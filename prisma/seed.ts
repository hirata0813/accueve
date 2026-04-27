import { prisma } from "@/app/lib/prisma";

async function main() {
  // タスクとそれに紐づくレコードを作成
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        name: 'Task 1',
        state: 'DO',
        maxHoursPerDay: 2,
        record: {
          create: {
            date: new Date('2023-10-01'),
            done: false,
            hours: 1,
            detail: 'Record for Task 1',
          },
        },
      },
    }),
    prisma.task.create({
      data: {
        name: 'Task 2',
        state: 'DO',
        maxHoursPerDay: 4,
        record: {
          create: {
            date: new Date('2023-10-02'),
            done: true,
            hours: 2,
            detail: 'Record for Task 2',
          },
        },
      },
    }),
    prisma.task.create({
      data: {
        name: 'Task 3',
        state: 'DO',
        maxHoursPerDay: 10,
        record: {
          create: {
            date: new Date('2023-10-03'),
            done: false,
            hours: 5,
            detail: 'Record for Task 3',
          },
        },
      },
    }),
  ]);

  console.log('Seeded tasks and records:', tasks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
