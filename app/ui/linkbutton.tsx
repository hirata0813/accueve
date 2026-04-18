"use client";
import Link from "next/link";
import Button from "@mui/material/Button";

type NavBarLinkButtonProps = {
  href: string;
  label: string;
  isActive?: boolean;
};


export function NavBarLinkButton({ href, label, isActive = false }: NavBarLinkButtonProps) {
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
