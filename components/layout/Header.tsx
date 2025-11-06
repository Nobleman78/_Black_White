import { Roboto_Serif } from "next/font/google";

const roboto = Roboto_Serif({
    subsets: ['latin'],
    weight: ["400", "500", "700"]
})
const Header = () => {
    return (
        <div className={`bg-black text-center ${roboto.className}`}>
            <h2 className="text-[#C5D64D] py-3 text-lg font-semibold">Phone <span className="text-white">+8801883-505215</span>  </h2>
        </div>
    );
};

export default Header;