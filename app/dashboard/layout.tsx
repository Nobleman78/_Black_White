'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

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
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                {children}
            </main>
        </div>
    );
}