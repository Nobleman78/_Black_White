'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthProvider';
import { useAdmin } from '@/components/isAdmin/IsAdmin';


const DashboardPage = () => {
    const router = useRouter();
    const { loading: authLoading } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();

    useEffect(() => {
        if (authLoading || isAdminLoading) {
            return;
        }
        if (!isAdmin) {
        
            console.log('User is not an admin. Redirecting...');
            router.push('/'); 
        }
    }, [isAdmin, isAdminLoading, authLoading, router]);


    if (authLoading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading user permissions...</p>
        
            </div>
        );
    }
    if (!isAdmin) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Access Denied. Redirecting...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <p>Welcome, Administrator! Here is your exclusive content.</p>
        </div>
    );
};

export default DashboardPage;