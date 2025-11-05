"use client"
import Image from 'next/image';
import ContactImage from '../../public/Contact/Contact.jpg'
import { Roboto } from 'next/font/google';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

const SERVICE_ID = 'service_19cfvwi';
const TEMPLATE_ID = 'template_7pb4jal';
const PUBLIC_KEY = 'omuw8vcWG1371pASo';

const Contact = () => {
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
        <div className={`max-w-7xl mx-auto py-10 ${roboto.className}`}>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 bg-white rounded-xl overflow-hidden p-6 md:py-10 md:px-5">
                <div className="lg:w-1/2">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Any query about our services? Please fill out the form below and we will get back to you!
                    </p>
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

                <div className="lg:w-1/2 hidden lg:block relative min-h-[400px]">
                    <Image
                        src={ContactImage}
                        alt="Contact Us Illustration"
                        fill
                        style={{ objectFit: 'cover' }}
                        className='rounded-xl'
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
