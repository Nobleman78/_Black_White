'use client';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/navigation';


const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})

interface FormData {
    title: string;
    slug: string;
    description: string;
    location: string;
    area: string;
    status: string;
    image: string;
    detailedDescription: string;
    features: string[]; // This will now be managed by featureInputs
    gallery: string[];
}
const initialFormData: Omit<FormData, 'features' | 'gallery'> = {
    title: '',
    slug: '',
    description: '',
    location: '',
    area: '',
    status: 'ongoing',
    image: '',
    detailedDescription: '',
};

export default function AddProject() {
    const [formData, setFormdata] = useState<Omit<FormData, 'features' | 'gallery'>>(initialFormData);
    const [featureInputs, setFeatureInputs] = useState<string[]>(['']);
    const [galleryInputs, setGalleryInputs] = useState<string[]>(['']);
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // --- Feature Handlers ---
    const handleAddFeatureInput = () => {
        setFeatureInputs((prevInputs) => [...prevInputs, '']);
    };

    const handleRemoveFeatureInput = (index: number) => {
        if (featureInputs.length > 1) {
            setFeatureInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
        }
    };

    const handleFeatureInputChange = (index: number, value: string) => {
        console.log(index)
        setFeatureInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = value;
            return newInputs;
        });
    };


    // --- Gallery Handlers ---
    const handleAddGalleryInput = () => {
        setGalleryInputs((prevInputs) => [...prevInputs, '']);
    };

    const handleRemoveGalleryInput = (index: number) => {
        if (galleryInputs.length > 1) {
            setGalleryInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
        }
    };

    const handleGalleryInputChange = (index: number, value: string) => {
        setGalleryInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = value;
            return newInputs;
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            features: featureInputs.filter((feature) => feature.trim() !== ''),
            gallery: galleryInputs.filter((url) => url.trim() !== ''),
        };

        try {
            const response = await axios.post("http://localhost:5000/projects", finalData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Project created successfully:", response.data);
            alert("Project added successfully!");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(`Failed to add project: ${error.response?.data?.message || error.message}`);
            } else if (error instanceof Error) {
                alert(`Failed to add project: ${error.message}`);
            } else {
                alert("Failed to add project: unknown error");
            }
        }
        setFormdata(initialFormData);
        setFeatureInputs(['']);
        setGalleryInputs(['']);
        router.push('/dashboard/projects')
    };


    return (
        <>
            <h2 className={`text-4xl mb-5 ${roboto.className}`}>Add a Project</h2>
            <div className={`p-6 bg-white rounded-xl shadow-lg ${roboto.className}`}>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

                    {/* --- Title and Slug --- */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-col flex-1 min-w-[200px]">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Modern Residential Complex"
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-[200px]">
                            <label htmlFor="slug" className="text-sm font-medium text-gray-700 mb-1">
                                Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="modern-residential-complex"
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="A state-of-the-art residential building..."
                            required
                            rows={2}
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                name="location"
                                placeholder="Gulshan, Dhaka"
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label htmlFor="area" className="text-sm font-medium text-gray-700 mb-1">
                                Area
                            </label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                value={formData.area}
                                onChange={handleInputChange}
                                placeholder="12,000 sq ft"
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-[150px]">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            placeholder="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={handleInputChange}
                        />
                        {formData.image && (
                            <Image
                                src={formData.image}
                                alt="Main image preview"
                                width={400}
                                height={250}
                                className="mt-2 rounded-md object-cover"
                            />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="detailedDescription" className="text-sm font-medium text-gray-700 mb-1">
                            Detailed Description
                        </label>
                        <textarea
                            id="detailedDescription"
                            name="detailedDescription"
                            value={formData.detailedDescription}
                            onChange={handleInputChange}
                            placeholder="This modern residential complex represents..."
                            rows={4}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-3 p-4 border border-dashed border-gray-300 rounded-lg">
                        <label className="text-sm font-bold text-gray-700">Features</label>

                        {featureInputs.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    name="feature"
                                    placeholder={`Feature ${index + 1}`}
                                    value={feature}
                                    onChange={(e) => handleFeatureInputChange(index, e.target.value)}
                                    required={index === 0}
                                    className="grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />

                                {index < featureInputs.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeatureInput(index)}
                                        className="p-2 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors shrink-0">
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddFeatureInput} className="mt-3 w-fit px-4 py-2 bg-[#c5d64d] text-white rounded-md hover:bg-[#8a9726] transition-colors self-start text-sm font-medium">
                            + Add Another Feature
                        </button>
                    </div>



                    {/* --- Dynamic Gallery Inputs --- */}
                    <div className="flex flex-col space-y-3 p-4 border border-dashed border-gray-300 rounded-lg">
                        <label className="text-sm font-bold text-gray-700"> Images</label>

                        {galleryInputs.map((url, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="url"
                                    name="gallery"
                                    placeholder={`Gallery Image URL ${index + 1}`}
                                    value={url}
                                    onChange={(e) => handleGalleryInputChange(index, e.target.value)}
                                    className="grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />

                                {url && (
                                    <div className="relative w-16 h-12 shrink-0 border border-gray-200 rounded-md overflow-hidden">

                                        <Image
                                            src={url}
                                            alt={`Gallery ${index + 1} Preview`}
                                            fill
                                            sizes="64px"
                                            className="object-cover"

                                        />
                                    </div>
                                )}

                                {index < galleryInputs.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryInput(index)}
                                        className="p-2 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors shrink-0">
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddGalleryInput} className="mt-3 w-fit px-4 py-2 bg-[#c5d64d] text-white rounded-md hover:bg-[#8a9726] transition-colors self-start text-sm font-medium">
                            + Add Another Image
                        </button>
                    </div>

                    <button type="submit" className="bg-[#c5d64d] py-2 text-white cursor-pointer rounded-md font-medium hover:bg-[#8a9726] transition-colors">
                        Submit Project
                    </button>
                </form>
            </div>
        </>
    );
}