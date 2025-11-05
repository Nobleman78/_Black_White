"use client";
import Image from "next/image";
import Navlinks from "./Navlinks";
import logo from '../../../public/Logo/Logo_of_architecture_model_maker.jpg';
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdown, setDropDown] = useState(false)
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
            <nav className="lg:w-2/3 hidden lg:block">
                <Navlinks dropdown={dropdown} setDropdown={setDropDown} />
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
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setMenuOpen(false)}>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed lg:hidden  top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">B&W Architecture</h2>
                    <IoClose
                        size={26}
                        className="cursor-pointer text-gray-600"
                        onClick={() => setMenuOpen(false)}
                    />
                </div>
                <div className="p-4">
                    <Navlinks dropdown={dropdown} setDropdown={setDropDown} setMenuOpen={setMenuOpen} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
