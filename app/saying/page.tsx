import Link from "next/link";
import NavBar from "@/app/ui/navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center">
      <NavBar />
      <h1 className="text-5xl font-bold pt-10 pl-8">格言</h1>

      <ul className="list-disc list-inside text-2xl mt-8 pl-10 space-y-4">
        <li className="font-bold">すべてのことは小さく始まる</li>
        <li className="font-bold">量は質を凌駕する</li>
        <li className="font-bold">ほんの少しの積み重ねを毎日続けることが，数年後大きな結果として顕在化する</li>
        <li className="font-bold">日々のほんの些細な選択が，良くも悪くも福利の効果を発動させてしまう</li>
        <li className="font-bold">一度サボるのはただのミス．二度サボるのは，新しい習慣の始まりを意味する</li>
      </ul>

    </main>
  );
}
