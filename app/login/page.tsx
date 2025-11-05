"use client"
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
            alert('Login successful! (This is a demo)');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="••••••••"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#c6d54d] cursor-pointer text-white py-3 px-4 rounded-lg font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                            Sign In
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <button type="button" className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" >
                                <FcGoogle />
                                <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/registration" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up for free
                        </Link>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default LoginPage;