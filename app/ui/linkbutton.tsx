"use client";
import Link from "next/link";
import Button from "@mui/material/Button";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export default function LinkButton({ href, label, isActive = false }: Props) {
  return (
    <Link href={href}
      className={`text-lg font-medium px-4 py-2 rounded transition-colors ${
        isActive
          ? "border-b-4 border-white"
          : "text-white hover:bg-gray-700"
      }`} >
      <Button 
        variant="contained"
        sx={{
          backgroundColor: isActive ? "#1e40af" : "#666666",
          "&:hover": {
            backgroundColor: isActive ? "#1e3a8a" : "#555555"
          }
        }}
      >
        {label}
      </Button>
    </Link>
  );
}

export function NavBarLinkButton({ href, label, isActive = false }: Props) {
  return (
    <Link href={href}
      className={`text-lg font-medium rounded transition-colors`} >
      <Button 
        variant="contained"
        sx={{
          backgroundColor: isActive ? "#0071e3" : "#ffffff",
          color: isActive ? "#ffffff" : "#0071e3",
          borderRadius: 10,
        }}
      >
        {label}
      </Button>
    </Link>
  );
}
