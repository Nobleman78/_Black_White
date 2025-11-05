
import ShowProjects from "@/components/Dashboard/ShowProjects";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
const page = () => {
    return (
        <div className={`${roboto.className}`}>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Projects</h2>
                <Link
                    href="/dashboard/projects/add"
                    passHref
                    className="bg-[#c6d54d] px-4 py-2 text-white cursor-pointer rounded-md font-medium hover:bg-[#8a9726] transition-colors"
                >
                    Add New Project
                </Link>
            </div>
            <hr className="border-gray-300 mb-6" />
            <ShowProjects />
        </div>
    );
};

export default page;