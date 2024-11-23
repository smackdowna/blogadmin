"use client";
// import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import HamburgerMenu from "@/Components/Navbar/HamburgerMenu";
import UserDropdown from "../../../Components/Navbar/UserDropdown";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/Components/ProtectedRoute/ProtectedRoute";
const Navbar = dynamic(() => import("@/Components/Navbar/Navbar"), {
  ssr: false,
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
    <div className="flex flex-col xl:flex-row bg-gray-50">
      <Sidebar />
      <div className="flex items-center justify-between xl:hidden px-6 py-5">
        <HamburgerMenu />
        <UserDropdown />
      </div>

      <div className="flex flex-col gap-5 w-full flex-1">
        <Navbar />
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
