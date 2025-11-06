"use client"
import { useState } from "react";
import emailjs from '@emailjs/browser';
const SERVICE_ID = 'service_19cfvwi';
const TEMPLATE_ID = 'template_7pb4jal';
const PUBLIC_KEY = 'omuw8vcWG1371pASo';
const Quote = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                phone: formData.phone
            };

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            alert('Message sent successfully!');
            setFormData({ name: '', email: '', message: '', phone: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full pointer-events-auto block lg:hidden px-5'>
            <form onSubmit={handleSubmitData} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className='w-full'>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleData}
                            placeholder="Jane Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleData}
                        placeholder="jane.doe@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleData}
                        placeholder="+88015537343343"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleData}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none">

                    </textarea>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className={`w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white 
                                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#cfd64d] hover:bg-[#b7c931]'}
                                focus:outline-none transition duration-200 ease-in-out`}>
                    {loading ? 'Sending...' : 'Get Quote'}
                </button>
            </form>
        </div>
    );
};

export default Quote;