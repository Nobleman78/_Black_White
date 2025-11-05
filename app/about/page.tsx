import Link from "next/link";
import philosopy from '../../public/About/philosopy.jpg'
import story from '../../public/About/sketch.jpg'
import Image from "next/image";
import { Roboto } from "next/font/google";
import MemberOne from '../../public/About/MemberOne.avif'
import MemberTwo from '../../public/About/MemberTwo.avif'
import MemberThree from '../../public/About/MemberThree.avif'
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
})
const Page = () => {
    return (
        <div className={`min-h-screen bg-white text-black ${roboto.className}`}>
            {/* Hero Section */}
            <section className="relative py-25 flex items-center justify-center bg-black text-white">
                <div className="absolute inset-0  from-black/50 to-black/80 z-10"></div>
                <div className="relative z-20 text-center px-6 max-w-4xl">
                    <h1 className="text-6xl md:text-7xl font-light tracking-wider mb-6">
                        ABOUT US
                    </h1>                   
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
                                Our Philosophy
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                We believe architecture is more than buildings its about creating spaces that inspire, function seamlessly, and stand the test of time. Every project is an opportunity to blend innovation with timeless design principles.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our approach combines meticulous attention to detail, sustainable practices, and a deep understanding of how people interact with their environments.
                            </p>
                        </div>
                        <div className="h-96 flex items-center justify-center">
                            {/* <span className="text-gray-500 text-sm">PHILOSOPHY IMAGE</span> */}
                            <Image src={philosopy} alt="philosopy-image" className="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-black text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-5xl font-light mb-3">30+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-light mb-3">500+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm">Projects Completed</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-light mb-3">50+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm">Team Members</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-light mb-3">25+</h3>
                            <p className="text-gray-400 uppercase tracking-wider text-sm">Awards Won</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="h-96 flex items-center justify-center order-2 md:order-1">
                            {/* <span className="text-gray-500 text-sm">STORY IMAGE</span> */}
                            <Image src={story} alt="story-image" className="" />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Founded in 1995 by renowned architect Jonathan Mills, our studio began with a simple mission: to create buildings that harmonize with their surroundings while pushing the boundaries of contemporary design.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Over three decades, we have grown from a small practice to an internationally recognized firm, but our commitment to excellence and innovation remains unchanged.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Today, we continue to shape skylines and communities, one thoughtful design at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-5">
                    <h2 className="text-4xl md:text-5xl font-light text-center mb-16 tracking-wide">
                        Our Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { name: 'Md Showkat Ali', role: 'CEO', image: MemberOne },
                            { name: 'Mohammad Ali', role: 'Chairman', image: MemberTwo },
                            { name: 'Atiya Ibnay Disha', role: 'MD', image: MemberThree }
                        ].map((member, index) => (
                            <div key={index} className="">
                                <div className="mb-6 overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={500}
                                        height={300}
                                        className="object-fit w-[400px] h-[350px]"
                                    />

                                </div>
                                <h3 className="text-2xl font-light mb-2 tracking-wide">{member.name}</h3>
                                <p className="text-gray-600 uppercase text-sm tracking-wider">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black text-white py-24 mt-5 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
                        Lets Create Something Extraordinary
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                        Ready to bring your vision to life? We are here to help transform your ideas into architectural masterpieces.
                    </p>
                    <Link href={'/quote'} className=" border-[#c5d64d] px-12 py-4 text-lg tracking-wider uppercase hover:bg-white bg-[#65d64d] hover:text-black transition-all duration-300">
                        Start Your Project
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Page;