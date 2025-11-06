"use client"
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoLocation } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { PiMapPinAreaBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import axios from "axios";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    area: string;
    status: 'ongoing' | 'handover';
    image: string;
    completionDate?: string;
    detailedDescription?: string;
    features?: string[];
    gallery?: string[];
}


const Page = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                // Fetch single project by slug
                const res = await axios.get(`https://architecture-backend-liard.vercel.app/projects/slug/${slug}`);
                setProject(res.data);
                setError(false);
            } catch (error) {
                console.error("Error fetching project:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProject();
        }
    }, [slug]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c5d64d] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading project...</p>
                </div>
            </div>
        );
    }

    // Error or not found
    if (error || !project) {
        notFound();
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero Section */}
            <div className='relative h-96 md:h-[500px] w-full'>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className='object-cover'
                    priority
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent'></div>
                <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 p-8 md:p-12 text-white'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='flex items-center gap-3 mb-4'>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${project.status === 'ongoing'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                                }`}>
                                {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
                            </span>
                            {project.completionDate && (
                                <span className='text-sm'>Completed: {project.completionDate}</span>
                            )}
                        </div>
                        <h1 className='text-4xl md:text-6xl font-bold mb-4'>{project.title}</h1>
                        <p className='text-xl md:text-2xl font-light max-w-3xl'>{project.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='max-w-7xl mx-auto px-6 py-16'>
                {/* Back Button */}
                <Link
                    href='/projects'
                    className='flex items-center gap-3 text-[#c5d64d] hover:text-[#c5d64d] mb-8 font-semibold'>
                    <IoMdArrowBack /> Back to Projects
                </Link>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                    {/* Main Content */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* Project Details */}
                        <div className='bg-white rounded-lg shadow-lg p-8'>
                            <h2 className='text-3xl font-bold mb-6 text-gray-900'>Project Overview</h2>
                            <p className='text-gray-700 leading-relaxed text-lg mb-6'>
                                {project.detailedDescription}
                            </p>

                            {project.features && (
                                <div>
                                    <h3 className='text-2xl font-semibold mb-4 text-gray-900'>Key Features</h3>
                                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                        {project.features.map((feature, idx) => (
                                            <li key={idx} className='flex items-center text-gray-700'>
                                                <span className='bg-[#c5d64d] border border-[#c5d64d] w-3 h-3 rounded-full mr-3 text-xl'></span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Gallery */}
                        {project.gallery && (
                            <div className='bg-white rounded-lg shadow-lg p-8'>
                                <h2 className='text-3xl font-bold mb-6 text-gray-900'>Project Gallery</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {project.gallery.map((img, idx) => (
                                        <div key={idx} className='relative h-64 rounded-lg overflow-hidden cursor-pointer'>
                                            <Image
                                                onClick={() => { setSelectedImage(img); setIsModalOpen(true) }}
                                                src={img}
                                                alt={`${project.title} - Image ${idx + 1}`}
                                                fill
                                                className='object-cover hover:scale-110 transition-transform duration-500'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Modal */}
                    {selectedImage && isModalOpen && (
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => { setSelectedImage(null); setIsModalOpen(false) }}>
                            <div className="absolute inset-0" />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                    setIsModalOpen(false);
                                }}
                                className="absolute top-6 right-6 cursor-pointer text-white text-3xl z-20 hover:text-[#c5d64d] transition-colors"
                            >
                                <FaX />
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                width={800}
                                height={600}
                                className="relative z-10 max-h-[90vh] rounded-lg object-contain w-full"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Project Info Card */}
                        <div className='bg-white rounded-lg shadow-lg p-6 sticky top-6'>
                            <h3 className='text-2xl font-bold mb-6 text-gray-900'>Project Information</h3>
                            <div className='space-y-4'>
                                <div>
                                    <p className='text-sm text-gray-500 uppercase tracking-wide mb-1'>Location</p>
                                    <p className='text-gray-900 flex gap-3 font-semibold items-center'>
                                        <IoLocation className="text-[#c5d64d]" />
                                        {project.location}
                                    </p>
                                </div>
                                <div className='border-t pt-4'>
                                    <p className='text-sm text-gray-500 uppercase tracking-wide mb-1'>Total Area</p>
                                    <p className='text-gray-900 font-semibold flex items-center gap-3'>
                                        <PiMapPinAreaBold className="text-[#c5d64d]" size={20} />
                                        {project.area}
                                    </p>
                                </div>
                                <div className='border-t pt-4'>
                                    <p className='text-sm text-gray-500 uppercase tracking-wide mb-1'>Status</p>
                                    <p className='text-gray-900 font-semibold'>
                                        {project.status === 'ongoing' ? 'Under Construction' : 'Completed'}
                                    </p>
                                </div>
                                {project.completionDate && (
                                    <div className='border-t pt-4'>
                                        <p className='text-sm text-gray-500 uppercase tracking-wide mb-1'>Completion Date</p>
                                        <p className='text-gray-900 font-semibold'>{project.completionDate}</p>
                                    </div>
                                )}
                            </div>

                            <button className='w-full cursor-pointer bg-[#c5d64d] hover:bg-[#97a52d] text-white font-semibold py-3 rounded-lg mt-6 transition-colors duration-300'>
                                Inquire Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;