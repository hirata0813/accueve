"use server";
import Link from "next/link";
import Button from "@mui/material/Button";
import TaskForm from "@/app/ui/taskform";
import NavBar from "@/app/ui/navbar";

export default async function Home() {
  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />
      <h1 className="text-5xl font-bold pt-10 pl-8">タスク登録</h1>
    
      <div className="mt-8 pl-10 space-y-4">
      <TaskForm />
      </div>
    </main>
  );
}
