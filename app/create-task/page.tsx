"use server";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Button from "@mui/material/Button";
import TaskForm from "../ui/taskform";

const prisma = new PrismaClient();

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-xl">タスク登録画面</p>
    
    {/* タスク登録用UI */}
    <TaskForm />

    <div>
      <Link href={"/"}>タスク一覧へ</Link>
    </div>
    </main>
  );
}
