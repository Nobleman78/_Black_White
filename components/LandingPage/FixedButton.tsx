"use client";

import { FaPhoneAlt } from "react-icons/fa";

const FixedButton = () => {
    return (
        <a href="tel:+8801883-505215"
            className="fixed bottom-5 right-5 bg-[#c5d64d] text-white p-4 rounded-full shadow-lg hover:bg-[#a3b32e] transition-all flex items-center justify-center z-50"
            aria-label="Call Now">
            <FaPhoneAlt size={20} />
        </a>
    );
};

export default FixedButton;
