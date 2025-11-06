'use client';

import { useAuth } from "@/components/context/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const { user, signOutUser } = useAuth()
    const router = useRouter()

    const navItems = [
        { href: "/dashboard/portfolio", label: "Managed Portfolio" },
        { href: "/dashboard/projects", label: "Managed Project" }
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-800 text-white p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2 mb-2 rounded transition-colors ${isActive
                                ? "bg-gray-600 font-semibold"
                                : "hover:bg-gray-700"
                                }`}>
                            {item.label}
                        </Link>
                    );
                })}
                <div className="mt-10 bg-white text-black flex flex-col gap-5 p-5">
                    <h2><span className="text-lg font-semibold">Logged Email</span>: {`${user?.email}`}</h2>
                    <button onClick={() => { signOutUser(); router.push('/login') }} className="bg-red-500 px-5 py-2 text-white" >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                {children}
            </main>
        </div>
    );
}