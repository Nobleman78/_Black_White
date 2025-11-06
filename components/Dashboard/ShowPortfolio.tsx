"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface Portfolio {
    _id: string,
    id: number,
    title: string,
    category: string,
    location: string,
    year: number,
    image: string
}
const ShowPortfolio = () => {
    const [portFolio, setPortFolio] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    // Get Portfolio from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/portfolio')
                setPortFolio(response.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }
        fetchData()
    }, [])
    if (loading) {
        return <div className="text-center py-10 text-xl font-semibold text-[#c5d64d]">Loading portfolio...</div>;
    }

    // Delete Portfolio

    const handleDelete = (_id: string) => {
        try {
            axios.delete(`http://localhost:5000/portfolio/${_id}`)
            setPortFolio((prevPortfolio) => prevPortfolio.filter((portfolio) => portfolio._id !== _id));
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
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                Year
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {portFolio.map((portfolio) => (
                            <tr key={portfolio._id || portfolio.id} className="hover:bg-indigo-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {portfolio.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {portfolio.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {portfolio.category}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {portfolio.year}
                                </td>

                                <td className="flex gap-3 items-center p-2 ">
                                    <button onClick={() => handleDelete(portfolio._id)} className="bg-red-500 px-5 py-2 cursor-pointer text-white">Delete</button>
                                    {/* <Link href={`/dashboard/projects/edit/${portfolio._id}`} className="bg-green-500 px-5 py-2 cursor-pointer text-white">Update</Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowPortfolio;