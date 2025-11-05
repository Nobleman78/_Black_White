"use client";
import { Roboto } from "next/font/google";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";
interface ClinetsInterface {
    name: string,
    logo: string
}
const robotoflex = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
const clients: ClinetsInterface[] = [
    { name: "Bashundhara Group", logo: "https://picsum.photos/seed/1/200/100" },
    { name: "Navana Real Estate", logo: "https://picsum.photos/seed/2/200/100" },
    { name: "BTI Holdings", logo: "https://picsum.photos/seed/3/200/100" },
    { name: "Rangs Properties", logo: "https://picsum.photos/seed/4/200/100" },
    { name: "ABC Construction Ltd", logo: "https://picsum.photos/seed/5/200/100" },
    { name: "Apex Holdings Ltd", logo: "https://picsum.photos/seed/6/200/100" },
    { name: "Concord Real Estate", logo: "https://picsum.photos/seed/7/200/100" },
    { name: "Mir Group", logo: "https://picsum.photos/seed/8/200/100" },
    { name: "Sheltech Ltd", logo: "https://picsum.photos/seed/9/200/100" },
    { name: "Anwar Landmark", logo: "https://picsum.photos/seed/10/200/100" },
];


const Clients = () => {
    const [clientsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(clients.length / clientsPerPage);
    const LastPageIndex = clientsPerPage * currentPage
    const FirstPageIndex = LastPageIndex - clientsPerPage
    const paginationSlides = clients.slice(FirstPageIndex, LastPageIndex)

    // pagination handler function
    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    // go to specefic pages
    const goToPages = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }
    // calculate pagenumber
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
        <section className={`py-20 bg-gray-50 text-center ${robotoflex.className}`}>
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-[48px] font-light mb-10">
                    Our Valued Clients
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center">
                    {paginationSlides.map((client, index) => (
                        <div key={index}
                            className="flex flex-col items-center justify-center space-y-3 hover:scale-105 transition-transform duration-300">
                            <Image src={client.logo} alt={client.name} width={100} height={100} className="w-[400px] h-[200px]" />
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        {/* Previous Button */}
                        <button onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-full transition-colors duration-200 ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-200'
                                }`} aria-label="Previous Page" >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Page Numbers */}
                        <nav className="flex space-x-1" aria-label="Pagination">
                            {pageNumbers.map((number) => (
                                <button key={number}
                                    onClick={() => goToPages(number)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${number === currentPage
                                        ? 'bg-[#c6d64d] text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-200'
                                        }`}>
                                    {number}
                                </button>
                            ))}
                        </nav>

                        {/* Next Button */}
                        <button onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-full transition-colors duration-200 ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-200'
                                }`} aria-label="Next Page">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Clients;
