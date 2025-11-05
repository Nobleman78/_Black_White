import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})

const page = () => {
    return (
        <div className={`max-w-2xl mx-auto pointer-events-auto py-10 ${roboto.className}`}>
            <form className='bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-2xl'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800'>Get Free Consultation</h2>
                <div className='space-y-4'>
                    <input
                        type='text'
                        placeholder='Your Name'
                        className='w-full px-4 py-3 border focus:ring-1 focus:ring-[#a8c957] border-gray-300 rounded focus:outline-none focus:border-[#a8c957] transition-colors'
                    />
                    <input
                        type='email'
                        placeholder='Email Address'
                        className='w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:ring-[#a8c957] rounded focus:outline-none focus:border-[#a8c957] transition-colors'
                    />
                    <input
                        type='tel'
                        placeholder='Phone Number'
                        className='w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#a8c957] focus:outline-none focus:border-[#a8c957] transition-colors'
                    />
                    <textarea
                        placeholder='Project Details'
                        rows={4}
                        className='w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#a8c957] focus:outline-none focus:border-[#a8c957] transition-colors resize-none'>
                    </textarea>
                    <button
                        type='submit'
                        className='w-full bg-[#a8c957] cursor-pointer text-black focus:ring-1 focus:ring-[#a8c957] px-6 py-3 font-semibold hover:bg-[#96b647] transition-all duration-300 uppercase tracking-wider'>
                        Get Free Quote
                    </button>
                </div>
            </form>
        </div>
    );
};

export default page;