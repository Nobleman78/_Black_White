"use client";
import Image from "next/image";
import Navlinks from "./Navlinks";
import logo from '../../../public/Logo/Logo_of_architecture_model_maker.jpg';
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/context/AuthProvider"; // Correct import

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdown, setDropDown] = useState(false);

    // 1. FIX: Use the custom hook to access context properties
    const { user, signOutUser, loading } = useAuth();

    // Handler for logging out the user
    const handleLogout = async () => {
        try {
            await signOutUser();
            // Optional: Redirect to home or login page after logout
            // router.push('/'); 
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle error (e.g., show a toast notification)
        }
    };

    return (
        <div className="flex items-center max-w-7xl mx-auto justify-between relative p-4">
            {/* Logo */}
            <div className="lg:w-1/3">
                <Link href="/" className="inline-block">
                    <Image
                        src={logo}
                        width={100}
                        height={100}
                        alt="architecture-model-makers-logo"
                        className="lg:h-20 h-15 w-15 lg:w-20 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Desktop NavLinks */}
            <nav className="lg:w-2/3 hidden lg:flex items-center justify-end space-x-4">
                <Navlinks dropdown={dropdown} setDropdown={setDropDown} />

                {/* 2. LOGOUT BUTTON FOR DESKTOP */}
                {user ? (
                    <button
                        onClick={handleLogout}
                        disabled={loading} 
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
                        {loading ? 'Logging Out...' : 'Logout'}
                    </button>
                ) : (
                    <Link href="/login" className="ml-4 px-4 py-2 bg-[#c6d54d] text-white rounded-lg hover:bg-[#9caa2e] transition-colors">
                        Sign In
                    </Link>
                )}
            </nav>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden">
                <IoMenu
                    onClick={() => setMenuOpen(true)}
                    size={35}
                    className="cursor-pointer text-black"
                />
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div className={`fixed lg:hidden top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">B&W Architecture</h2>
                    <IoClose
                        size={26}
                        className="cursor-pointer text-gray-600"
                        onClick={() => setMenuOpen(false)}
                    />
                </div>
                <div className="p-4 space-y-4">
                    <Navlinks dropdown={dropdown} setDropdown={setDropDown} setMenuOpen={setMenuOpen} />
                    {user && (
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
                            {loading ? 'Logging Out...' : 'Logout'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;