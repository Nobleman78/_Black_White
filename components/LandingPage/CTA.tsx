import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["400", "500", "700"]
})
const CTA = () => {
    return (
        <div className="bg-[#C5D64D] p-15 flex items-center justify-between">
            <p className={`text-4xl ${roboto.className}`}>CONTACT US NOW TO TURN YOUR DREAM INTO REALITY</p>
            <a  href="tel:+017898980" className="bg-black px-4 py-4 text-white animate-bounce">01769799769797</a>
        </div>
    );
};

export default CTA;