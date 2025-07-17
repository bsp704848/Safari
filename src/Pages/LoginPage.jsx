import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EyeIcon, EyeOff } from 'lucide-react';
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import Loader from "../Components/UI/Loader";
import SocialLoginButtons from "../Components/auth/SocialLoginButtons";

const LoginSchema = Yup.object().shape({
    email: Yup.string().matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
    ).required('Email is required'),
    password: Yup.string()
        .min(10, 'Password must be at least 10 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            'Must include uppercase, lowercase, number, and special character'
        )
        .required('Password is required'),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,

        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                    values
                );

                toast.success(res.data.message || "Login successful");
                resetForm();
                login(res.data.user);

                setTimeout(() => {
                    setLoading(false)
                    const lastPage = localStorage.getItem("lastPage");
                    navigate(lastPage || "/");
                    localStorage.removeItem("lastPage");
                }, 1500);
            } catch (error) {
                const message =
                    error.response?.data?.message || error.message || "Login failed";

                toast.error(message);
                setErrors({ email: message });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/100">
                    <Loader />
                </div>
            )}

            <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center p-10">
                    <h1 className="text-black text-5xl inline-block font-bold"
                        style={{ textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green` }}>
                        Safari
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">
                        Welcome to Safari
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Fast, secure rides for everyone.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-4 ">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign In</h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label className="flex items-center gap-2 mb-1 font-medium">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formik.values.password}
                                maxLength={10}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-300 mx-auto block">
                            Sign in
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4 mb-4">
                        New User? Create Account{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mt-6">
                        <SocialLoginButtons />
                    </div>
                </div>
            </div>
        </div>
    );
}
