"use client";
import Link from "next/link";
import Button from "@mui/material/Button";

type Props = {
  href: string;
  label: string;
};

export default function LinkButton({ href, label }: Props) {
  return (
      <Link href={href}>
        <Button variant="contained">
          {label}
        </Button>
      </Link>
    );
}
