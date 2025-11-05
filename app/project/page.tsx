"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoLocation } from 'react-icons/io5';
import { PiMapPinAreaBold } from 'react-icons/pi';

interface Project {
    _id: string,
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    area: string;
    status: 'ongoing' | 'handover';
    image: string;
    completionDate?: string;
}

const Page = () => {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'handover'>('ongoing');
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/projects')
                setProjects(res.data)
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        }
        fetchProjects()
    }, [])

    const filteredProjects = projects.filter(project => project.status === activeTab);

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-6 py-16 md:py-24'>
                {/* Tab Navigation */}
                <div className='flex justify-center mb-24'>
                    <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-md p-1'>
                        <button onClick={() => setActiveTab('ongoing')} className={`px-8 py-4 cursor-pointer rounded-md font-semibold transition-all duration-300 ${activeTab === 'ongoing'
                            ? 'bg-[#c5d64d] text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}>
                            Ongoing Projects
                        </button>
                        <button onClick={() => setActiveTab('handover')} className={`px-8 py-3 cursor-pointer rounded-md font-semibold transition-all duration-300 ${activeTab === 'handover'
                            ? 'bg-[#c5d64d] text-white shadow-lg '
                            : 'text-gray-600 hover:text-gray-900'
                            }`} >
                            Completed Projects
                        </button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProjects.map((project) => (
                        <div key={project._id} className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2' >
                            <div className='relative h-64 overflow-hidden bg-gray-200'>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={300}
                                    height={300}
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                                />
                                <div className='absolute top-4 right-4'>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'ongoing'
                                        ? 'bg-[#c5d64d] text-white'
                                        : 'bg-green-500 text-white'
                                        }`}>
                                        {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
                                    </span>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className='p-6'>
                                <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
                                    {project.title}
                                </h3>
                                <p className='text-gray-600 mb-4 text-sm leading-relaxed'>
                                    {project.description}
                                </p>

                                <div className='space-y-2 mb-4'>
                                    <div className='flex items-center text-sm text-gray-700'>
                                        <IoLocation className='text-[#c5d64d] mr-2' />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className='flex items-center text-sm text-gray-700'>
                                        <PiMapPinAreaBold className='text-[#c5d64d] mr-2' />
                                        <span>{project.area}</span>
                                    </div>
                                    {project.completionDate && (
                                        <div className='flex items-center text-sm text-gray-700'>
                                            <span className='text-[#c5d64d] mr-2'>✓</span>
                                            <span>Completed: {project.completionDate}</span>
                                        </div>
                                    )}
                                </div>
                                <Link href={`/project/${project.slug}`} className='px-5 flex items-center justify-center bg-[#c5d64d] text-white cursor-pointer font-semibold py-2 rounded-lg transition-colors duration-300'>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className='text-center py-16'>
                        <p className='text-gray-500 text-lg'>No projects found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;