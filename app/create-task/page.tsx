"use server";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Button from "@mui/material/Button";
import TaskForm from "../ui/taskform";
import NavBar from "../ui/navbar";

const prisma = new PrismaClient();

export default async function Home() {
  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />
      <p className="text-xl">タスク登録画面</p>
    
    {/* タスク登録用UI */}
    <TaskForm />
    </main>
  );
}
