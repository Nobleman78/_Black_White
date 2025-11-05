import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
const Footer = () => {
    return (
        <footer className={`bg-black text-white pt-16 ${roboto.className}`}>
            <div className="max-w-7xl mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Studio Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5 tracking-wider uppercase">
                            B&W Architecture
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We create timeless architectural designs that blend functionality with aesthetic excellence, transforming spaces into inspiring environments.
                        </p>
                        <div className="flex gap-4 mt-5">
                            <a
                                href="https://www.facebook.com/profile.php?id=100063624425651"
                                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Facebook"
                            >
                                f
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Instagram"
                            >
                                ig
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Pinterest"
                            >
                                p
                            </a>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5 tracking-wider uppercase">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/consultancy" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Consultancy
                                </a>
                            </li>
                            <li>
                                <a href="/interior" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Interior
                                </a>
                            </li>
                            <li>
                                <a href="/building_design" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Builiding Design
                                </a>
                            </li>
                            <li>
                                <a href="/2d_3d_animation" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    2D/3D Animation
                                </a>
                            </li>
                            <li>
                                <a href="/landscaping" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Landscaping
                                </a>
                            </li>
                            <li>
                                <a href="/gardening" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Gardening
                                </a>
                            </li>
                            <li>
                                <a href="/craft" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Craft
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5 tracking-wider uppercase">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/portfolio" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="/process" className="text-gray-400 hover:text-white transition-colors duration-300">
                                    Our Process
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5 tracking-wider uppercase">
                            Contact
                        </h3>
                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>
                                <strong className="text-white">Address:</strong><br />
                                123 Architecture Lane<br />
                                Design District, NY 10001
                            </p>

                            <p>
                                <strong className="text-white">Phone:</strong><br />
                                +1 (555) 123-4567
                            </p>

                            <p>
                                <strong className="text-white">Email:</strong><br />
                                info@architectstudio.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-gray-800 py-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2025 B&W Architecture . All rights reserved. | {' '}
                        <a href="/policy" className="text-white hover:underline">
                            Privacy Policy
                        </a>
                        {' '} | {' '}
                        <a href="/terms" className="text-white hover:underline">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;