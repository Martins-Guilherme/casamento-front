import type { Metadata } from "next";

import "@/app/globals.css";
import ConvidadoNavBar from "../_components/ConvidadoNavBar";

export const metadata: Metadata = {
  title: "Convidado",
  description: "Gerenciador de lista para casamentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased min-h-screen bg-[#FFEDE6]">
      <ConvidadoNavBar />
      <main className="mx-auto max-w-4xl p-6">{children}</main>
    </div>
  );
}
