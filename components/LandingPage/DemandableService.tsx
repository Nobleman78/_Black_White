
import Image, { StaticImageData } from "next/image";
import Home from '../../public/ServiceImages/Home.jpg'
import Building_Design from '../../public/ServiceImages/Building_Design.jpg'
import Consultancy from '../../public/ServiceImages/Consultancy.jpg'
import Animation from '../../public/ServiceImages/Animation.webp'
import { Roboto } from "next/font/google";
import Link from "next/link";

interface Services {
    title: string,
    des: string,
    image: StaticImageData,
    slug: string
}
const robotoSerif = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const services: Services[] = [
    {
        title: 'Consultancy',
        slug: 'consultancy',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Consultancy
    },
    {
        title: 'Interior',
        slug: 'interior',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Home
    },
    {
        title: 'Building Design',
        slug: 'building_design',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Building_Design
    },
    {
        title: '2D/3D - Animation',
        slug: '2d_3d_animation',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Animation
    },
    {
        title: 'Landscaping',
        slug: 'landscaping',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Animation
    },
    {
        title: 'Gardening',
        slug: 'gardening',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Animation
    },
    {
        title: 'Craft',
        slug: 'craft',
        des: 'Make your space beautiful with the best interior design company in Dhaka for stylish, comfy living.',
        image: Animation
    },

]
const DemandableService = () => {

    return (
        <div className={`max-w-7xl mx-auto py-20 px-5 ${robotoSerif.className}`}>
            <div>
                <h2 className={`text-center mb-15 text-5xl`}>Our Demandable <span className="text-[#a8c957]">Services</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) =>
                        <div key={index} className="flex flex-col gap-5 shadow-md ">
                            <Image src={service.image} alt={service.title} className="w-full h-[300px]" />
                            <div className="grow px-5 py-2">
                                <h2 className="text-center mb-3 text-2xl">{service.title}</h2>
                                <p>{service.des}</p>
                            </div>
                            <Link href={`/services/${service.slug}`} className="bg-[#a8c957] py-3 cursor-pointer text-center text-white transition hover:bg-green-500">See More</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemandableService;