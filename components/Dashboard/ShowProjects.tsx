"use client"

import axios from "axios";
import { useEffect, useState } from "react";


interface Project {
    _id: string;
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    area: string;
    status: 'handover' | 'in-progress' | string;
    image: string;
    completionDate: string;
    detailedDescription: string;
    features: string[];
    gallery: string[];
}

const ShowProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get Projects from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://architecture-backend-liard.vercel.app/projects');
                setProjects(response.data as Project[]);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-xl font-semibold text-[#c5d64d]">Loading projects...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-xl font-semibold text-red-600">Error: {error}</div>;
    }

    if (projects.length === 0) {
        return <div className="text-center py-10 text-xl font-semibold text-gray-500">No projects found.</div>;
    }

    // Delete Projects

    const handleDelete = (_id: string) => {
        try {
            axios.delete(`https://architecture-backend-liard.vercel.app/projects/${_id}`)
            setProjects((prevProjects) => prevProjects.filter((project) => project._id !== _id));
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=" bg-gray-50 min-h-screen">
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Area
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Completion
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Features
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project) => (
                            <tr key={project._id || project.id} className="hover:bg-indigo-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {project.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.area}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'handover'
                                        ? 'bg-green-100 text-green-800'
                                        : project.status === 'in-progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {project.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.completionDate}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                                    {Array.isArray(project.features) && project.features.length > 0 ? project.features.slice(0, 2).join(',') + (project.features.length > 2 ? '...' : '') : 'N/A'}
                                </td>
                                <td className="flex gap-3 items-center p-2 ">
                                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 px-5 py-2 cursor-pointer text-white">Delete</button>
                                    {/* <Link href={`/dashboard/projects/edit/${project._id}`} className="bg-green-500 px-5 py-2 cursor-pointer text-white">Update</Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowProjects;