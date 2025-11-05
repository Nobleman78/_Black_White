import CTA from "@/components/LandingPage/CTA";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
interface Concerns {
    name: string,
    services: string[]
}
const page = () => {
    const concerns: Concerns[] = [
        {
            name: 'Architecture Model Makers BD',
            services: ['Architectural Scale Models', 'Urban Planning Models', 'Exhibition Models']
        },
        {
            name: 'Weeds',
            services: ['Landscape Design', 'Garden Maintenance', 'Sustainable Planting']
        },
        {
            name: 'Tahjeeb Designed Construction',
            services: ['Residential Construction', 'Commercial Projects', 'Interior Design']
        }
    ];

    return (
        <div className={`min-h-screen bg-linear-to-b from-gray-50 to-white ${roboto.className}`}>
            <div className='max-w-7xl mx-auto py-16 md:py-24 px-5'>
                {/* Header Section */}
                <div className='text-center mb-16'>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 text-gray-900">
                        OUR SISTER CONCERNS
                    </h1>
                </div>

                {/* Sister Concern Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-25'>
                    {concerns.map((concern, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:-translate-y-2 flex flex-col'>
                            {/* Company Name */}
                            <div className='mb-6 grow'>
                                <h2 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-2 leading-tight'>
                                    {concern.name}
                                </h2>
                            </div>

                            <div className='w-12 h-0.5 bg-[#65d64d] mb-6'></div>
                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                                    Services
                                </h3>
                                <ul className='space-y-2'>
                                    {concern.services.map((service, idx) => (
                                        <li key={idx} className='text-gray-700 flex items-center' >
                                            <span className='bg-[#c5d64d] mr-2 w-3 h-3 rounded-full border border-[#c5d64d]' ></span>
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}

                <CTA />
            </div>
        </div>
    );
};

export default page;