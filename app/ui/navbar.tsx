"use client";
import { usePathname } from "next/navigation";
import {NavBarLinkButton} from "@/app/ui/linkbutton";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white py-4">
      <ul className="flex justify-start space-x-8 pl-7">
        <li>
          <p className="text-3xl">Accueve</p>
        </li>
        <li>
          <NavBarLinkButton 
            href="/" 
            label="タスク一覧"
            isActive={isActive("/")}
          />
        </li>
        <li>
          <NavBarLinkButton 
            href="/achievement" 
            label="達成度画面"
            isActive={isActive("/achievement")}
          />
        </li>
        <li>
          <NavBarLinkButton 
            href="/saying" 
            label="格言"
            isActive={isActive("/saying")}
          />
        </li>
        <li>
          <NavBarLinkButton 
            href="/create-task" 
            label="タスク登録"
            isActive={isActive("/create-task")}
          />
        </li>
      </ul>
    </nav>
  );
}
