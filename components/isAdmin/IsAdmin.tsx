'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';


export const useAdmin = () => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAdminLoading, setIsAdminLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!user?.email) {
                setIsAdmin(false);
                setIsAdminLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/users/admin/${user.email}`);

                if (!response.ok) {
                    throw new Error('Failed to check admin status');
                }

                const data = await response.json();
                setIsAdmin(data.admin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setIsAdminLoading(false);
            }
        };

        if (!authLoading) {
            checkAdmin();
        }
    }, [user, authLoading]);

    return { isAdmin, isAdminLoading };
};
