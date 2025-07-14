import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Phone, Mail, Building, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AOS from "aos";

const ContactUs = () => {


          useEffect(() => {
            AOS.init({
              duration: 800,
              once: true,
              easing: 'ease-in-out',
            });
          }, []);
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            comment: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
                .required('Mobile number is required'),
            comment: Yup.string().required('Please enter a comment'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/contact`,
                    values
                );

                toast.success(data.message || "Message sent successfully!");
                resetForm();
            } catch (error) {
                console.error(error);
                toast.error(
                    error.response?.data?.message ||
                    "An error occurred. Please try again."
                );
            }
        },
    });  

    return (
        <div className="container mx-auto px-4 py-10">

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2" data-aos="fade-up"
                  style={{
                  textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`,
                    }}>
                    About Our Office Locations
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-lg shadow-md"   data-aos="fade-right">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4"><span className="flex items-center gap-2 mb-1"><Building />Office Address</span></h2>
                    <p className="text-gray-700">
                        <strong>Safari Technologies Pvt. Ltd.</strong><br />
                        301, Sunrise Plaza, Near City Mall<br />
                        MG Road, Andheri East<br />
                        Mumbai, Maharashtra - 400069<br />
                        India<br /><br />
                        <span className="flex items-center gap-2 mb-1">
                            <Phone className="text-blue-500 font-bold" />
                            <span>+91-22-45678901</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Mail className="text-red-500 font-bold" />
                            <a
                                href="mailto:info@safaritech.com"
                                className="text-yellow-600 hover:underline"
                            >
                                info@safaritech.com
                            </a>
                        </span>
                    </p>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4"><span className="flex items-center gap-2 mb-1"><Building2 />Office Address</span></h2>
                    <p className="text-gray-700 ">
                        <strong>Safari Technologies Pvt. Ltd. (Corporate Office)</strong><br />
                        18th Floor, Orbit Tower<br />
                        123 Innovation Avenue<br />
                        Sector 62, Noida - 201309<br />
                        Uttar Pradesh, India<br /><br />
                        <span className="flex items-center gap-2 mb-1">
                            <Phone className="text-blue-500 font-bold" />
                            <span>+91-22-45678901</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Mail className="text-red-500 font-bold" />
                            <a
                                href="mailto:info@safaritech.com"
                                className="text-yellow-600 hover:underline"
                            >
                                info@safaritech.com
                            </a>
                        </span>
                    </p>
                </div>
            </div>


            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2" data-aos="fade-up"
                  style={{
                  textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`,
                }}
                >Contact Us</h1>
                <p className="text-gray-600 max-w-xl mx-auto" data-aos="fade-up">
                    We'd love to hear from you! Please fill out the form and we’ll get back to you as soon as possible.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                <div className="flex items-center justify-center">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="bg-white w-full md:max-w-xl p-8 rounded-lg shadow-lg"
                      data-aos="fade-right">

                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...formik.getFieldProps("name")}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>


                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...formik.getFieldProps("email")}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>


                        <div className="mb-4">
                            <label htmlFor="mobile" className="block font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                maxLength={10}
                                {...formik.getFieldProps("mobile")}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
                            )}
                        </div>


                        <div className="mb-4">
                            <label htmlFor="comment" className="block font-medium text-gray-700">
                                Comment
                            </label>
                            <textarea
                                id="comment"
                                rows="4"
                                {...formik.getFieldProps("comment")}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
                            ></textarea>
                            {formik.touched.comment && formik.errors.comment && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.comment}</p>
                            )}
                        </div>


                        <button
                            type="submit"
                            className="font-semibold py-2 px-6 transition-all duration-200 bg-black text-white rounded-full hover:bg-gray-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>


                <div className="hidden md:flex items-center justify-center" data-aos="fade-left">
                    <img
                        src="https://cdn.create.vista.com/api/media/small/285780644/stock-photo-selective-focus-attractive-operator-headset-working-office"
                        alt="Contact Illustration"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
