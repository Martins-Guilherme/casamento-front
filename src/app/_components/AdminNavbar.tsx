"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/utils";
import { Menu } from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const routes = [
    { label: "Presentes", href: "/admin/presentes" },
    { label: "Remover Seleção", href: "/admin/remover-selecao" },
    { label: "Convidados", href: "/admin/convidados" },
    { label: "Enviar Convites", href: "/admin/convites" },
  ];

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/admin" className="text-lg font-semibold">
            🎁 Painel Admin
          </Link>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === route.href
                    ? "bg-pink-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="sm:hidden mt-2 space-y-1 pb-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                  pathname === route.href
                    ? "bg-pink-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
