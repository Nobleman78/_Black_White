"use client"
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();
    const slug = params?.slug as string
    return (
        <div>
            <h2>{`Welcome to edit ${slug}`}</h2>
        </div>
    );
};

export default Page;