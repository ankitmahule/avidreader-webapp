import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import ProtectedContent from "./protected-content";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedContent>
      <section className="flex min-h-screen">
        <Header />

        <main className="min-w-0 flex-1">{children}</main>

        <RightSidebar />
      </section>
    </ProtectedContent>
  );
}
