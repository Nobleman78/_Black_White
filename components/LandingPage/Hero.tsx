"use client"
import interior from '../../public/Hero/Interior.avif'
import architecture from '../../public/Hero/Architecture-image.webp'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Roboto, Roboto_Slab } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';


import emailjs from '@emailjs/browser';
import Link from 'next/link';
const SERVICE_ID = 'service_19cfvwi';
const TEMPLATE_ID = 'template_7pb4jal';
const PUBLIC_KEY = 'omuw8vcWG1371pASo';

const roboto_slab = Roboto_Slab({
    subsets: ['latin'],
    weight: ["400", "500", "700"]
})
const roboto = Roboto({
    subsets: ['latin'],
    weight: ["400", "500", "700"]
})
const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};
const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const slideContent = [
        { keyword: 'Homes' },
        { keyword: 'Offices' }
    ];
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
        <div className="relative w-full mb-5">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="h-[600px]">

                <SwiperSlide>
                    <div className='w-full'>
                        <Image
                            src={architecture}
                            alt='architecture-image'
                            fill
                            className='object-cover brightness-50'
                            priority
                        />

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='w-full'>
                        <Image
                            src={interior}
                            alt='interior design'
                            fill
                            className='object-cover brightness-50'
                        />

                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Content Overlay - Outside Swiper */}
            <div className={`absolute inset-0 pointer-events-none z-10 ${roboto_slab.className} `}>
                <div className='container mx-auto h-full px-5'>
                    <div className='flex flex-col lg:flex-row justify-between h-full gap-8 py-12'>
                        {/* Text Content - Left Side */}
                        <div className='text-white flex-1 max-w-[800px] py-15'>
                            <h1 className='text-4xl lg:text-[55px] font-bold mb-6 leading-tight text-left'>
                                B&W Architects & Interior Designing Inspiring <span></span>
                                <span className='text-[#a8c957]'>
                                    <AnimatePresence mode='wait'>
                                        <motion.span
                                            key={slideContent[activeIndex].keyword}
                                            variants={textVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.4 }}
                                            className='inline-block'>
                                            {slideContent[activeIndex].keyword}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            </h1>
                            <p className={`text-[22px] mb-8 leading-relaxed ${roboto.className}`}>
                                From concept to completion we handle residential and commercial projects with expert care. Get a free consultation from our experienced design team today.
                            </p>
                            <Link href='/project' className='border-2 cursor-pointer border-[#a8c957] text-white bg-transparent px-10 py-4 text-base md:text-lg font-semibold hover:bg-[#a8c957] hover:text-black transition-all duration-300 uppercase tracking-wider pointer-events-auto'>
                                VIEW PROJECTS
                            </Link>
                        </div>

                        {/* Form - Right Side */}
                        <div className='w-full lg:w-[400px] pointer-events-auto hidden lg:block'>
                            <form onSubmit={handleSubmitData} className='bg-white backdrop-blur-sm p-8 rounded-lg shadow-2xl'>
                                <h2 className='text-2xl font-bold mb-6 text-gray-800'>Get Free Consultation</h2>
                                <div className='space-y-4'>
                                    <input
                                        type='text'
                                        id='name'
                                        value={formData.name}
                                        onChange={handleData}
                                        placeholder='Your Name'
                                        className='w-full px-4 py-3 border focus:ring-1 focus:ring-[#a8c957] border-gray-300 rounded focus:outline-none focus:border-[#a8c957] transition-colors'
                                    />

                                    <input
                                        type='email'
                                        id='email'
                                        value={formData.email}
                                        onChange={handleData}
                                        placeholder='Email Address'
                                        className='w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-[#a8c957] rounded focus:outline-none focus:border-[#a8c957] transition-colors'
                                    />

                                    <input
                                        type='tel'
                                        id='phone'
                                        value={formData.phone}
                                        onChange={handleData}
                                        placeholder='Phone Number'
                                        className='w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#a8c957] focus:outline-none focus:border-[#a8c957] transition-colors'
                                    />

                                    <textarea
                                        placeholder='Project Details'
                                        rows={4}
                                        id='message'
                                        value={formData.message}
                                        onChange={handleData}
                                        className='w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#a8c957] focus:outline-none focus:border-[#a8c957] transition-colors resize-none'>
                                    </textarea>

                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='w-full bg-[#a8c957] cursor-pointer text-black focus:ring-1 focus:ring-[#a8c957] px-6 py-3 font-semibold hover:bg-[#96b647] transition-all duration-300 uppercase tracking-wider'>
                                        {loading ? 'Sending...' : 'Get Quote'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;