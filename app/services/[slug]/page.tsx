"use client"
import Home from '../../../public/ServiceImages/Home.jpg'
import Building_Design from '../../../public/ServiceImages/Building_Design.jpg'
import Consultancy from '../../../public/ServiceImages/Consultancy.jpg'
import Animation from '../../../public/ServiceImages/Animation.webp'
import { useParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { Roboto } from 'next/font/google'


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
        title: 'Architecture',
        slug: 'architecture',
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

const ServicePage = () => {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);

    if (!service) return <div>Service not found</div>;

    return (
        <div className={`max-w-5xl mx-auto py-10 ${robotoSerif.className}`}>
            <Image src={service.image} alt={service.title} className="w-full h-[400px] object-cover" />
            <h2 className="text-4xl mt-6">{service.title}</h2>
            <p className="mt-4 text-lg">{service.des}</p>
        </div>
    );
};

export default ServicePage;
