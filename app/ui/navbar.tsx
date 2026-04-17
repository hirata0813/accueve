"use client";
import { usePathname } from "next/navigation";
import ButtonUsage from "./linkbutton";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="w-full bg-gray-800 text-white py-4">
      <ul className="flex justify-start space-x-8 pl-7">
        <li>
          <p className="text-3xl">Accueve</p>
        </li>
        <li>
          <ButtonUsage 
            href="/" 
            label="タスク一覧"
            isActive={isActive("/")}
          />
        </li>
        <li>
          <ButtonUsage 
            href="/achievement" 
            label="達成度画面"
            isActive={isActive("/achievement")}
          />
        </li>
        <li>
          <ButtonUsage 
            href="/saying" 
            label="格言"
            isActive={isActive("/saying")}
          />
        </li>
        <li>
          <ButtonUsage 
            href="/create-task" 
            label="タスク登録"
            isActive={isActive("/create-task")}
          />
        </li>
      </ul>
    </nav>
  );
}
