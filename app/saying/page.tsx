import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-xl">やる気を出させてくれる格言</p>

      <h1 className="text-4xl font-bold">・すべてのことは小さく始まる</h1>
      <h1 className="text-4xl font-bold">・量は質を凌駕する</h1>
      <h1 className="text-4xl font-bold">・ほんの少しの積み重ねを毎日続けることが，数年後大きな結果として顕在化する</h1>
      <h1 className="text-4xl font-bold">・日々のほんの些細な選択が，良くも悪くも福利の効果を発動させてしまう</h1>

    <div>
      <Link href={"/"}>タスク一覧へ</Link>
    </div>
    <div>
      <Link href={"/achievement"}>達成度画面へ</Link>
    </div>
    </main>
  );
}
