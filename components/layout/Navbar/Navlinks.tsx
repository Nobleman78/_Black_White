"use client";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

interface NavItem {
    title: string;
    slug?: string;
    icon?: React.ReactNode;
    dropdown?: boolean;
}

interface NavlinksProps {
    dropdown: boolean;
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const navlinks: NavItem[] = [
    { title: "Home", slug: "/" },
    { title: "About", slug: "/about" },
    { title: "Portfolio", slug: "/portfolio" },
    { title: "Services", dropdown: true, icon: <IoMdArrowDropdown /> },
    { title: "Contacts", slug: "/contact" },
    { title: "Sister Concern", slug: "/sister" },
    { title: "Project", slug: '/project' }
];

const dropdownList = [
    { name: "Consultancy", slug: "/services/consultancy" },
    { name: "Architecture", slug: "/services/architecture" },
    { name: "Interior", slug: "/services/interior" },
    { name: "Building Design", slug: "/services/building_design" },
    { name: "2D/3D Animation", slug: "/services/2d_3d_animation" },
    { name: "Landscaping", slug: "/services/landscaping" },
    { name: "Gardening", slug: "/services/gardening" },
    { name: "Craft", slug: "/services/craft" },
];

const Navlinks = ({ dropdown, setDropdown, setMenuOpen }: NavlinksProps) => {
    const pathname = usePathname();

    // Auto close dropdown when route changes
    useEffect(() => {
        setDropdown(false);
    }, [pathname, setDropdown]);

    return (
        <nav className={`flex items-center gap-8 ${roboto.className} relative`}>
            {/* Desktop Navlinks */}
            {navlinks.map((nav, index) => (
                <div key={index} className="relative hidden lg:block">
                    {nav.slug ? (
                        <Link
                            href={nav.slug}
                            className={`text-[15px] font-medium flex items-center gap-2 transition-colors duration-300 ${pathname === nav.slug
                                ? "text-[#c5d64d]"
                                : "text-black hover:text-[#c5d64d]"
                                }`}>
                            <span>{nav.title.toUpperCase()}</span>
                            {nav.icon && <span>{nav.icon}</span>}
                        </Link>
                    ) : (
                        <div
                            onMouseEnter={() => setDropdown(true)}
                            onMouseLeave={() => setDropdown(false)}
                            className="relative" >
                            <button type="button" className={`text-[15px] font-medium flex items-center gap-1 transition-colors duration-300 ${dropdown ? "text-[#c5d64d]" : "text-black hover:text-[#c5d64d]"
                                }`}>
                                <span>{nav.title.toUpperCase()}</span>
                                {nav.icon && (
                                    <span className={`transition-transform duration-300 ${dropdown ? "rotate-180" : ""
                                        }`}>
                                        {nav.icon}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute z-20 top-full left-0 mt-4 w-64 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-out ${dropdown
                                ? "opacity-100 translate-y-0 visible"
                                : "opacity-0 -translate-y-2 invisible"
                                }`}>
                                <div className="absolute -top-2 left-8 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                                <div className="relative bg-white py-3">
                                    {dropdownList.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.slug}
                                            className={`block px-6 py-3 text-[14px] font-medium transition-all duration-200 ${pathname === item.slug
                                                ? "text-[#c5d64d] bg-[#c5d64d]/10 border-l-4 border-[#c5d64d]"
                                                : "text-gray-700 hover:text-[#c5d64d] hover:bg-[#c5d64d]/5 hover:translate-x-1 border-l-4 border-transparent"
                                                }`}>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Mobile Navlinks */}
            <div className="block lg:hidden w-full">
                {navlinks.map((nav, index) => (
                    <div key={index} className="border-b border-gray-100 ">
                        {nav.slug ? (
                            <Link
                                onClick={() => setMenuOpen?.(false)}
                                href={nav.slug}
                                className={`px-6 py-4 text-[15px] font-medium flex items-center justify-between transition-colors duration-300 ${pathname === nav.slug
                                    ? "text-[#c5d64d]"
                                    : "text-black hover:text-[#c5d64d]"
                                    }`}>
                                <span>{nav.title.toUpperCase()}</span>
                            </Link>
                        ) : (
                            <div className="flex flex-col">
                                <button
                                    type="button"
                                    onClick={() => setDropdown((prev) => !prev)}

                                    className={`w-full text-left px-6 py-4 text-[15px] font-medium flex items-center justify-between transition-colors duration-300 ${dropdown
                                        ? "text-[#c5d64d]"
                                        : "text-black hover:text-[#c5d64d]"
                                        }`}>
                                    <span>{nav.title.toUpperCase()}</span>
                                    {nav.icon && (
                                        <span
                                            className={`transition-transform duration-300 ${dropdown ? "rotate-180" : ""
                                                }`}>
                                            {nav.icon}
                                        </span>
                                    )}
                                </button>

                                {/* Dropdown items */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${dropdown
                                        ? "max-h-[500px] opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}>
                                    {dropdownList.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.slug}
                                            onClick={() => { setDropdown(false); setMenuOpen?.(false) }}
                                            className={`block px-10 py-3 text-[14px] font-medium transition-all duration-200 ${pathname === item.slug
                                                ? "text-[#c5d64d] bg-[#c5d64d]/10 border-l-4 border-[#c5d64d]"
                                                : "text-gray-700 hover:text-[#c5d64d] hover:bg-[#c5d64d]/5 border-l-4 border-transparent"
                                                }`}>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navlinks;
