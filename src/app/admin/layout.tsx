import AdminNavbar from "@/app/_components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFEDE6]">
      <AdminNavbar />
      <main className="mx-auto max-w-4xl p-6">{children}</main>
    </div>
  );
}
