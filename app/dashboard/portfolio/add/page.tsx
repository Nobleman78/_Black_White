'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})

interface PortfolioFormData {
    title: string,
    category: string,
    location: string,
    year: number | null,
    image: string
}

const initialFormData: PortfolioFormData = {
    title: '',
    category: '',
    location: '',
    year: new Date().getFullYear(),
    image: ''
}

export default function AddPortfolioForm() {
    const [formData, setFormData] = useState<PortfolioFormData>(initialFormData)
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter()

    const categories = ["architecture", "interior", "craft", "gardening", "building", "landscaping", "animation"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }));

        if (name === 'image') {
            setImageUrl(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalData = {
            ...formData
        }
        try {
            const response = await axios.post('http://localhost:5000/portfolio', finalData, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log("Project created successfully:", response.data);
            alert("Project added successfully!");

        } catch (error) {
            console.log(error)
        }
        setFormData(initialFormData);
        router.push("/dashboard/portfolio")

    };


    return (
        <div className={`p-8 bg-white rounded-xl shadow-lg ${roboto.className}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Portfolio Item</h2>
            <form id="portfolio-form" onSubmit={handleSubmit} className="flex flex-col space-y-4">

                <div className="flex gap-4 flex-wrap">
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            id="title"
                            name="title"
                            placeholder="Enter title (e.g., Modern Residential Villa)"
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            id="category"
                            name="category"
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white">
                            <option value="" disabled>Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            id="location"
                            name="location"
                            placeholder="Enter Location (e.g., Beverly Hills, CA)"
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                            type="number"
                            value={formData.year || ''}
                            onChange={handleChange}
                            id="year"
                            name="year"
                            placeholder="Enter Year (e.g., 2024)"
                            required
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="url"
                        value={formData.image}
                        id="image"
                        name="image"
                        placeholder="Enter image URL (e.g., https://picsum.photos/...)"
                        required
                        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Image preview"
                            width={400}
                            height={250}
                            className="mt-4 rounded-md object-cover self-center"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-6 px-4 py-2 bg-[#b4c532] text-white font-semibold rounded-md hover:bg-[#a3b13a] cursor-pointer transition duration-150 ease-in-out shadow-md">
                    Add Portfolio Item
                </button>
            </form>
        </div>
    );
}