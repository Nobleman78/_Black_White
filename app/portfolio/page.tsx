"use client"
import axios, { AxiosResponse } from "axios";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});
interface Portfolio {
    _id: string,
    id: number;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
}


const Page = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [portFolio, setPortfolio] = useState<Portfolio[]>([])
    useEffect(() => {
        const fetchPortFolio = async () => {
            try {
                const res: AxiosResponse<Portfolio[]> = await axios.get("http://localhost:5000/portfolio")
                setPortfolio(res.data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        };

        fetchPortFolio();
    }, []);

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'interior', label: 'Interior Design' },
        { id: 'building', label: 'Building Design' },
        { id: 'animation', label: '2D-3D Animation' },
        { id: 'landscaping', label: 'Landscaping' },
        { id: 'crafting', label: 'Crafting' },
        { id: 'gardening', label: 'Gardening' }
    ];

    const filteredPortfolio = activeFilter === 'all' ? portFolio : portFolio.filter(project => project.category === activeFilter);

    return (
        <div className={`${roboto.className} min-h-screen bg-white`}>
            {/* Hero Section */}
            <section className="relative py-25 flex items-center justify-center bg-black text-white">
                {/* <div className="absolute inset-0  z-10"></div> */}
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6">
                        PORTFOLIO
                    </h1>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-0 z-40 bg-white border-b border-gray-200 py-6 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`px-6 py-3 cursor-pointer  text-sm font-medium tracking-wider uppercase transition-all duration-300 ${activeFilter === category.id
                                    ? 'bg-[#c5d64d] text-white'
                                    : 'bg-white text-black border border-[#c5d64d] hover:bg-[#c5d64d] hover:text-white'
                                    }`} >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            {filteredPortfolio.length > 0 ? <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPortfolio.map((portfolio) => (
                            <div
                                key={portfolio._id}
                                className="group cursor-pointer">
                                <div className="relative overflow-hidden aspect-4/3 mb-4">
                                    <Image
                                        src={portfolio.image}
                                        alt={portfolio.title}
                                        width={100}
                                        height={100}
                                        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-lg font-medium">View Project</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-black group-hover:text-gray-600 transition-colors">
                                        {portfolio.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm uppercase tracking-wider">
                                        {portfolio.location} • {portfolio.year}
                                    </p>
                                    <span className="inline-block px-3 py-1 bg-black text-white text-xs uppercase tracking-wider">
                                        {categories.find(cat => cat.id === portfolio.category)?.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> : <p className="text-center mt-10 text-lg ">Portfolio Not Found ! Please Try Again. </p>
            }
        </div>
    );
};

export default Page;