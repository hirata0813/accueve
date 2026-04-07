import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <p className="text-xl">今までの取り組み(達成度編集・削除)</p>

    <div>
      <Link href={"/"}>タスク一覧へ</Link>
    </div>
    <div>
      <Link href={"/saying"}>格言へ</Link>
    </div>
    </main>
  );
}
