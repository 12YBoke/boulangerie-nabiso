"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const AsideActiveLink = ({ href, children, className }: Props) => {
  const pathname = usePathname();
  const isActive: boolean = useMemo(() => {
    return pathname === href;
  }, [pathname, href]);

  return (
    <Link
      className={clsx(
        "hover:text-primary-800 animate block p-2 rounded-lg",
        isActive ? "text-primary-800 bg-primary-100" : "",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
